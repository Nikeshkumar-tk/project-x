"use server"

import { getServerSession } from "next-auth"

import { authOptions } from "@/config/next-auth"

export async function getUserSession() {
  return await getServerSession(authOptions)
}
