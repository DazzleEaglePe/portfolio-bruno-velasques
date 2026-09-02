import Navbar from "@/components/Navbar";
import GiveawayPageContent from "@/components/sections/GiveawayPageContent";
import FooterSection from "@/components/sections/FooterSection";

export const metadata = {
    title: "Agente de IA para tu negocio — Bruno Velasques",
    description: "Postula tu negocio al sorteo mensual y obtén la implementación de un agente conversacional de IA a medida.",
};

export default function GiveawayPage() {
    return (
        <>
            <Navbar />
            <GiveawayPageContent />
            <div className="mx-auto max-w-[1240px] px-4 pb-8 sm:px-6 lg:px-8">
                <FooterSection />
            </div>
        </>
    );
}
