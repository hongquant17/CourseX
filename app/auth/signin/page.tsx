import { getProviders, signIn } from 'next-auth/react';
import LoginForm from './_components/form';
import { getSession } from '@/lib/auth';


export default async function RegisterPage() {
  return (
    <>
      <LoginForm/>
    </>
  );
};