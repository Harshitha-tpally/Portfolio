
import { useEffect, useRef, useState } from "react";

type Selection = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function DragSelect({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!start.current) return;

      const x = event.clientX;
      const y = event.clientY;

      setSelection({
        x: Math.min(start.current.x, x),
        y: Math.min(start.current.y, y),
        width: Math.abs(x - start.current.x),
        height: Math.abs(y - start.current.y),
      });
    };

    const stop = () => {
      start.current = null;
      setSelection(null);
      document.body.classList.remove("drag-selecting");
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, []);

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const target = event.target as HTMLElement;

    if (
      target.closest(
        "button, a, input, textarea, select, option, label, [role='button'], [contenteditable='true']"
      )
    ) {
      return;
    }

    event.preventDefault();

    start.current = {
      x: event.clientX,
      y: event.clientY,
    };

    document.body.classList.add("drag-selecting");

    setSelection({
      x: event.clientX,
      y: event.clientY,
      width: 0,
      height: 0,
    });
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className="min-h-screen"
    >
      {children}

      {selection && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[9999] border border-[#78916F] bg-[#78916F]/15"
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
          }}
        />
      )}
    </div>
  );
}
