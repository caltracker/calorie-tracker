// src/components/ui/input.jsx
import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "rounded-md border border-white/40 bg-white/30 placeholder-blue-400 text-blue-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 " +
        className
      }
      {...props}
    />
  );
}
