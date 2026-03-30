import { DroneSequence } from "@/components/DroneSequence";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050811]">
        {/* Cinematic Hero */}
        <DroneSequence />

        {/* Detailed Services Grid */}
        <section className="relative z-10 py-32 px-6 bg-[#050811]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 italic">CORE_SERVICES</h1>
                    <p className="text-zinc-400 text-lg max-w-2xl font-medium tracking-tight">
                        From industrial hardware interfacing to cloud-scale infrastructure, we deploy elite digital ecosystems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-1 bg-zinc-800/20 border border-zinc-800">
                    <ServiceCard title="Ecosystem Architecture" desc="Engineering the structural backbone of your digital presence with industrial precision." />
                    <ServiceCard title="Nexus AI Integration" desc="Injecting advanced LLM intelligence into your command and control layers." />
                    <ServiceCard title="Hardware Interface" desc="Bridging the gap between software and the physical world via elite custom protocols." />
                </div>
            </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6 border-t border-zinc-800/50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-black text-white mb-8 italic uppercase tracking-widest">ESTABLISH_CONNECTION</h2>
                <Button asChild size="lg" className="rounded-full bg-[#00E5FF] hover:bg-[#00B8CC] text-black font-black px-12 h-14 border-none">
                    <Link href="/contact" className="flex items-center">
                        COMMAND_CENTER <ChevronRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </section>
    </main>
  );
}

function ServiceCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-[#050811] p-12 hover:bg-[#080d1a] transition-colors group cursor-crosshair">
            <div className="w-12 h-1 px-0 bg-zinc-800 group-hover:bg-[#00E5FF] mb-8 transition-colors" />
            <h3 className="text-white font-black text-2xl mb-4 italic tracking-tight">{title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed tracking-tight">{desc}</p>
        </div>
    )
}
