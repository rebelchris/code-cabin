"use client"

import { useState, useEffect, useCallback } from "react"

interface UseScrollSubscribeOptions {
  scrollThreshold?: number // Percentage of page scrolled (0-1)
  delayMs?: number // Delay before showing modal after threshold is reached
  dismissKey?: string // localStorage key to remember if user dismissed
}

export function useScrollSubscribe({
  scrollThreshold = 0.5,
  delayMs = 200,
  dismissKey = "scroll-subscribe-dismissed"
}: UseScrollSubscribeOptions = {}) {
  const [showModal, setShowModal] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  const dismissModal = useCallback(() => {
    setShowModal(false)
    // Remember dismissal for this session
    sessionStorage.setItem(dismissKey, "true")
  }, [dismissKey])

  useEffect(() => {
    // Check if user already dismissed this session
    if (sessionStorage.getItem(dismissKey) === "true") {
      return
    }

    const handleScroll = () => {
      if (hasTriggered) return

      const scrollTop = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = scrollTop / documentHeight
      if (scrollPercentage >= scrollThreshold) {
        setHasTriggered(true)
          setShowModal(true)
      }
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrollThreshold, delayMs, dismissKey, hasTriggered])

  return {
    showModal,
    dismissModal,
    hasTriggered
  }
}
