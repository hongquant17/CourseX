'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const Denied = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
    <h1 className="text-9xl font-extrabold text-white tracking-widest">403</h1>
    <div className="bg-red-500 px-2 text-sm rounded rotate-12 absolute">
    <h1>You dont have permission to access this page</h1>
    </div>
    <Button className="mt-5 px-8 py-3" variant="secondary">
    <Link href="/auth/signin">Sign in</Link>
      </Button>
  </div>
  )
}

export default Denied;