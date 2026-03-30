'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DroneSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const imageSeq = useRef({ frame: 0 })
    const frameCount = 111

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = []
        let loadedCount = 0

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image()
            img.src = `/assets/sequence/scene${String(i).padStart(5, '0')}.jpg`
            img.onload = () => {
                loadedCount++
                if (loadedCount === frameCount) {
                    setImages(loadedImages)
                }
            }
            loadedImages.push(img)
        }
    }, [])

    useEffect(() => {
        if (images.length === 0 || !canvasRef.current || !containerRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const render = () => {
            const img = images[imageSeq.current.frame]
            if (!img) return

            const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
            const x = (canvas.width / 2) - (img.width / 2) * scale
            const y = (canvas.height / 2) - (img.height / 2) * scale
            
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
        }

        const resize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio
            canvas.height = window.innerHeight * window.devicePixelRatio
            render()
        }

        window.addEventListener('resize', resize)
        resize()

        const tl = gsap.to(imageSeq.current, {
            frame: frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            },
            onUpdate: render,
        })

        return () => {
            window.removeEventListener('resize', resize)
            tl.kill()
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [images])

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050811]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="h-full w-full object-cover opacity-60" />
                
                {/* Overlay Text Stages */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
                    <Stage id="stage-1" title="INDUSTRIAL AUTOMATION" subtitle="Architecting 4.0 Hardware Interfaces" />
                    <Stage id="stage-2" title="DIGITAL TWINNING" subtitle="High-Fidelity Real-time Simulation" />
                    <Stage id="stage-3" title="EDGE INTELLIGENCE" subtitle="Neural Processing at the Source" />
                    <Stage id="stage-4" title="COMMAND ESTABLISHED" subtitle="The Future of Engineering is Here" />
                </div>
            </div>
        </div>
    )
}

function Stage({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
    const stageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!stageRef.current) return
        
        const inMap: Record<string, number> = { 'stage-1': 0.1, 'stage-2': 0.35, 'stage-3': 0.6, 'stage-4': 0.85 }
        const outMap: Record<string, number> = { 'stage-1': 0.25, 'stage-2': 0.5, 'stage-3': 0.75, 'stage-4': 1.0 }

        gsap.fromTo(stageRef.current, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, y: 0,
                scrollTrigger: {
                    trigger: stageRef.current?.parentElement?.parentElement,
                    start: `top+=${inMap[id] * 100}% top`,
                    end: `top+=${outMap[id] * 100}% top`,
                    scrub: 1,
                }
            }
        )
    }, [id])

    return (
        <div ref={stageRef} className="absolute flex flex-col items-center text-center opacity-0 transition-none">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">{title}</h2>
            <p className="text-[#00E5FF] font-mono text-sm tracking-widest uppercase">{subtitle}</p>
        </div>
    )
}
