import { RefObject, KeyboardEvent } from "react";

export interface TerminalLine {
    text: string;
    color: string;
    isCommand?: boolean;
}

export type WindowState = "normal" | "minimized" | "maximized";

export interface TerminalState {
    inputValue: string;
    setInputValue: (val: string) => void;
    showInput: boolean;
    windowState: WindowState;
    setWindowState: (state: WindowState | ((prev: WindowState) => WindowState)) => void;
    isClosed: boolean;
    setIsClosed: (closed: boolean) => void;
    windowSize: { width: number; height: number };
    setWindowSize: (updater: (prev: { width: number; height: number }) => { width: number; height: number }) => void;
    lines: TerminalLine[];
    initialLines: TerminalLine[];
    inputRef: RefObject<HTMLInputElement | null>;
    scrollRef: RefObject<HTMLDivElement | null>;
    constraintsRef: RefObject<HTMLElement | null>;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    es: boolean;
    hasAnimatedRef: RefObject<boolean>;
}
