"use client";

import { useState } from "react";

import { GlassCard } from "@/components/common/glass-card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";
import type { Survey, SurveyAnswers } from "@/lib/surveys/survey-types";

export function SurveyFill({ survey }: { survey: Survey }) {
  const { user } = useCurrentUser();
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function setSingle(qid: string, value: string) {
    setAnswers((current) => ({ ...current, [qid]: value }));
  }
  function toggleMulti(qid: string, option: string) {
    setAnswers((current) => {
      const list = Array.isArray(current[qid]) ? (current[qid] as string[]) : [];
      const next = list.includes(option) ? list.filter((o) => o !== option) : [...list, option];
      return { ...current, [qid]: next };
    });
  }

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const headers: Record<string, string> = { "content-type": "application/json" };
      if (user) {
        try {
          headers.authorization = `Bearer ${await user.getIdToken()}`;
        } catch {
          // 匿名作答
        }
      }
      const response = await fetch("/api/surveys/respond", {
        method: "POST",
        headers,
        body: JSON.stringify({ surveyId: survey.id, answers }),
      });
      if (response.ok) setDone(true);
      else setError("送出失敗，請稍後再試。");
    } catch {
      setError("送出失敗，請稍後再試。");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <GlassCard className="gold-border p-6 text-center">
        <h3 className="font-serif text-xl font-semibold text-platinum">已收到你的回饋</h3>
        <p className="mt-2 text-sm text-muted-foreground">感謝參與《神權崩壞》問卷調查。</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <h2 className="font-serif text-2xl font-semibold text-platinum">{survey.title}</h2>
      {survey.description ? <p className="mt-2 text-sm leading-7 text-muted-foreground">{survey.description}</p> : null}

      <div className="mt-5 grid gap-5">
        {survey.questions.map((question, index) => (
          <div key={question.id}>
            <p className="text-sm text-platinum">
              <span className="text-divine-gold">{index + 1}.</span> {question.text}
            </p>
            {question.type === "text" ? (
              <Textarea
                className="mt-2 min-h-20 border-divine-gold/25 bg-deep-space/45"
                value={(answers[question.id] as string) ?? ""}
                onChange={(event) => setSingle(question.id, event.target.value)}
              />
            ) : (
              <div className="mt-2 grid gap-2">
                {(question.options ?? []).map((option) => {
                  const selected =
                    question.type === "multiple"
                      ? Array.isArray(answers[question.id]) && (answers[question.id] as string[]).includes(option)
                      : answers[question.id] === option;
                  return (
                    <label key={option} className="flex items-center gap-2 rounded-lg border border-divine-gold/20 bg-deep-space/45 px-3 py-2 text-sm text-platinum">
                      <input
                        type={question.type === "multiple" ? "checkbox" : "radio"}
                        name={question.id}
                        checked={selected}
                        onChange={() => (question.type === "multiple" ? toggleMulti(question.id, option) : setSingle(question.id, option))}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <Button className="mt-6 bg-divine-gold text-deep-space hover:bg-platinum" disabled={busy} onClick={() => void submit()}>
        {busy ? "送出中…" : "送出問卷"}
      </Button>
      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
    </GlassCard>
  );
}
