"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { chatSession, ConvertTextToSpeech } from "@/services/Aimodel";

const Page = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [audioURL, setAudioURL] = useState(null);
  const {
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const toggleRecording = () => {
    if (!isRecording) {
      startSpeechToText();
    }
  };

  useEffect(() => {
    if (results.length > 0) {
      const latestTranscript = results.map((res) => res.transcript).join(" ");
      setUserAnswer(latestTranscript);
    }
  }, [results]);

  useEffect(() => {
    if (userAnswer.trim()) {
      handleGenerateText(userAnswer);
    }
  }, [userAnswer]);

  const handleGenerateText = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await chatSession.sendMessage(text);
      const responseText = await result.response.text();
      const url = await ConvertTextToSpeech(responseText, "Joanna");
      setResults([]);
      setAudioURL(url);
      setAiResponse(responseText);
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-10 flex h-screen items-start pt-10 gap-4 justify-center">
      <div className="w-[70%] gap-5 h-[60%] flex flex-col items-start">
        <h2 className="text-xl font-bold">Prep Time</h2>
        <div className="w-full h-full bg-[#F5F5F5] rounded-2xl relative items-center justify-center flex border">
          <div className="text-center animate-pulse">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://ai-coaching-voice-agent.vercel.app/_next/image?url=%2Ft1.avif&w=640&q=75"
                alt="not showing"
              />
              <audio src={audioURL} type="audio/mp3" autoPlay onEnded={toggleRecording} />
            </div>
            <h1>Joanna</h1>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button disabled={loading} onClick={toggleRecording} variant="outline">
            {isRecording ? (
              <h2 className="text-red-500 flex gap-1 items-center">
                <Mic /> Disconnect
              </h2>
            ) : (
              " Connect"
            )}
          </Button>
        </div>
        <div className="w-full h-32 border rounded-2xl p-2">
          {loading ? "Generating response..." : aiResponse}
        </div>
        {interimResult}
      </div>
    </div>
  );
};

export default Page;
