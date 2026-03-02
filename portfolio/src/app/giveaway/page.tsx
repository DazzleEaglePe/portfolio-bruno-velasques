import Navbar from "@/components/Navbar";
import GiveawayPageContent from "@/components/sections/GiveawayPageContent";
import FooterSection from "@/components/sections/FooterSection";

export const metadata = {
    title: "Sorteo Mensual — Bruno Velasques",
    description: "Postula tu negocio y gana 1 mes de desarrollo web y transformación digital.",
};

export default function GiveawayPage() {
    return (
        <>
            <Navbar />
            <GiveawayPageContent />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
                <FooterSection />
            </div>
        </>
    );
}
