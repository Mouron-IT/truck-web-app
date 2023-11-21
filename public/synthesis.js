let player;

function startSynthesis(synthesisText) {
  // subscription key and region for speech services.
  const subscriptionKey = "ecad30764bcc4965b3a47ad5a621439b";

  const SpeechSDK = window.SpeechSDK;

  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    subscriptionKey,
    "eastus"
  );

  speechConfig.speechSynthesisVoiceName = "es-AR-TomasNeural";
  speechConfig.speechSynthesisOutputFormat = 8;

  if (player) {
    player.pause();
  }

  player = new SpeechSDK.SpeakerAudioDestination();
  player.onAudioStart = function (_) {
    console.log(player);

    console.log("playback started");
  };
  player.onAudioEnd = function (_) {
    console.log("playback finished");
  };

  const audioConfig = SpeechSDK.AudioConfig.fromSpeakerOutput(player);

  let synthesizer = new SpeechSDK.SpeechSynthesizer(
    speechConfig,
    audioConfig
  );

  // The event synthesizing signals that a synthesized audio chunk is received.
  // You will receive one or more synthesizing events as a speech phrase is synthesized.
  // You can use this callback to streaming receive the synthesized audio.
  synthesizer.synthesizing = function (s, e) {
    console.log(e);
  };

  // The synthesis started event signals that the synthesis is started.
  synthesizer.synthesisStarted = function (s, e) {
    console.log(e);
  };

  // The event synthesis completed signals that the synthesis is completed.
  synthesizer.synthesisCompleted = function (s, e) {
    console.log(e);
  };

  // The event signals that the service has stopped processing speech.
  // This can happen when an error is encountered.
  synthesizer.SynthesisCanceled = function (s, e) {
    console.log(e);
  };

  // This event signals that word boundary is received. This indicates the audio boundary of each word.
  // The unit of e.audioOffset is tick (1 tick = 100 nanoseconds), divide by 10,000 to convert to milliseconds.
  synthesizer.wordBoundary = function (s, e) {
    console.log(e);
  };

  synthesizer.visemeReceived = function (s, e) {
    console.log(e);
  };

  synthesizer.bookmarkReached = function (s, e) {
    console.log(e);
  };

  const complete_cb = function (result) {
    console.log(result);
    synthesizer.close();
    synthesizer = undefined;
  };
  const err_cb = function (err) {
    console.log(err);
    synthesizer.close();
    synthesizer = undefined;
  };

  // synthesizer.speakSsmlAsync(synthesisText,
  //         complete_cb,
  //         err_cb);

  synthesizer.speakTextAsync(synthesisText, complete_cb, err_cb);
}