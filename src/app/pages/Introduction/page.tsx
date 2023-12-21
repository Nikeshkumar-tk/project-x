"use client"

import React from "react"

const styles = `
    .typewriter {
        display:flex;
        justify-content: center;
        overflow: hidden;
        white-space: nowrap;
        margin: 0 auto;
        letter-spacing: .25em;
        animation: typing 1s steps(20, end), blink-caret .75s step-end infinite;
    }

    @keyframes typing {
        from { width: 0 }
        to { width: 100% }
    }
`

export default function page() {
  return (
    <main className="via-violent-600 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-blue-400 p-24 text-white">
      <div className="mb-2 rounded bg-gradient-to-br from-blue-500 via-cyan-100 to-blue-500 p-2 text-xl font-bold text-black shadow-lg">
        PROJECT U PRESENTS
      </div>
      <div className="mb-2 transform bg-gradient-to-r from-blue-200 to-cyan-100 bg-clip-text text-8xl font-bold tracking-wider text-transparent text-white transition-transform duration-300 hover:scale-105">
        PROJECT X
      </div>
      <div className="typewriter text-2xl font-semibold">BUILD LEARN GROW</div>
      <style jsx>{styles}</style>
    </main>
  )
}
