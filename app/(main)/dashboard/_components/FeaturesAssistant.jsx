import { Button } from '@/components/ui/button'
import React from 'react'

const FeaturesAssistant = () => {
  return (
    <div className='w-full  flex items-end justify-between'>
      <div>
        <h2 className='text-lg text-gray-400'>My workspace</h2>
        <h1 className='text-3xl font-bold '>Welcome back, Explorer</h1>
      </div>
      <div>
        <Button className="bg-blue-600">Open Campus</Button>
      </div>
    </div>
  )
}

export default FeaturesAssistant