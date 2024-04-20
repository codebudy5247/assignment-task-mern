'use client'
import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const ResizableBox = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef<boolean>(false);
  const initialMouseX = useRef<number | null>(null);
  const initialMouseY = useRef<number | null>(null);
  const initialWidthRef = useRef<number | null>(null);
  const initialHeightRef = useRef<number | null>(null);
  const directionRef = useRef<string | null>(null); // Store the resizing direction

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    direction: string
  ) => {
    if (!containerRef.current) return;

    e.preventDefault();

    resizingRef.current = true;
    initialMouseX.current = e.clientX;
    initialMouseY.current = e.clientY;
    initialWidthRef.current = containerRef.current.offsetWidth;
    initialHeightRef.current = containerRef.current.offsetHeight;
    directionRef.current = direction;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current || !containerRef.current || !directionRef.current)
      return;
    
    const dx = e.clientX - (initialMouseX.current ?? 0);
    const dy = e.clientY - (initialMouseY.current ?? 0);

    let newWidth = initialWidthRef.current ?? 0;
    let newHeight = initialHeightRef.current ?? 0;

    // Adjust width and height based on the resizing direction
    if (directionRef.current.includes("right")) newWidth += dx;
    if (directionRef.current.includes("left")) newWidth -= dx;
    if (directionRef.current.includes("bottom")) newHeight += dy;
    if (directionRef.current.includes("top")) newHeight -= dy;

    containerRef.current.style.width = `${Math.max(newWidth, 50)}px`; // Minimum width
    containerRef.current.style.height = `${Math.max(newHeight, 50)}px`; // Minimum height
  };

  const handleMouseUp = () => {
    resizingRef.current = false;
    initialMouseX.current = null;
    initialMouseY.current = null;
    initialWidthRef.current = null;
    initialHeightRef.current = null;
    directionRef.current = null; // Clear the resizing direction

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className="resizable-container bg-white p-4 rounded-sm relative h-[80vh]"
      ref={containerRef}
    >
      <div className="resizable-content">{children}</div>
      <div
        className="resizable-handle resizable-handle-right absolute right-0 top-0 bottom-0 w-1 bg-gray-500 cursor-col-resize"
        onMouseDown={(e) => handleMouseDown(e, "right")}
      />
      <div
        className="resizable-handle resizable-handle-left absolute left-0 top-0 bottom-0 w-1 bg-gray-500 cursor-col-resize"
        onMouseDown={(e) => handleMouseDown(e, "left")}
      />
      <div
        className="resizable-handle resizable-handle-bottom absolute left-0 right-0 bottom-0 h-1 bg-gray-500 cursor-row-resize"
        onMouseDown={(e) => handleMouseDown(e, "bottom")}
      />
      <div
        className="resizable-handle resizable-handle-top absolute left-0 right-0 top-0 h-1 bg-gray-500 cursor-row-resize"
        onMouseDown={(e) => handleMouseDown(e, "top")}
      />
    </div>
  );
};

export default ResizableBox;
