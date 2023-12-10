import UserForm from '@/components/user-form';

export default async function RegisterPage() {
  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
      }
    >
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
      </div>
      <UserForm/>
    </div>
  );
};