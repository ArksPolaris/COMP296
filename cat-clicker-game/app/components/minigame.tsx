"use client";

import React, { useState, useRef, useEffect } from "react";

const stuff = ["/vercel.svg", "/file.svg", "/window.svg", "/next.svg", "/globe.svg"];

function randomItem(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function Item() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [imageSrc, setImageSrc] = useState(randomItem(stuff));
  const itemRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = () => {
    if (!itemRef.current || !containerRef.current) return;

    const imgWidth = itemRef.current.clientWidth;
    const imgHeight = itemRef.current.clientHeight;

    const containerRect = containerRef.current.getBoundingClientRect();

    const maxLeft = containerRect.width - imgWidth;
    const maxTop = containerRect.height - imgHeight;

    const safeMaxLeft = Math.max(0, maxLeft);
    const safeMaxTop = Math.max(0, maxTop);

    const left = Math.floor(Math.random() * safeMaxLeft);
    const top = Math.floor(Math.random() * safeMaxTop);

    setPosition({ top, left });
  };

  useEffect(() => {
    move();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "300px", 
        border: "1px solid transparent",
        overflow: "hidden",
      }}
    >
      <img
        ref={itemRef}
        src={imageSrc}
        alt="Moving item"
        width={40}
        height={40}
        onClick={move}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          cursor: "pointer",
          userSelect: "none",
          transition: "top 0.3s ease, left 0.3s ease",
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setImageSrc(randomItem(stuff));
        }}
      />
    </div>
  );
}