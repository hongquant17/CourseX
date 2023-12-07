import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark'
  const logoSrc = isDarkMode ? '/light_logo.svg' : '/logo.svg';

  return (
    <Link href="/">
      <Image
        height={50}
        width={50}
        alt="logo"
        loading="eager"
        priority={true}
        src={logoSrc}
      />
    </Link>
  );
};
