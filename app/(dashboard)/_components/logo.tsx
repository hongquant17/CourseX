import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        height={50}
        width={50}
        alt="logo"
        loading="eager"
        priority={true}
        src="/logo.svg"
      />
    </Link>
  );
};
