import Image from "next/image"
import { heroImage } from "@/images/index"

export default function Home() {
  return (
    <main className="h-[80vh]">
      <Image
        className="h-full object-cover"
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
