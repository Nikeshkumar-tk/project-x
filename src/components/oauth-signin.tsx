"use client"

import { strategy } from "@/config/auth"
import { Button } from "./ui/button"
import { signIn } from "next-auth/react"

type Props = {
    strategy: keyof typeof strategy
}

export default function OAuthSignInBtn(props: Props) {
    return (
        <Button onClick={() => signIn(props.strategy)}>Sign In</Button>
    )
}