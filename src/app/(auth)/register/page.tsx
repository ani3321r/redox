"use client";
import { useAuthStore } from '@/store/Auth'
import React from 'react'

function RegisterPage() {
    const {createAccount, login} = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, seterror] = React.useState("")

    const handelSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const firstname = formData.get("firstname")
        const lastname = formData.get("lastname")
        const email = formData.get("email")
        const password = formData.get("password")

        //validation
        if(!firstname || !lastname || !email || !password){
            seterror(()=>"Fill out all the fields")
            return
        }

        //call store
        setIsLoading(true)
        seterror("")

        const response = await createAccount(
            `${firstname} ${lastname}`,
            email?.toString(),
            password?.toString()
        )

        if(response.error){
            seterror(() => response.error!.message)
        } else{
            const loginResponse = await login(email.toString(), password.toString())
            if(loginResponse.error){
                seterror(()=> loginResponse.error!.message)
            }
        }
        setIsLoading(()=> false)
    }
  return (
    <div>
        {error && (
            <p>{error}</p>
        )}

        <form onSubmit={handelSubmit}>
            
        </form>
    </div>
  )
}

export default RegisterPage