'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight } from 'lucide-react'
import { useScroll, motion } from 'framer-motion'

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden pt-12">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-black text-white">Build 10x Faster with Tustar</h1>
                                <p className="mt-8 max-w-2xl text-balance text-lg text-zinc-400">Highly customizable digital ecosystems for modern engineering and hardware interfacing ventures.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-12 rounded-full pl-5 pr-3 text-base bg-[#00E5FF] hover:bg-[#00B8CC] text-black border-none">
                                        <Link href="/contact">
                                            <span className="text-nowrap font-bold">Start Building</span>
                                            <ChevronRight className="ml-1" />
                                        </Link>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-12 rounded-full px-5 text-base hover:bg-zinc-950/5 dark:hover:bg-white/5 border border-zinc-800 text-white">
                                        <Link href="/projects">
                                            <span className="text-nowrap">View Ecosystem</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-black/10 sm:aspect-video lg:rounded-[3rem] dark:border-white/5 bg-zinc-950">
                            <video
                                autoPlay
                                silent
                                loop
                                className="size-full object-cover opacity-50 dark:lg:opacity-75"
                                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"></video>
                        </div>
                    </div>
                </section>
                <section className="bg-background pb-2">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r border-zinc-800 md:pr-6">
                                <p className="text-end text-sm text-zinc-500 uppercase tracking-widest">Global Partners</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    speedOnHover={20}
                                    duration={40}
                                    gap={112}>
                                    <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity">
                                        <div className="text-white font-bold tracking-tighter text-xl italic">Nvidia</div>
                                    </div>

                                    <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity">
                                        <div className="text-white font-bold tracking-tighter text-xl italic">Github</div>
                                    </div>
                                    <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity">
                                       <div className="text-white font-bold tracking-tighter text-xl italic">SpaceX</div>
                                    </div>
                                     <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity">
                                       <div className="text-white font-bold tracking-tighter text-xl italic">OpenAI</div>
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    
    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-[100] w-full pt-2">
                <div className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12', scrolled && 'bg-zinc-900/50 backdrop-blur-2xl py-2')}>
                    <div
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-2')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white">
                                <Menu className={cn("m-auto size-6 duration-200", menuState && "rotate-180 scale-0 opacity-0")} />
                                <X className={cn("absolute inset-0 m-auto size-6 duration-200", !menuState ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm uppercase tracking-widest font-bold">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-zinc-400 hover:text-[#00E5FF] block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={cn("bg-zinc-950 lg:bg-transparent lg:flex mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-zinc-800 p-6 lg:m-0 lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:p-0 dark:shadow-none", !menuState ? "hidden" : "block")}>
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base font-bold uppercase">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-zinc-400 hover:text-[#00E5FF] block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full border-zinc-700 text-white">
                                    <Link href="/vault">
                                        <span>Vault Entry</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className="rounded-full bg-[#00E5FF] hover:bg-[#00B8CC] text-black border-none font-bold">
                                    <Link href="/contact">
                                        <span>Command Center</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="w-8 h-8 rounded bg-[#00E5FF] flex items-center justify-center">
                 <span className="text-black font-black text-xs">T</span>
            </div>
            <span className="text-white font-black tracking-tighter text-xl">TUSTAR <span className="text-[#00E5FF]">CO.</span></span>
        </div>
    )
}
