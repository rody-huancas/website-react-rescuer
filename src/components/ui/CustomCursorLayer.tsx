"use client";

import { useEffect, useRef, useState } from "react";
import Cursor from "@/components/ui/Cursor";
import TextCursor from "@/components/ui/TextCursor";
import GrabCursor from "@/components/ui/GrabCursor";
import PointerCursor from "@/components/ui/PointerCursor";
import NotAllowedCursor from "@/components/ui/NotAllowedCursor";

const isFinePointer = () => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
};

type CursorKind = "default" | "pointer" | "text" | "not-allowed" | "grab";

const getCursorKind = (start: Element | null): CursorKind => {
  if (!start) return "default";

  if (
    start.closest(
      "button:disabled,[aria-disabled='true'],input:disabled,textarea:disabled,select:disabled,.cursor-not-allowed",
    )
  ) {
    return "not-allowed";
  }

  if (
    start.closest(
      "textarea,[contenteditable='true'],[contenteditable=''],.cursor-text,input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file'])",
    )
  ) {
    return "text";
  }

  if (start.closest("[draggable='true'],.cursor-grab,.cursor-grabbing")) {
    return "grab";
  }

  if (
    start.closest(
      "a,button,summary,[role='button'],label,input[type='button'],input[type='submit'],.cursor-pointer",
    )
  ) {
    return "pointer";
  }

  return "default";
};

const CustomCursorLayer = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [kind, setKind] = useState<CursorKind>("default");

  const cursorEl = useRef<HTMLDivElement | null>(null);
  const rafId    = useRef<number | null>(null);
  const target   = useRef({ x: 0, y: 0 });
  const current  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isFinePointer()) return;

    setEnabled(true);

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.35;
      current.current.y += dy * 0.35;

      if (cursorEl.current) {
        cursorEl.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      rafId.current = window.requestAnimationFrame(tick);
    };

    rafId.current = window.requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      setKind(getCursorKind(el));
    };

    const onOver = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setKind(getCursorKind(el));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorEl}
      aria-hidden
      className="rr-custom-cursor"
      style={{ left: 0, top: 0 }}
    >
      <div
        className={
          kind === "pointer" ? "rr-custom-cursor__pointer" : kind === "text"
              ? "rr-custom-cursor__text" : kind === "not-allowed"
                ? "rr-custom-cursor__not-allowed" : kind === "grab"
                  ? "rr-custom-cursor__grab" : "rr-custom-cursor__default"
        }
      >
        { kind === "pointer"     && <PointerCursor />    }
        { kind === "text"        && <TextCursor />       }
        { kind === "not-allowed" && <NotAllowedCursor /> }
        { kind === "grab"        && <GrabCursor />       }
        { kind === "default"     && <Cursor />           }
      </div>
    </div>
  );
};

export default CustomCursorLayer;
