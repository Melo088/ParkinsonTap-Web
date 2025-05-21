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

export function sendStartMessage(testId) {
  if (!client || !client.isConnected()) {
    console.error("Cliente MQTT no conectado");
    return;
  }
  
  // Si tenemos un testId, enviamos un mensaje JSON, sino enviamos "start" como antes
  if (testId) {
    const messageData = JSON.stringify({
      command: "start",
      testId: parseInt(testId)
    });
    
    const message = new Paho.MQTT.Message(messageData);
    message.destinationName = "esp32/data";
    client.send(message);
    console.log("Mensaje enviado:", messageData);
  } else {
    const message = new Paho.MQTT.Message("start");
    message.destinationName = "esp32/data";
    client.send(message);
    console.log("Mensaje enviado: start");
  }
}