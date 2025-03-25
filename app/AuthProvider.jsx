"use client"
import { api } from '@/convex/_generated/api'
import { useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { UserContext } from './_context/UserContext'

const AuthProvider = ({children}) => {
               const user = useUser()
               const createUser = useMutation(api.user.CreateUser)
               const [userData, setuserData] = useState(null)

               const CreateNewUser =async ()=>{
                              const result = await createUser({
                                             name:user.displayName,
                                             email:user.primaryEmail
                              })
                              console.log(result)
                              setuserData(result)
               }

               useEffect(()=>{
                              console.log(user)
                              CreateNewUser()
                       
               },[user])

  return (
    <div>
               <UserContext.Provider value={{userData, setuserData}}>

               {children}
               </UserContext.Provider>
</div>
  )
}

export default AuthProvider