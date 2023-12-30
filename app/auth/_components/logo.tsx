import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
      <Image
        height={0}
        width={0}
        alt="logo"
        src={"/logo.svg"}
        priority={true}
        style={{ width: "auto", height: "50px" }}
      />
  );
};
