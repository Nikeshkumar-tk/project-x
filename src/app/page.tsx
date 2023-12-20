import Image from "next/image";
import { heroImage } from "@/images/index"
export default function Home() {
  return (
    <main className="h-[80vh]">
      <Image
        className="object-cover h-full"
        src={heroImage.src}
        height={heroImage.height}
        width={heroImage.width}
        alt="hero image"
        placeholder="blur"
        blurDataURL={heroImage.blurDataURL}
      />
   
    </main>
  )
}