import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const AppHeader = () => {
  return (
    <div className='w-full px-7 py-3 flex shadow-sm items-center justify-between'>
      <Image width={160} height={20} src={"/hooksLogo.svg"} alt="not showing" />
      <Button className="bg-blue-600">Connect wallet</Button>
    </div>
  )
}

export default AppHeader