"use client"

import { useState, useEffect } from "react"

interface ScrollOptions {
  threshold?: number
  scrollUpThreshold?: number
}

export function useScroll({ threshold = 100, scrollUpThreshold = 50 }: ScrollOptions = {}) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollingUp, setScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if we've scrolled past the threshold
      if (currentScrollY > threshold) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Check if we're scrolling up
      if (currentScrollY < lastScrollY - scrollUpThreshold) {
        setScrollingUp(true)
      } else if (currentScrollY > lastScrollY + 10) {
        setScrollingUp(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, threshold, scrollUpThreshold])

  return { scrolled, scrollingUp, scrollY: lastScrollY }
}
