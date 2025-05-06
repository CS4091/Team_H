'use client';

import { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabaseClient';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex flex-col justify-center items-center gap-3"
    >
      {/* Header fades in slightly after */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col gap-1 justify-center items-center"
      >
        <h5 className="font-bold">Login to your account</h5>
        <p>Enter your email and password to login</p>
      </motion.div>

      {/* Form container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex flex-col gap-4 w-[450px]"
      >
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />

        {/* Animated button */}
        <motion.div
          animate={loading ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={
            loading
              ? { repeat: Infinity, duration: 0.8, ease: 'easeInOut' }
              : {}
          }
        >
          <Button
            text={loading ? 'Logging in…' : 'Login'}
            onClick={handleLogin}
            fillContainer={true}
            invert={false}
            // optionally disable clicks while loading
            {...(loading && { onClick: () => {} })}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
