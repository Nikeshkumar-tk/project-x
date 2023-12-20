'use client'
import React from 'react'

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
`;

export default function page() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24 text-white bg-gradient-to-br from-blue-800 via-violent-600 to-blue-400">
            <div className="p-2 mb-2 text-xl rounded text-black font-bold bg-gradient-to-br from-blue-500 via-cyan-100 to-blue-500 shadow-lg">
                PROJECT U PRESENTS
            </div>
            <div className="mb-2 text-8xl tracking-wider font-bold text-white transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-200 to-cyan-100 bg-clip-text text-transparent">
                PROJECT X
            </div>
            <div className="text-2xl font-semibold typewriter">
                BUILD LEARN GROW
            </div>
            <style jsx>{styles}</style>
        </main>
    )
}
