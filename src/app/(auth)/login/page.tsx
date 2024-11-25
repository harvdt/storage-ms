'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import Cookies from 'universal-cookie';

import { cn } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';

import { LoginRequest } from '@/types/api';

const cookies = new Cookies();

export default function LoginPage() {
  const formRef = React.useRef<HTMLFormElement>(null);

  const router = useRouter();

  const { data: response, executeRequest } = useFetch<{ token: string }>(
    'http://localhost:8080/api/admin/login',
    'POST',
  );

  React.useEffect(() => {
    if (response) {
      formRef.current?.reset();

      cookies.set('@osms/token', response.token, { path: '/' });

      router.push('/admin/home');
    }
  }, [response, router]);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries()) as LoginRequest;

    await executeRequest(data);
  };

  return (
    <main className='flex min-h-screen items-center justify-center'>
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        className='relative flex h-[32rem] w-[28rem] flex-col items-center rounded-xl bg-white'
      >
        <Link href='/'>
          <ImCancelCircle className='absolute left-7 top-6 cursor-pointer text-3xl text-main' />
        </Link>

        <p
          className={cn(
            'text-center font-dm_serif_display text-4xl text-main',
            'mt-4 [text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)]',
          )}
        >
          Login
        </p>
        <p
          className={cn(
            'text-center font-dm_serif_display text-4xl text-main',
            'mt-4 px-16 [text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)]',
          )}
        >
          OSMS
        </p>

        <div className='mt-6 flex h-[18rem] w-[22rem] flex-col items-center rounded-xl border-[3px] border-main'>
          <div
            className={cn(
              'mt-6 h-14 w-64 rounded-md bg-gradient-to-r from-main to-secondary p-2',
              '[box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]',
            )}
          >
            <p className='text-center font-lexend text-sm font-bold text-white'>
              Masukkan Username dan Password Anda
            </p>
          </div>

          <div className='mt-6 flex flex-col gap-y-4'>
            <div>
              <p className='font-lexend font-bold text-main'>Username:</p>
              <input
                id='username'
                name='username'
                type='text'
                placeholder='Input your username'
                className='mt-2 h-8 w-64 rounded-md border-2 border-main pl-2 font-lexend text-sm font-semibold text-main placeholder-red-300 focus:border-secondary'
              />
            </div>

            <div>
              <p className='font-lexend font-bold text-main'>Password:</p>
              <input
                id='password'
                name='password'
                type='password'
                placeholder='Input your password'
                className='mt-2 h-8 w-64 rounded-md border-2 border-main pl-2 font-lexend text-sm font-semibold text-main placeholder-red-300 focus:border-secondary'
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className={cn(
            'mt-5 h-10 w-60 rounded-xl bg-gradient-to-r from-main to-secondary',
            'font-lexend font-bold text-white',
            '[box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]',
          )}
        >
          Login
        </button>
      </form>
    </main>
  );
}
