"use client";

import type { UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  error?: { message?: string };
  className?: string;
  registration: UseFormRegisterReturn;
  placeholder?: string;
  type?: string;
};

export function TextField({
  label,
  error,
  className,
  registration,
  placeholder,
  type = "text",
}: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <Input
        className="border-divine-gold/25 bg-deep-space/40"
        placeholder={placeholder}
        type={type}
        {...registration}
      />
      {error ? <p className="text-xs text-destructive">{error.message}</p> : null}
    </div>
  );
}

export function TextAreaField({
  label,
  error,
  className,
  registration,
  placeholder,
}: Omit<FieldProps, "type">) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <Textarea
        className="min-h-28 border-divine-gold/25 bg-deep-space/40"
        placeholder={placeholder}
        {...registration}
      />
      {error ? <p className="text-xs text-destructive">{error.message}</p> : null}
    </div>
  );
}
