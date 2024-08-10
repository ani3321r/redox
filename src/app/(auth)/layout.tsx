"use client";
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({children}: {children: React.ReactNode}) => {
    const {session} = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        console.log("Layout useEffect - Session state:", session);
        if(session){
            console.log("Redirecting to homepage due to existing session");
            router.push("/")
        }
    }, [session, router])

    console.log("Layout rendering - Session state:", session);

    return(
        <div className="">
            <div className="">{children}</div>
        </div>
    )
}

export default Layout