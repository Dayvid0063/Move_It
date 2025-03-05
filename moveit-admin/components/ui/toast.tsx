"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps {
    open?: boolean;
    title?: React.ReactNode;
    description?: React.ReactNode;
    variant?: "default" | "destructive";
    onOpenChange?: (open: boolean) => void;
}

export interface ToastActionElement {
    label: string;
    onClick: () => void;
}

export const Toast = ({ open, title, description, variant = "default", onOpenChange }: ToastProps) => {
    if (!open) return null;

    return (
        <div
            className={cn(
                "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white",
                variant === "destructive" ? "bg-red-500" : "bg-gray-900"
            )}
        >
            {title && <div className="font-bold">{title}</div>}
            {description && <div className="text-sm">{description}</div>}
            <button className="mt-2 text-sm underline" onClick={() => onOpenChange?.(false)}>
                Close
            </button>
        </div>
    );
};
