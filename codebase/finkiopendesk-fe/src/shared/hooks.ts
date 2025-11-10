import { useState, useEffect } from "react";
import {Breakpoint} from "./enums/BreakpointEnum";

export type BreakpointSize = keyof typeof Breakpoint;

export const useBreakpoint = (): BreakpointSize => {
    const getBreakpoint = (): BreakpointSize => {
        const width = window.innerWidth;

        if (width < Breakpoint.xs) return "xs";
        if (width < Breakpoint.sm) return "sm";
        if (width < Breakpoint.md) return "md";
        if (width < Breakpoint.lg) return "lg";
        return "xl";
    };

    const [current, setCurrent] = useState<BreakpointSize>(getBreakpoint);

    useEffect(() => {
        const handleResize = () => setCurrent(getBreakpoint());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return current;
};