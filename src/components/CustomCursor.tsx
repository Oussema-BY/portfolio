"use client";

import * as React from "react";

type CursorState = "default" | "hover" | "view" | "explore" | "open" | "text";

const CursorContext = React.createContext<{
  setCursorState: (state: CursorState) => void;
  setCursorLabel: (label: string) => void;
}>({
  setCursorState: () => {},
  setCursorLabel: () => {},
});

export function useCursor() {
  return React.useContext(CursorContext);
}

export function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);

  const [cursorState, setCursorState] = React.useState<CursorState>("default");
  const [label, setLabel] = React.useState("");
  const [isTouch, setIsTouch] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const pos = React.useRef({ x: -100, y: -100 });
  const ringPos = React.useRef({ x: -100, y: -100 });
  const rafId = React.useRef<number>(0);

  React.useEffect(() => {
    // Detect touch device or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    const handleEnter = () => {
      setIsVisible(true);
    };

    const animate = () => {
      if (dotRef.current && ringRef.current && labelRef.current) {
        // Direct dot movement
        dotRef.current.style.transform = `translate3d(${pos.current.x - 3}px, ${pos.current.y - 3}px, 0)`;

        // Smooth trailing ring lerp
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.16;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.16;

        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0)`;
        labelRef.current.style.transform = `translate3d(${ringPos.current.x - 32}px, ${ringPos.current.y - 42}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouch) return null;

  const isInteractive = cursorState === "hover" || cursorState === "open" || cursorState === "view" || cursorState === "explore";
  const ringSize = isInteractive ? 46 : cursorState === "text" ? 22 : 32;
  const dotSize = cursorState === "text" ? 3 : isInteractive ? 7 : 5;
  const hasLabel = Boolean(label);

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: isInteractive ? "#818CF8" : "#6366F1",
          boxShadow: "0 0 10px rgba(99,102,241,0.8)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease, width 0.15s ease, height 0.15s ease, background-color 0.15s ease",
          willChange: "transform",
        }}
      />

      {/* Outer ambient follower ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: `1.5px solid ${isInteractive ? "rgba(129, 140, 248, 0.9)" : "rgba(99, 102, 241, 0.45)"}`,
          backgroundColor: isInteractive ? "rgba(99, 102, 241, 0.12)" : "transparent",
          boxShadow: isInteractive ? "0 0 20px rgba(99, 102, 241, 0.3)" : "none",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease, width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
          willChange: "transform",
          transformOrigin: "center center",
        }}
      />

      {/* Contextual tooltip badge */}
      <div
        ref={labelRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 64,
          pointerEvents: "none",
          zIndex: 99997,
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "#FAFAFA",
          textAlign: "center",
          opacity: isVisible && hasLabel ? 1 : 0,
          transition: "opacity 0.15s ease",
          whiteSpace: "nowrap",
          lineHeight: 1,
          textShadow: "0 2px 6px rgba(0,0,0,0.8)",
        }}
      >
        {label}
      </div>

      <CursorStateInjector
        setCursorState={setCursorState}
        setLabel={setLabel}
      />
    </>
  );
}

function CursorStateInjector({
  setCursorState,
  setLabel,
}: {
  setCursorState: (s: CursorState) => void;
  setLabel: (l: string) => void;
}) {
  React.useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) return;

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestWithCursor = target.closest("[data-cursor]") as HTMLElement | null;
      if (closestWithCursor) {
        const state = (closestWithCursor.dataset.cursor as CursorState) || "hover";
        const cursorLabel = closestWithCursor.dataset.cursorLabel ?? "";
        setCursorState(state);
        setLabel(cursorLabel);
        return;
      }

      if (
        target.matches("a, button, [role='button'], input[type='submit'], input[type='button'], summary") ||
        target.closest("a, button, [role='button']")
      ) {
        setCursorState("hover");
        setLabel("");
        return;
      }

      if (target.matches("input, textarea, [contenteditable='true']")) {
        setCursorState("text");
        setLabel("");
        return;
      }

      setCursorState("default");
      setLabel("");
    };

    document.addEventListener("mouseover", over, { passive: true });
    return () => document.removeEventListener("mouseover", over);
  }, [setCursorState, setLabel]);

  return null;
}

export { CursorContext };
