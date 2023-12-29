import { Navbar } from "./_components/navbar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] fixed w-full">
        <Navbar />
      </div>
      <main className="pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default ProfileLayout;
