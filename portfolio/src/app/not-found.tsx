"use client";

import { useTerminal } from "@/hooks/useTerminal";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalDock } from "@/components/terminal/TerminalDock";

export default function NotFound() {
    const terminal = useTerminal();

    return (
        <main 
            ref={terminal.constraintsRef as any}
            className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background"
            onClick={() => terminal.windowState !== "minimized" && !terminal.isClosed && terminal.inputRef.current?.focus()}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(150,150,150,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(150,150,150,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_10%,#000_100%)] pointer-events-none"></div>

            {/* Terminal Desktop Components */}
            <TerminalWindow terminal={terminal} />
            <TerminalDock terminal={terminal} />
        </main>
    );
}
