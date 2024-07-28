"use client";
import { useAuthStore } from '@/store/Auth'
import React from 'react'

function LoginPage() {
    const {login} = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, seterror] = React.useState("")

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      //collect data
      const formData = new FormData(e.currentTarget)
      const email = formData.get("email")
      const password = formData.get("password")

      //validate data
      if(!email || !password){
        seterror(() => "Fill out all the fields")
        return
      }

      //handel loading
      setIsLoading(() => true)
      seterror(() => "")

      //login
      const loginResponse = await login(email.toString(), password.toString())
      if(loginResponse.error){
        seterror(() => loginResponse.error!.message)
      }
      setIsLoading(() => false)
    }
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage