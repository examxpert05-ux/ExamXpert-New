'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    // Hide navigation on live test pages (e.g., /test/jee, /test/upsc, etc.)
    const isLiveTestPage = /^\/test\/[^\/]+$/.test(pathname)

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} ${!isLiveTestPage ? 'pt-20' : ''}`} suppressHydrationWarning>
                <Providers>
                    {!isLiveTestPage && <Navigation />}
                    {children}
                </Providers>
            </body>
        </html>
    )
}
