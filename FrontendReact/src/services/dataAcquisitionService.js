let client;

export function connectMQTT() {
  client = new Paho.MQTT.Client("broker.emqx.io", 8083, "ESP32MeloPublisher");
  
  client.connect({
    onSuccess: () => {
      console.log("Conectado al broker MQTT");
      client.subscribe("esp32/data");
    },
    onFailure: (error) => {
      console.error("Falló la conexión MQTT:", error);
    }
  });
}

export function sendStartMessage(testId, duration = 10) {
  if (!client || !client.isConnected()) {
    console.error("Cliente MQTT no conectado");
    return;
  }

  let messageData;
  let message;

  if (testId) {
    messageData = JSON.stringify({
      command: "start",
      testId: parseInt(testId),
      duration: parseInt(duration) 
    });
    message = new Paho.MQTT.Message(messageData);
  } else {
    messageData = "start";
    message = new Paho.MQTT.Message(messageData);
  }

  message.destinationName = "esp32/data";
  client.send(message);
  console.log("Mensaje enviado:", messageData);
  alert(`Mensaje enviado correctamente. Duración: ${duration} segundos`);
}