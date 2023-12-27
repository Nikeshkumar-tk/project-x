import Image from "next/image"
import { redirect } from "next/navigation"
import { heroImage } from "@/images/index"

import { getUserSession } from "@/lib/next-auth"

export default async function Home() {
  const session = await getUserSession()
  if (session) redirect("/app")
  return (
    <main className="relative flex h-[80vh] justify-center">
      <Image
        className="absolute z-10 h-full object-cover"
        src={heroImage.src}
        height={heroImage.height}
        width={heroImage.width}
        alt="hero image"
        placeholder="blur"
        blurDataURL={heroImage.blurDataURL}
      />
      <div className="z-20 flex flex-col items-center justify-center">
        <div className="mb-2 rounded bg-gradient-to-br from-blue-500 via-cyan-100 to-blue-500 p-2 text-xl font-bold text-black shadow-lg">
          PROJECT U PRESENTS
        </div>
        <div className="mb-2 transform bg-gradient-to-r from-blue-200 to-cyan-100 bg-clip-text text-8xl font-bold tracking-wider text-transparent text-white transition-transform duration-300 hover:scale-105">
          PROJECT X
        </div>
        <div className="text-2xl font-semibold">BUILD LEARN GROW</div>
      </div>
    </main>
  )
}
