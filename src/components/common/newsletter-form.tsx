"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({
  email: z.email("請輸入有效的電子郵件"),
});

type NewsletterInput = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    setSubmitted(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="輸入 Email 接收神諭更新"
          aria-label="訂閱電子郵件"
          className="h-11 border-divine-gold/25 bg-deep-space/55 text-platinum placeholder:text-muted-foreground"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 bg-divine-gold text-deep-space hover:bg-platinum sm:w-32",
          )}
        >
          <Send className="size-4" aria-hidden="true" />
          訂閱
        </button>
      </div>
      {errors.email ? (
        <p className="mt-2 text-xs text-destructive">{errors.email.message}</p>
      ) : null}
      {submitted ? (
        <p className="mt-2 text-xs text-divine-gold">
          已收到訂閱請求，神諭更新將送往你的信箱。
        </p>
      ) : null}
    </form>
  );
}
