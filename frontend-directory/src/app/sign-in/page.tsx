"use client";

import { TextField, Button, Snackbar } from "@mui/material"
import { useRouter } from "next/navigation";
import { Bs0CircleFill } from "react-icons/bs";

export default function SignInPage() {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/auth/dashboard');
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-3">
            <div className="flex flex-col gap-1 justify-center items-center">
                <h5 className="font-bold">Login to your account</h5>
                <p>Enter your email and password to login</p>
            </div>
            <div className="flex flex-col gap-2 w-[450px]">
                <TextField/>
                <TextField/>
                <Button 
                    variant="contained"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}