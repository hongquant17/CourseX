import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  const logoSrc = "/logo.svg";

  return (
    <Link href="/">
      <Image
        height={0}
        width={0}
        alt="logo"
        src={logoSrc}
        priority={true}
        style={{ width: 'auto', height: '50px' }}
      />
    </Link>
  );
};
