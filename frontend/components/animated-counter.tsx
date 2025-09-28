'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedCounterProps {
    value: number
    suffix?: string
    prefix?: string
    duration?: number
    className?: string
}

export function AnimatedCounter({
    value,
    suffix = '',
    prefix = '',
    duration = 2,
    className = ''
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            let startTime: number
            let animationFrame: number

            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime
                const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4)
                setCount(Math.floor(easeOutQuart * value))

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate)
                }
            }

            animationFrame = requestAnimationFrame(animate)

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame)
                }
            }
        }
    }, [isInView, value, duration])

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {prefix}{count.toLocaleString()}{suffix}
        </motion.span>
    )
}
