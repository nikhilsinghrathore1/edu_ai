import React from 'react'
import AppHeader from './_components/AppHeader'

const layout = ({children}) => {
  return (
         <>
    <div>
         <AppHeader/>
               {children}
               </div>
         </>      
  )
}

export default layout