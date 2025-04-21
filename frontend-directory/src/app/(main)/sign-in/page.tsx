"use client";

import { useState } from 'react';
import { TextField, Snackbar } from "@mui/material"
import Button from '@/components/Button';
import { useRouter } from "next/navigation";

import supabase from '@/api/supabaseClient';

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);

        if (error) {
            alert('Invalid email or password.');
        } else {
            router.push('/auth/dashboard');
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-3">
            <div className="flex flex-col gap-1 justify-center items-center">
                <h5 className="font-bold">Login to your account</h5>
                <p>Enter your email and password to login</p>
            </div>
            <div className="flex flex-col gap-[16px] w-[450px]">
                <TextField
                    label='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                        },
                    }}
                />
                <TextField
                    label='Password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                        },
                    }}
                />
                <Button 
                    text='Login'
                    onClick={handleLogin}
                    fillContainer={true}
                />
            </div>
        </div>
    );
}
