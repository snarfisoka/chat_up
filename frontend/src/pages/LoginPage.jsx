import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageCircleMoreIcon } from 'lucide-react';
import React, { useState } from 'react'
import { login } from '../lib/api';

import { Link } from 'react-router';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"]}),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(loginData);
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="ocean">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
      {/* LOGIN FORM SECTION */}
      <div className='w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col'>
      {/* LOGO */}
      <div className='mb-4 flex items-center justify-start gap-2'>
        <MessageCircleMoreIcon className='size-9 text-primary' />
        <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
          Chat Up
        </span>
      </div>
      {/* ERROR */}
      {error && (
        <div className='alert alert-error mb-4'>
          <span>{error.response.data.message}</span>
        </div>
      )}

      <div className='w-full'>
        <form onSubmit={handleLogin}>
          <div className='space-y-4'>
            <div>
              <h2 className='text-xl font-semibold'>Welcome Back</h2>
              <p className='text-sm opacity-70'>
                Sign in to your account to continue chattin'
              </p>
            </div>

            <div className='flex flex-col gap-3'>
              <div className='form-control w-full space-y-2'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input 
                  type="email" 
                  placeholder='hello@example.com'
                  className='input input-bordered w-full rounded-full'
                  value={loginData.email} 
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value})}
                  required
                />
              </div>

              <div className='form-control w-full space-y-2'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input 
                  type="password" 
                  placeholder='*********'
                  className='input input-bordered w-full rounded-full'
                  value={loginData.password} 
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value})}
                  required
                />
              </div>

              <button type='submit' className='btn btn-primary w-full rounded-full' disabled={isPending}>
                {isPending ? (
                  <>
                  <span className='loading loading-spinner loading-xs'></span>
                  Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div>
                <p>
                  Don't have an account?{" "}
                  <Link to='/signup' className='text-primary hover:underline'>
                    Create One 
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      </div>

      {/* IMAGE SECTION */}
      <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
        <div className='max-w-md p-8'>
          {/* ILLUSTRATION */}
          <div className='relative aspect-square max-w-sm mx-auto'>
            <img src="/i.png" alt="Video" className='w-full h-full' />
          </div>

          <div className='text-center space-y-3 mt-6'>
            <h2 className='text-xl font-semibold'>Connect and start chattin'</h2>
            <p className='opacity-70'>
              Enjoy conversations and make friends
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default LoginPage
