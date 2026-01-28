import { useState, useEffect } from "react";
// import {Breakpoint} from "./enums/BreakpointEnum";
import {Breakpoint} from "./const/BreakpointConst";

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

export const useSectionScroll = (sectionIds: string[]) => {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let maxRatio = 0;
                let current = activeSection;

                entries.forEach(entry => {
                    if (entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        current = entry.target.id;
                    }
                });

                setActiveSection(current);
            },
            { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
        );

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds]);

    return sectionIds.find(id => id !== activeSection);
};