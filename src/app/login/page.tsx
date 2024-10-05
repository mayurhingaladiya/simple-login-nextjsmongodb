"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="App w-screen h-screen flex justify-center items-center ">
            <div className="w-96 border-solid border-4 border-sky-500 justify-center items-center p-4">
                <h1 className="text-3xl text-bold text-cyan-700 pb-10">{loading ? "Processing" : "Login"}</h1>
                <label className="block text-sm font-medium">Email Address</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full border border-sky-500 rounded-xl pb-2 mb-4" 
                onChange={(e) => setUser({...user, email: e.target.value})}></input>
                <label className="block text-sm font-medium">Password</label>
                <input 
                type="password" 
                id="email" 
                name="password" 
                className="w-full border border-sky-500 rounded-xl pb-2 mb-4" 
                onChange={(e) => setUser({...user, password: e.target.value})}></input>
                <button onClick={onLogin} className="px-10 bg-cyan-500 rounded-xl py-1 my-2 text-white">Submit</button>
                <Link href="/signup" className="flex text-sm">First time?</Link>
            </div>
        </div>
    );
}
