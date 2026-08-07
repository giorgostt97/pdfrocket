"use client";

import { useRef } from "react";
import { SignatureItem } from "../types/signature";
import { useSignature } from "../context/SignatureContext";

type Props = {
  signature: SignatureItem;
};

export default function SignatureOverlay({
  signature,
}: Props) {
  const { updateSignature, deleteSignature } = useSignature();

  const dragOffset = useRef({
    x: 0,
    y: 0,
  });

  const resizeStart = useRef({
    x: 0,
    y: 0,
    width: signature.width,
    height: signature.height,
  });

  const dragging = useRef(false);
  const resizing = useRef(false);

  function startDrag(
    e: React.MouseEvent<HTMLImageElement>
  ) {
    e.stopPropagation();

    dragging.current = true;

    dragOffset.current = {
      x: e.clientX - signature.x,
      y: e.clientY - signature.y,
    };
  }

  function startResize(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    e.stopPropagation();

    resizing.current = true;

    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: signature.width,
      height: signature.height,
    };
  }

  function mouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    if (dragging.current) {
      updateSignature(signature.id, {
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }

    if (resizing.current) {
      const dx = e.clientX - resizeStart.current.x;

      const width = Math.max(
        60,
        resizeStart.current.width + dx
      );

      const ratio =
        resizeStart.current.height /
        resizeStart.current.width;

      updateSignature(signature.id, {
        width,
        height: width * ratio,
      });
    }
  }

  function mouseUp() {
    dragging.current = false;
    resizing.current = false;
  }

  return (
    <div
      className="absolute inset-0"
      onMouseMove={mouseMove}
      onMouseUp={mouseUp}
      onMouseLeave={mouseUp}
    >
      <div
        style={{
          position: "absolute",
          left: signature.x,
          top: signature.y,
          width: signature.width,
          height: signature.height,
        }}
      >
        <img
          src={signature.image}
          alt="Signature"
          draggable={false}
          onMouseDown={startDrag}
          style={{
            width: "100%",
            height: "100%",
            cursor: "grab",
            userSelect: "none",
            border: "2px dashed #3b82f6",
            borderRadius: 8,
            background: "white",
          }}
        />

        <button
          onClick={() =>
            deleteSignature(signature.id)
          }
          style={{
            position: "absolute",
            top: -14,
            right: -14,
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "none",
            background: "#ef4444",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ×
        </button>

        <div
          onMouseDown={startResize}
          style={{
            position: "absolute",
            right: -7,
            bottom: -7,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#2563eb",
            border: "2px solid white",
            cursor: "nwse-resize",
          }}
        />
      </div>
    </div>
  );
}