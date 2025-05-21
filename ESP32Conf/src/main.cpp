#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <PubSubClient.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

const char* ssid = "casita";
const char* password = "1004214610";

// MQTT params
const char* mqttServer = "broker.emqx.io";
const int mqttPort = 1883;
const char* clientName = "ESP32ClienteIcesiMelo";

// Objeto WiFiClient
WiFiClient wifiClient;

// Objeto PubSubClient
PubSubClient mqttClient(wifiClient);

// Configuración del topic
const char* topic = "esp32/data";
String url = "http://192.168.1.3:8080/api/esp32/batch-readings";

// Variables para el cálculo de ángulos
double compAngleX = 0, compAngleY = 0, compAngleZ = 0;
double accXangle, accYangle, accZangle;
double gyroXrate, gyroYrate, gyroZrate;
double gyroXAngle = 0, gyroYAngle = 0, gyroZAngle = 0;
double ap = 0.955; // Complementary Filter constant

// Adafruit MPU6050 Object
Adafruit_MPU6050 mpu;

// Flag para mostrar o no los datos del IMU
bool showImuData = false;

void displayMenu() {
  Serial.println("\n===== SISTEMA DE CAPTURA DE DATOS IMU =====");
  Serial.println("Comandos disponibles:");
  Serial.println("g - Realizar GET HTTP");
  Serial.println("p - Realizar POST HTTP con datos del MPU6050");
  Serial.println("m - Mostrar este menú nuevamente");
  Serial.println("=========================================");
}

void keepAlive() {
  if (!mqttClient.connected()) {
    Serial.println("Reconectando");
    // Intenta conectarse al servidor MQTT
    while (!mqttClient.connected()) {
      Serial.println("Intentando conectar al servidor MQTT...");
      if (mqttClient.connect(clientName)) {
        Serial.println("Conectado al servidor MQTT!");
      } else {
        Serial.print("Error al conectar: ");
        Serial.println(mqttClient.state());
        delay(5000);
      }
    }
    mqttClient.subscribe(topic);
  }
}

void httpGET() {
  HTTPClient http;
  http.begin(url.c_str());
  int httpResponseCode = http.GET();
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}

// Inicializa el MPU6050
void initMPU() {
  Serial.println("Inicializando MPU6050...");
  if (!mpu.begin()) {
    Serial.println("No se pudo encontrar el MPU6050!");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 encontrado!");
  
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_5_HZ);
  
  Serial.println("MPU6050 configurado correctamente");
}

// Lee los datos del MPU6050 y calcula los ángulos
void updateAngles() {
  // Lectura de los valores del MPU6050
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // Obtener los valores de aceleración
  double AcX = a.acceleration.x;
  double AcY = a.acceleration.y;
  double AcZ = a.acceleration.z;

  // Calcular los ángulos de aceleración
  accXangle = (atan2(AcY, AcZ) * RAD_TO_DEG);
  accYangle = (atan2(AcX, AcZ) * RAD_TO_DEG);
  accZangle = (atan2(AcX, AcY) * RAD_TO_DEG);

  // Obtener los valores de velocidad angular
  gyroXrate = g.gyro.x;
  gyroYrate = g.gyro.y;
  gyroZrate = g.gyro.z;

  // Calcular la diferencia de tiempo
  static unsigned long lastTime = 0;
  unsigned long currentTime = millis();
  double dt = (currentTime - lastTime) / 1000.0;  // Convertir a segundos
  if (lastTime == 0) {
    dt = 0;
  }
  lastTime = currentTime;

  // Calcular los ángulos de los giroscopios
  gyroXAngle = gyroXrate * dt;
  gyroYAngle = gyroYrate * dt;
  gyroZAngle = gyroZrate * dt;

  // Aplicar el filtro complementario
  compAngleX = ap * (compAngleX + gyroXAngle) + (1 - ap) * accXangle;
  compAngleY = ap * (compAngleY + gyroYAngle) + (1 - ap) * accYangle;
  compAngleZ = ap * (compAngleZ + gyroZAngle) + (1 - ap) * accZangle;
}

int currentTestId = 0;

void httpPOST() {
  // Activar la visualización de datos del IMU durante la prueba
  showImuData = true;
  
  Serial.println("\nIniciando captura de datos...");
  Serial.println("Realizando 250 lecturas (aproximadamente 10 segundos)");
  Serial.println("-------------------------------------");
  
  // Iniciar la construcción del JSON manualmente
  String json = "{\"testId\":" + String(currentTestId) + ",\"readings\":[";
  
  unsigned long startTime = millis();   // Guardar el tiempo de inicio
  unsigned long lastSampleTime = startTime;  // Guardar el tiempo de la última muestra
  
  for (int i = 0; i < 250; ) {  // incremento i manual
    unsigned long currentTime = millis();
    
    if (currentTime - lastSampleTime >= 40) {  // Si han pasado 40 ms
      // Actualizar los ángulos
      updateAngles();
      
      // Leer los datos del sensor
      sensors_event_t a, g, temp;
      mpu.getEvent(&a, &g, &temp);
      
      // Añadir esta lectura al JSON como un objeto
      json += "{";
      json += "\"time\":" + String(currentTime - startTime) + ",";  // Tiempo real transcurrido
      json += "\"ax\":" + String(a.acceleration.x) + ",";
      json += "\"ay\":" + String(a.acceleration.y) + ",";
      json += "\"az\":" + String(a.acceleration.z) + ",";
      json += "\"y\":" + String(compAngleZ) + ",";
      json += "\"p\":" + String(compAngleY) + ",";
      json += "\"r\":" + String(compAngleX);
      json += "}";
      
      // Añadir coma excepto para el último elemento
      if (i < 249) {
        json += ",";
      }
      
      // Mostrar los valores en el monitor serial cada 10 lecturas
      if (showImuData && i % 10 == 0) {
        Serial.print("Lectura ");
        Serial.print(i);
        Serial.print(": ax=");
        Serial.print(a.acceleration.x);
        Serial.print(" ay=");
        Serial.print(a.acceleration.y);
        Serial.print(" az=");
        Serial.print(a.acceleration.z);
        Serial.print(" Yaw=");
        Serial.print(compAngleZ);
        Serial.print(" Pitch=");
        Serial.print(compAngleY);
        Serial.print(" Roll=");
        Serial.println(compAngleX);
      }
      
      lastSampleTime = currentTime;
      i++;  
    }
  }
  
  // Cerrar el array de lecturas y el objeto principal
  json += "]}";
  
  // Desactivar la visualización de datos del IMU
  showImuData = false;
  Serial.println("-------------------------------------");
  Serial.println("Captura de datos completada!");
  
  // Debug: Mostrar una pequeña muestra de la estructura de JSON
  Serial.println("Enviando JSON con la siguiente estructura:");
  Serial.print(json.substring(0, 200));
  Serial.println("... (truncado)");
  
  // Enviar los datos mediante HTTP POST
  HTTPClient http;
  http.begin(url.c_str());
  http.addHeader("Content-Type", "application/json");
  
  int httpResponseCode = http.POST(json);
  
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
  displayMenu();
}

void initWiFi() {
  Serial.println("\nConectando a WiFi...");
  WiFi.begin(ssid, password);
  Serial.print("Conectando a ");
  Serial.print(ssid);
  Serial.print(" ");
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    Serial.print(".");
    delay(1000);
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n¡Conectado correctamente!");
    Serial.print("Dirección IP: ");
    Serial.println(WiFi.localIP());
    
    // Conectar al broker MQTT después de establecer la conexión WiFi
    Serial.println("Conectando al broker MQTT...");
    if (mqttClient.connect(clientName)) {
      Serial.println("Conectado al servidor MQTT!");
      mqttClient.subscribe(topic);
    } else {
      Serial.print("Error al conectar al MQTT: ");
      Serial.println(mqttClient.state());
    }
  } else {
    Serial.println("\nNo se pudo conectar al WiFi. Intente nuevamente.");
  }
  
  // Mostrar el menú de nuevo después de completar la operación
  displayMenu();
}



void callback(char* topic, byte* payload, unsigned int length) {
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.print("Mensaje recibido en el topic: ");
  Serial.print(topic);
  Serial.print(" - Mensaje: ");
  Serial.println(message);

  // Verificar si el mensaje es un simple "start" (para compatibilidad)
  if(message == "start"){
    initWiFi();
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("Realizando HTTP POST con datos del MPU6050...");
      httpPOST();
    } else {
      Serial.println("Error: No hay conexión WiFi. Usa 'w' para conectarte primero.");
    }
    return;
  }
  
  // Intentar parsear el mensaje como JSON
  JSONVar jsonMessage;
  jsonMessage = JSON.parse(message);
  
  if (JSON.typeof(jsonMessage) == "undefined") {
    Serial.println("El parsing del mensaje JSON falló!");
    return;
  }
  
  // Verificar si el mensaje tiene el comando "start" y un testId
  if (jsonMessage.hasOwnProperty("command") && String((const char*)jsonMessage["command"]) == "start") {
    if (jsonMessage.hasOwnProperty("testId")) {
      currentTestId = (int)jsonMessage["testId"];
      Serial.print("ID del test recibido: ");
      Serial.println(currentTestId);
      
      initWiFi();
      if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Realizando HTTP POST con datos del MPU6050...");
        httpPOST(); // Esta función ahora usará currentTestId
      } else {
        Serial.println("Error: No hay conexión WiFi. Usa 'w' para conectarte primero.");
      }
    } else {
      Serial.println("Comando 'start' recibido pero falta el ID del test");
    }
  } else {
    Serial.println("Comando desconocido en el mensaje JSON");
  }
}

void setup() {
  Serial.begin(115200);
  Wire.begin();  // Iniciar I2C
  WiFi.mode(WIFI_STA);
  
  // Espera para que el monitor serial se conecte
  delay(3000);
  
  Serial.println("\n\n\n");
  
  // Inicializamos el MPU6050
  initMPU();
  
  // Inicializa el cliente MQTT
  mqttClient.setServer(mqttServer, mqttPort);
  mqttClient.setCallback(callback);
  
  // Mostrar el menú de comandos pero actualizado (sin la opción 'w')
  displayMenu();
  
  // Pequeña pausa y luego iniciar la conexión WiFi automáticamente
  Serial.println("Iniciando conexión WiFi automáticamente en 3 segundos...");
  delay(3000);
  initWiFi();
}

void loop() {
  // Procesar eventos MQTT solo si estamos conectados
  if (WiFi.status() == WL_CONNECTED) {
    mqttClient.loop();
    keepAlive();
  }
  
  // Procesar comandos del puerto serial
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    
    if (data == "g") {
      if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Realizando HTTP GET...");
        httpGET();
        displayMenu();  // Mostrar menú después de completar la operación
      } else {
        Serial.println("Error: No hay conexión WiFi.");
        initWiFi();  // Intentar reconectar automáticamente
      }
    } else if (data == "p") {
      if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Realizando HTTP POST con datos del MPU6050...");
        httpPOST();
      } else {
        Serial.println("Error: No hay conexión WiFi.");
        initWiFi();  // Intentar reconectar automáticamente
      }
    } else if (data == "m") {
      displayMenu();
    } else {
      Serial.print("Comando desconocido: ");
      Serial.println(data);
      displayMenu();
    }
  }
  
  delay(10);
}