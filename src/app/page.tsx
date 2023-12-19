import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <Button className='animate-bounce' variant={"default"}>Sign In</Button>
    </main>
  )
}