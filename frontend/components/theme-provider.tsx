"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Always render the NextThemesProvider to ensure theme context is available
    // This prevents hydration mismatches by maintaining consistent structure
    return (
        <NextThemesProvider
            {...props}
            // Disable system theme detection until after hydration to prevent flash
            enableSystem={mounted}
            // Disable transitions on initial load to prevent theme flash
            disableTransitionOnChange={!mounted}
        >
            {children}
        </NextThemesProvider>
    )
}
