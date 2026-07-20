import { Badge, Button, MetricCard } from "@eduos/ui";
import {
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  FileCheck2,
  GraduationCap,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const navItems = [
  "Dashboard",
  "Courses",
  "Live Classes",
  "Assignments",
  "AI Tutor",
  "Analytics",
  "Settings",
];

const metrics = [
  {
    detail: "Across 6 active batches",
    icon: <UsersRound size={20} aria-hidden />,
    label: "Learners",
    value: "1,248",
  },
  {
    detail: "18 published this week",
    icon: <BookOpen size={20} aria-hidden />,
    label: "Lessons",
    value: "326",
  },
  {
    detail: "Approved-content only",
    icon: <BrainCircuit size={20} aria-hidden />,
    label: "AI Tutor Sessions",
    value: "4,912",
  },
  {
    detail: "For attendance and progress",
    icon: <BarChart3 size={20} aria-hidden />,
    label: "Signals Tracked",
    value: "87%",
  },
];

const upcoming = [
  {
    time: "09:30",
    title: "Physics: Electromagnetic Induction",
    type: "Live class",
  },
  {
    time: "11:00",
    title: "Algebra assignment review",
    type: "Teacher workflow",
  },
  {
    time: "14:15",
    title: "AI-generated weak-area report",
    type: "Analytics",
  },
];

const modules = [
  "Authentication",
  "Organizations",
  "RBAC",
  "Courses",
  "Lessons",
  "Assignments",
  "Exams",
  "Chat",
  "AI",
  "Analytics",
  "Payments",
  "Media",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-zinc-200 bg-white lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col px-4 py-5">
            <div className="flex items-center gap-3">
              <img
                alt="EduOS mark"
                className="h-10 w-10 rounded-md border border-zinc-200 object-cover"
                src="https://github.com/user-attachments/assets/afc41c00-2300-42b0-b6b7-9976125360a2"
              />
              <div>
                <p className="text-sm font-semibold">EduOS</p>
                <p className="text-xs text-zinc-500">Education OS</p>
              </div>
            </div>

            <nav className="mt-8 grid gap-1">
              {navItems.map((item) => (
                <a
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
                  href="#"
                  key={item}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="mt-auto rounded-md border border-emerald-200 bg-emerald-50 p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                <ShieldCheck size={16} aria-hidden />
                Tenant isolation active
              </div>
              <p className="mt-2 text-xs leading-5 text-emerald-700">
                Every workflow is designed around organization boundaries and permission checks.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="border-b border-zinc-200 bg-white px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="green">Phase 1 Foundation</Badge>
                  <Badge tone="blue">AI-first</Badge>
                  <Badge>Multi-tenant</Badge>
                </div>
                <h1 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
                  Institution command center
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <Button icon={<Search size={16} aria-hidden />} variant="secondary">
                  Search
                </Button>
                <Button icon={<Bell size={16} aria-hidden />} variant="ghost" aria-label="Notifications" />
                <Button icon={<Sparkles size={16} aria-hidden />}>AI Tutor</Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 p-4 sm:p-6 xl:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </section>

              <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-base font-semibold">Phase 1 modules</h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      The first build layer connects product areas to shared contracts.
                    </p>
                  </div>
                  <Button icon={<FileCheck2 size={16} aria-hidden />} variant="secondary">
                    View architecture
                  </Button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {modules.map((module) => (
                    <div
                      className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-3"
                      key={module}
                    >
                      <span className="text-sm font-medium">{module}</span>
                      <Badge tone={module === "AI" || module === "RBAC" ? "green" : "neutral"}>
                        planned
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Today</h2>
                  <CalendarDays size={18} className="text-zinc-500" aria-hidden />
                </div>
                <div className="mt-4 space-y-3">
                  {upcoming.map((item) => (
                    <div className="rounded-md border border-zinc-200 p-3" key={item.title}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold">{item.time}</p>
                        <Badge tone="blue">{item.type}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-zinc-600">{item.title}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <MessageSquareText size={18} className="text-zinc-500" aria-hidden />
                  <h2 className="text-base font-semibold">AI grounding</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Learner answers are designed to flow through prompt builder, retrieval, hybrid
                  search, chunk ranking, model routing, and response validation.
                </p>
              </section>

              <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} className="text-zinc-500" aria-hidden />
                  <h2 className="text-base font-semibold">Next build target</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Authentication, tenant context, and permission guards should land before course
                  management so every feature starts with the right safety rails.
                </p>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
