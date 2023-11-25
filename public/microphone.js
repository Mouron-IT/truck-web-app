



window.addEventListener("message", (event) => {
    if (event.data.type === "receive_message") {

        console.log(event)
        startSynthesis(event.data.payload.text);
    }
  });

function iniciarReconocimiento() {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "es-ES"; // Establece el idioma según tus necesidades

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();

    // Verifica si la palabra clave está presente
    if (transcript.includes("luis")) {
      // Realiza acciones específicas cuando se detecta la palabra clave
      console.log(transcript);
      let frameChat = document.getElementById("frame-chat");
      frameChat.contentWindow.postMessage(
        {
          type: "send_message",
          payload: {
            text: transcript,
          },
        },
        //"http://localhost:5500"
        "https://mouron-it.github.io"
      );

    }
  };

  recognition.onend = () => {
    recognition.start(); // Reinicia el reconocimiento después de que termine una transcripción
  };

  recognition.start();
}
