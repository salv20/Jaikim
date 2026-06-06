'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [follower, setFollower] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    let followerX = 0, followerY = 0
    let mouseX = 0, mouseY = 0
    let rafId: number

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setPos({ x: mouseX, y: mouseY })
      if (!visible) setVisible(true)
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      setFollower({ x: followerX, y: followerY })
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousedown', () => setClicking(true))
    document.addEventListener('mouseup', () => setClicking(false))
    document.addEventListener('mouseleave', () => setVisible(false))
    document.addEventListener('mouseenter', () => setVisible(true))

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (typeof window === 'undefined') return null

  return (
    <>
      <div
        className="custom-cursor hidden md:block"
        style={{
          left: pos.x - 4,
          top: pos.y - 4,
          opacity: visible ? 1 : 0,
          transform: clicking ? 'scale(0.5)' : 'scale(1)',
        }}
      />
      <div
        className="cursor-follower hidden md:block"
        style={{
          left: follower.x - 16,
          top: follower.y - 16,
          opacity: visible ? 1 : 0,
          transform: clicking ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    </>
  )
}