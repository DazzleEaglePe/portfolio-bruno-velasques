import Navbar from "@/components/Navbar";
import GiveawayPageContent from "@/components/sections/GiveawayPageContent";
import FooterSection from "@/components/sections/FooterSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
    title: "Sorteo Oficial — Nosotros",
    description: "Postula tu negocio y gana una página web profesional y transformación digital.",
};

export default function GiveawayPage() {
    return (
        <>
            <Navbar />
            <GiveawayPageContent />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 space-y-16">
                {/* <ContactSection /> */}
                <FooterSection />
            </div>
        </>
    );
}
