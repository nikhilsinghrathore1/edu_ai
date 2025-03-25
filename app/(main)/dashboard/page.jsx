import React from 'react'
import FeaturesAssistant from './_components/FeaturesAssistant'
import UserInputDialog from './_components/UserInputDialog';
const features = [
  { img: "https://ai-coaching-voice-agent.vercel.app/_next/image?url=%2Flecture.png&w=384&q=75", text: "topic based Lecture" },
  { img: "https://ai-coaching-voice-agent.vercel.app/_next/image?url=%2Finterview.png&w=384&q=75", text: "Mock interview" },
  { img: "https://ai-coaching-voice-agent.vercel.app/_next/image?url=%2Fqa.png&w=384&q=75", text: "qns ans prep" },
  { img: "https://ai-coaching-voice-agent.vercel.app/_next/image?url=%2Flanguage.png&w=384&q=75", text: "learn language" },
  { img: "https://ai-coaching-voice-agent.vercel.app/_next/image?url=%2Fmeditation.png&w=384&q=75", text: "Meditation" },
];

const page = () => {
  return (
    <div className='w-full p-10 mt-10 xl:px-64  '>
      <FeaturesAssistant/>
    {/* features list */}
    <div className='w-full  mt-10 flex items-center gap-14 flex-wrap'>
      {features.map((feature, index) => (
        <UserInputDialog title={feature.text} key={index}>

        <div
   
          className='w-40 h-34 gap-3 cursor-pointer bg-[#F5F5F5] rounded-2xl flex items-center justify-center flex-col'
          >
          <img
            className='w-[50%] object-contain'
            src={feature.img}
            alt={feature.text}
            />
          <h1 className='capitalize'>{feature.text}</h1>
        </div>
            </UserInputDialog>
      ))}
    </div>
      {/* previous lectures  */}


      <div className='w-full flex mt-19'>
        <div className='w-[50%] text-xl font-bold px-5'>Previous Lectures</div>
        <div className='w-[50%] text-xl font-bold px-5'>Feedback</div>
      </div>

    </div>
  )
}

export default page 