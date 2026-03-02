"use client";

import { useI18n } from "@/lib/i18n";
import { Separator } from "@/components/ui/separator";

export default function FooterSection() {
    const { t } = useI18n();

    return (
        <footer className="pt-6 pb-4">
            <Separator className="mb-8" />
            <p className="text-[11px] text-muted-foreground font-mono text-center">{t("footer.credit")}</p>
        </footer>
    );
}
