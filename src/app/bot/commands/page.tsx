"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bot, 
  Terminal, 
  ShieldCheck, 
  Users, 
  Clock, 
  Code, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Search,
  Filter
} from "lucide-react";

interface BotCommand {
  name: string;
  slash: string;
  prefix: string;
  category: "LOA (Leave of Absence)" | "Staff Management" | "General";
  description: string;
  parameters?: { name: string; required: boolean; description: string }[];
  permission?: string;
  example: string;
}

const commandsData: BotCommand[] = [
  {
    name: "LOA Rules",
    slash: "/loa rules",
    prefix: "!loa rules  •  th loa rules",
    category: "LOA (Leave of Absence)",
    description: "Displays the server's staff Leave of Absence policy, requirements, and maximum inactive duration.",
    permission: "Staff Members",
    example: "/loa rules",
  },
  {
    name: "Set LOA Status",
    slash: "/loa status <status> <reason>",
    prefix: "!loa status <status> <reason>  •  th loa status ...",
    category: "LOA (Leave of Absence)",
    description: "Update your staff activity status to Active or Inactive with a mandatory reason for management tracking.",
    parameters: [
      { name: "status", required: true, description: "active | inactive" },
      { name: "reason", required: true, description: "Brief explanation (e.g. exams, family trip, vacation)" },
    ],
    permission: "Staff Members",
    example: "/loa status status:inactive reason:College exam week",
  },
  {
    name: "Check LOA",
    slash: "/loa check [user]",
    prefix: "!loa check [@user]  •  th loa check ...",
    category: "LOA (Leave of Absence)",
    description: "Inspect the current LOA status, reason, and date timestamp for yourself or another specified staff member.",
    parameters: [
      { name: "user", required: false, description: "Target Discord user (defaults to author if omitted)" },
    ],
    permission: "Staff Members",
    example: "/loa check user:@TheySix",
  },
  {
    name: "List Staffs",
    slash: "/staffs",
    prefix: "!staffs  •  th staffs",
    category: "Staff Management",
    description: "Lists all currently active staff members categorized cleanly by rank hierarchy from Manager to Helper.",
    permission: "Everyone / Staff",
    example: "/staffs",
  },
  {
    name: "Add Staff Member",
    slash: "/staff add <user> <role>",
    prefix: "!staff add <@user> <role>  •  th staff add ...",
    category: "Staff Management",
    description: "Assigns an official staff role and registers the user in the staff roster database.",
    parameters: [
      { name: "user", required: true, description: "Discord member to recruit" },
      { name: "role", required: true, description: "TheySix | Manager | Admin | Head Moderator | Moderator | Helper Team" },
    ],
    permission: "Manage Roles (Admins & Owners)",
    example: "/staff add user:@BuilderJoe role:Moderator",
  },
  {
    name: "Remove Staff Member",
    slash: "/staff remove <user>",
    prefix: "!staff remove <@user>  •  th staff remove ...",
    category: "Staff Management",
    description: "Removes staff permissions and role from the member and updates the database records.",
    parameters: [
      { name: "user", required: true, description: "Staff member to demote/remove" },
    ],
    permission: "Manage Roles (Admins & Owners)",
    example: "/staff remove user:@InactiveUser",
  },
  {
    name: "Upgrade Staff Member",
    slash: "/staff upgrade <user> <new_role>",
    prefix: "!staff upgrade <@user> <new_role>  •  th staff upgrade ...",
    category: "Staff Management",
    description: "Promotes or transfers an existing staff member to a higher staff tier.",
    parameters: [
      { name: "user", required: true, description: "Staff member to promote" },
      { name: "new_role", required: true, description: "New target staff rank" },
    ],
    permission: "Manage Roles (Admins & Owners)",
    example: "/staff upgrade user:@GoodMod new_role:Head Moderator",
  },
];

export default function BotCommandsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const categories = ["all", "LOA (Leave of Absence)", "Staff Management"];

  const filteredCommands = commandsData.filter((cmd) => {
    const matchesCategory = selectedCategory === "all" || cmd.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      cmd.name.toLowerCase().includes(q) ||
      cmd.slash.toLowerCase().includes(q) ||
      cmd.prefix.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase font-mono">
          <Bot className="w-3.5 h-3.5" /> TS-Bot Documentation
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Discord Bot <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">Commands</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Comprehensive list of all slash (<code className="text-cyan-300 font-mono">/</code>) and prefix (<code className="text-amber-300 font-mono">!</code> & <code className="text-amber-300 font-mono">th</code>) commands available in TS-Bot.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
          <Link
            href="/bot/about"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors"
          >
            About TS-Bot
          </Link>
          <a
            href="https://github.com/ro-mihaiu/ts-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-cyan-400" /> GitHub Repository
          </a>
          <Link
            href="/bot/tos"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors"
          >
            Bot Terms of Service
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bot commands (e.g. /loa status, !staff)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat === "all" ? "All Commands" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Commands List */}
      <div className="space-y-6">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd.name}
            className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-5 hover:border-slate-700 transition-all shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {cmd.category}
                  </span>
                  {cmd.permission && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
                      {cmd.permission}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white pt-1">
                  {cmd.name}
                </h3>
              </div>

              {/* Quick Copy Command */}
              <button
                onClick={() => handleCopy(cmd.slash)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-all self-start sm:self-auto"
                title="Copy slash command syntax"
              >
                {copiedCommand === cmd.slash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {cmd.description}
            </p>

            {/* Syntax Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase">
                  Slash Command Syntax
                </span>
                <p className="font-mono text-cyan-300 font-bold break-all">
                  {cmd.slash}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase">
                  Prefix Alternatives
                </span>
                <p className="font-mono text-amber-300 font-medium break-all">
                  {cmd.prefix}
                </p>
              </div>
            </div>

            {/* Parameters Table if present */}
            {cmd.parameters && cmd.parameters.length > 0 && (
              <div className="pt-2 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Parameters
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {cmd.parameters.map((param) => (
                    <div
                      key={param.name}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-850 flex items-start gap-2"
                    >
                      <code className="text-cyan-400 font-bold font-mono">
                        {param.name}
                      </code>
                      <span className="text-slate-500">
                        {param.required ? "(required)" : "(optional)"}:
                      </span>
                      <span className="text-slate-300 flex-1">
                        {param.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

