import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function MemoBox() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    };

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
      setRecording(false);
    }, 5000); // 5 secondi di registrazione
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-yellow-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-4 animate-bounce">
        MemoBox Pop Edition
      </h1>
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-4 border-pink-400">
        <CardContent className="flex flex-col items-center p-6">
          <p className="text-lg text-center text-pink-700 mb-4">
            Registra un messaggio vocale da inviare a chi vuoi!
          </p>
          <Button
            onClick={startRecording}
            disabled={recording}
            className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-2 rounded-full shadow-lg"
          >
            {recording ? "Registrazione in corso..." : "Inizia a registrare"}
          </Button>
          {audioURL && (
            <audio controls src={audioURL} className="mt-4 w-full" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
