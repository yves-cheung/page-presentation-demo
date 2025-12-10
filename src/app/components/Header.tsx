import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full bg-custom-black h-16 flex items-center justify-center px-4"> 
    <a href="/">
      <Image
        src="/header_atl_logo.png"
        alt="Header Logo"
        width={100}
        height={50}
        className="h-8 w-auto" 
      />
    </a>
  </div>
  );
}