'use client';

import { useState } from 'react';
import { TextField } from "@mui/material"
import Button from '@/components/Button';
import { useRouter } from "next/navigation";
import supabase from '@/api/supabaseClient';
import { SyncLoader } from 'react-spinners';

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      alert('Invalid email or password.');
      console.log(error);
    } else {
      router.push('/auth/dashboard');
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-3">
      {/* Header */}
      <div className="flex flex-col gap-1 justify-center items-center">
        <h5 className="font-bold">Create an account</h5>
        <p>Enter your email and password to sign up</p>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="my-4">
            <SyncLoader color="#000000" size={20} />
          </div>
        </div>
      )}

      {/* Form */}
      <div className="flex flex-col gap-[16px] w-[450px]">
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <Button
          text="Sign Up"
          onClick={handleSignUp}
          fillContainer={true}
          disabled={loading}
        />
      </div>
    </div>
  );
}
