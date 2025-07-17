'use client'

import { useEffect, useRef } from 'react'

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 1200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
    }))

    let mouse = { x: width / 2, y: height / 2 }
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    })

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (let star of stars) {
        const dx = mouse.x - star.x
        const dy = mouse.y - star.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist <= 15 && dist > 1) {
          star.x += (dx / dist) * 0.7
          star.y += (dy / dist) * 0.7
        }

        if (dist <= 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${(100 - dist) / 100 * 0.8})`
          ctx.lineWidth = 1.2
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(star.x, star.y)
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  )
}

