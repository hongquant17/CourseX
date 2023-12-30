import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  const { theme, setTheme } = useTheme();
  const [logoSrc, setLogo] = useState(theme === "dark" ? "/light_logo.svg" : "/logo.svg");
  useEffect(() => {
    if (theme === "system" && typeof window !== "undefined") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setLogo("/light_logo.svg");
      } else {
        setLogo("/logo.svg");
      }
    } else {
      setLogo(theme === "dark" ? "/light_logo.svg" : "/logo.svg");
    }
  }, [logoSrc, theme]);

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
