const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
import {PollyClient, SynthesizeSpeechCommand} from "@aws-sdk/client-polly"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Gemini requires the first message to be from the "user" role
const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `respond in just 70 words not more than this `,
        },
      ],
    },
  ],
});

const ConvertTextToSpeech = async(text,expertName)=>{
  const pollyclient = new PollyClient({
      region:"ap-south-1", 
      credentials:{
        accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_KEY
      }
  })
  const command = new SynthesizeSpeechCommand({
    Text:text,
    OutputFormat:"mp3",
    VoiceId:expertName
  })
  try{
    const {AudioStream} = await pollyclient.send(command)
    const audioArrayBuffer = await AudioStream.transformToByteArray();
    const audioBlob = new Blob([audioArrayBuffer], {type:'audio/mp3'})
    const audioUrl = URL.createObjectURL(audioBlob); 
    return audioUrl
  }
  catch(e){
    console.log("error" , e)
  }
}

export { chatSession , ConvertTextToSpeech };


