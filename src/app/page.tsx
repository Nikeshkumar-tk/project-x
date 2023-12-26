import Image from "next/image"
import { heroImage } from "@/images/index"
import { getUserSession } from "@/lib/next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getUserSession()
  if(session) redirect('/app')
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
