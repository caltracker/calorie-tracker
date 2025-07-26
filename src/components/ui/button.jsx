// src/components/ui/button.jsx
import React from "react";

export function Button({ children, className = "", variant = "default", size = "md", ...props }) {
  let baseClasses = "rounded-md font-semibold transition-colors duration-200 ";

  let variantClasses = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    ghost: "bg-transparent hover:bg-blue-200 text-blue-700",
  };

  let sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-md",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
