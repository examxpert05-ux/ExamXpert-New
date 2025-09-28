"use client"

import { AuthProvider } from '@/lib/AuthContext'
import { ThemeProvider } from '@/components/theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange={false}
                storageKey="examxpert-theme"
            >
                {children}
            </ThemeProvider>
        </AuthProvider>
    )
}
