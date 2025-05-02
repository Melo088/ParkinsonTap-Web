const startDataAcquisition = document.getElementById("startDataAcquisition");

let client = new Paho.MQTT.Client(
    "broker.emqx.io",
    Number(8083),
    "ESP32MeloPublisher"
);

client.connect({
    onSuccess: () => {
        console.log ("Conectado al broker MQTT");
        client.subscribe("esp32/data");
    }
});

startDataAcquisition.addEventListener("click", () => {
    let data = 'start';
    let message = new Paho.MQTT.Message(data);
    message.destinationName = "esp32/data";
    client.send(message);
    console.log("Mensaje enviado: " + data);
});
