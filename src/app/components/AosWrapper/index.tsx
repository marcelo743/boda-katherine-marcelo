'use client'

import { useEffect } from 'react'
import AOS from 'aos'

import 'aos/dist/aos.css'

export default function AosWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800, // duración de la animación
      once: true,    // solo animar una vez
    })
  }, [])

  return <>{children}</>
}
