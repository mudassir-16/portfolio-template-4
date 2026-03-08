import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Pictures from "@/components/Pictures";
import Contact from "@/components/Contact";
import { getPortfolioData } from "@/lib/db_service";

export default async function Home() {
    let data = null;
    try {
        data = await getPortfolioData();
    } catch (e) {
        console.error("Failed to fetch initial portfolio data:", e);
    }

    return (
        <main className="relative min-h-screen bg-[#1a0202]">
            <Navbar />

            <div id="home">
                <Hero profile={data?.profile} />
            </div>

            <div id="about">
                <About profile={data?.profile} education={data?.education} leadership={data?.leadership} />
            </div>

            <div id="skills">
                <Skills skills={data?.skills} />
            </div>

            <div id="pictures">
                <Pictures achievements={data?.achievements} />
            </div>
            <div id="contact">
                <Contact profile={data?.profile} />
            </div>

            <footer className="py-20 px-6 md:px-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-[10px] uppercase font-bold tracking-[0.5em]">
                <p>© 2026 {data?.profile?.name || "Mohammed Mudassir"}</p>
                <div className="flex gap-12">
                    <a href="#" className="hover:text-accent-red transition-colors">Privacy</a>
                    <a href="#" className="hover:text-accent-red transition-colors">Terms</a>
                </div>
            </footer>
        </main>
    );
}
