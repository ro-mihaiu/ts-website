"use client";

import { useMemo, useState } from "react";
import { Check, ClipboardCopy, Send } from "lucide-react";

type Edition = "java" | "bedrock" | "both";

interface UploadFormState {
  trustedStaffId: string;
  youtubeUrl: string;
  schematicUrl: string;
  edition: Edition;
  description: string;
}

const initialState: UploadFormState = {
  trustedStaffId: "",
  youtubeUrl: "",
  schematicUrl: "",
  edition: "java",
  description: "",
};

export function UploadRequestForm() {
  const [form, setForm] = useState<UploadFormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const payload = useMemo(() => {
    return [
      `trusted_staff: ${form.trustedStaffId || "@user-id"}`,
      `youtube: ${form.youtubeUrl || "https://"}`,
      `schematic_or_world: ${form.schematicUrl || "https://"}`,
      `edition: ${form.edition}`,
      `description: ${form.description || "(add context)"}`,
    ].join("\n");
  }, [form]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  async function copyPayload() {
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="space-y-1.5 text-sm text-slate-300">
            Trusted staff @user-id
            <input
              required
              value={form.trustedStaffId}
              onChange={(event) => setForm((prev) => ({ ...prev, trustedStaffId: event.target.value }))}
              placeholder="@trusted-staff"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500"
            />
          </label>

          <label className="space-y-1.5 text-sm text-slate-300">
            Edition
            <select
              value={form.edition}
              onChange={(event) => setForm((prev) => ({ ...prev, edition: event.target.value as Edition }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500"
            >
              <option value="java">Java</option>
              <option value="bedrock">Bedrock</option>
              <option value="both">Both</option>
            </select>
          </label>
        </div>

        <label className="space-y-1.5 text-sm text-slate-300 block">
          YouTube URL
          <input
            required
            type="url"
            value={form.youtubeUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, youtubeUrl: event.target.value }))}
            placeholder="https://youtube.com/..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500"
          />
        </label>

        <label className="space-y-1.5 text-sm text-slate-300 block">
          Schematic or world link
          <input
            required
            type="url"
            value={form.schematicUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, schematicUrl: event.target.value }))}
            placeholder="https://drive.google.com/..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500"
          />
        </label>

        <label className="space-y-1.5 text-sm text-slate-300 block">
          Description
          <textarea
            required
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            placeholder="Short summary: what this is, rates, version, anything moderators should know."
            rows={5}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500"
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-500"
        >
          <Send className="h-4 w-4" /> Generate Submission
        </button>
      </form>

      {submitted && (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-white">Submission Preview</h2>
            <button
              type="button"
              onClick={copyPayload}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-200">{payload}</pre>
          <p className="text-xs text-slate-400">
            Copy this block and send it to trusted staff in Discord.
          </p>
        </section>
      )}
    </div>
  );
}
