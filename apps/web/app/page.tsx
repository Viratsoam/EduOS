"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { OrganizationOnboardingStep } from "@eduos/types";
import { Badge, Button, MetricCard } from "@eduos/ui";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  KeyRound,
  Layers3,
  LibraryBig,
  MessageSquareText,
  Mic2,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UsersRound,
  Video,
} from "lucide-react";

type Workspace = "overview" | "onboarding" | "courses" | "ai" | "live" | "analytics";

const workspaces: Array<{ id: Workspace; icon: ReactNode; label: string }> = [
  { id: "overview", icon: <Activity size={16} aria-hidden />, label: "Overview" },
  { id: "onboarding", icon: <ClipboardCheck size={16} aria-hidden />, label: "Onboarding" },
  { id: "courses", icon: <BookOpen size={16} aria-hidden />, label: "Courses" },
  { id: "ai", icon: <BrainCircuit size={16} aria-hidden />, label: "AI Tutor" },
  { id: "live", icon: <Video size={16} aria-hidden />, label: "Live Class" },
  { id: "analytics", icon: <BarChart3 size={16} aria-hidden />, label: "Analytics" },
];

const metrics = [
  {
    detail: "6 batches active today",
    icon: <UsersRound size={20} aria-hidden />,
    label: "Learners",
    value: "1,248",
  },
  {
    detail: "18 lessons published this week",
    icon: <BookOpen size={20} aria-hidden />,
    label: "Lessons",
    value: "326",
  },
  {
    detail: "All answers grounded in approved content",
    icon: <BrainCircuit size={20} aria-hidden />,
    label: "AI Tutor Sessions",
    value: "4,912",
  },
  {
    detail: "Attendance, assignments, exams",
    icon: <BarChart3 size={20} aria-hidden />,
    label: "Learning Signal Health",
    value: "87%",
  },
];

const courses = [
  {
    aiStatus: "Indexed",
    batch: "JEE Alpha",
    completion: 74,
    lessons: 42,
    title: "Physics Foundations",
    tutorSessions: 1820,
  },
  {
    aiStatus: "Indexing",
    batch: "Grade 10 Core",
    completion: 61,
    lessons: 36,
    title: "Algebra Mastery",
    tutorSessions: 1214,
  },
  {
    aiStatus: "Needs material",
    batch: "NEET Bridge",
    completion: 48,
    lessons: 28,
    title: "Chemistry Essentials",
    tutorSessions: 864,
  },
];

const timeline = [
  {
    icon: <UploadCloud size={16} aria-hidden />,
    label: "Teacher uploaded notes",
    meta: "Electromagnetic Induction PDF, 38 pages",
    time: "08:10",
  },
  {
    icon: <BrainCircuit size={16} aria-hidden />,
    label: "AI knowledge base indexed",
    meta: "126 chunks, source citations ready",
    time: "08:19",
  },
  {
    icon: <FileCheck2 size={16} aria-hidden />,
    label: "Assignment review queued",
    meta: "42 submissions waiting for rubric pass",
    time: "10:45",
  },
];

const aiCitations = [
  "Physics Foundations > Lesson 12 > Page 7",
  "Teacher Notes > Faraday Law Examples",
  "Lecture Transcript > 00:18:42",
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
    title: "AI weak-area report",
    type: "Analytics",
  },
];

const skillData = [
  { label: "Vectors", value: 91 },
  { label: "Calculus", value: 76 },
  { label: "Magnetism", value: 63 },
  { label: "Algebra", value: 84 },
  { label: "Organic", value: 58 },
];

const launchReadiness = [
  { label: "Auth and onboarding", value: 86 },
  { label: "Course workflows", value: 68 },
  { label: "AI grounding", value: 74 },
  { label: "Analytics layer", value: 59 },
];

const classControls: Array<{ icon: ReactNode; label: string; meta: string }> = [
  { icon: <UsersRound size={16} aria-hidden />, label: "Attendance marked", meta: "36 / 38 present" },
  { icon: <BarChart3 size={16} aria-hidden />, label: "Poll running", meta: "Flux direction check" },
  { icon: <MessageSquareText size={16} aria-hidden />, label: "Questions raised", meta: "7 waiting" },
  { icon: <Mic2 size={16} aria-hidden />, label: "AI summary", meta: "Drafting live" },
];

const onboardingSteps: Array<{ id: OrganizationOnboardingStep; label: string; meta: string }> = [
  { id: "school_profile", label: "School profile", meta: "Brand, academic year, timezone" },
  { id: "admin_team", label: "Admin team", meta: "Owner and coordinator accounts" },
  { id: "role_mapping", label: "Role mapping", meta: "Admins, teachers, assistants, students" },
  { id: "course_seed", label: "Course seed", meta: "Initial batches and subjects" },
  { id: "ai_policy", label: "AI policy", meta: "Grounding, refusal, citation settings" },
  { id: "launch_review", label: "Launch review", meta: "Final readiness check" },
];

const roleAssignments = [
  { count: 2, label: "Admins" },
  { count: 18, label: "Teachers" },
  { count: 6, label: "Assistants" },
  { count: 1248, label: "Students" },
];

export default function HomePage() {
  const [workspace, setWorkspace] = useState<Workspace>("overview");
  const [signedIn, setSignedIn] = useState(false);
  const [aiPolicyReady, setAiPolicyReady] = useState(false);
  const currentWorkspaceLabel = useMemo(
    () => workspaces.find((item) => item.id === workspace)?.label ?? "Overview",
    [workspace],
  );
  const completedOnboardingSteps = useMemo<OrganizationOnboardingStep[]>(
    () =>
      aiPolicyReady
        ? ["school_profile", "admin_team", "role_mapping", "course_seed", "ai_policy"]
        : ["school_profile", "admin_team", "role_mapping", "course_seed"],
    [aiPolicyReady],
  );
  const onboardingProgress = aiPolicyReady ? 86 : 72;

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[272px_1fr]">
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
                <p className="text-xs text-zinc-500">Vikas International Academy</p>
              </div>
            </div>

            <nav className="mt-8 grid gap-1">
              {workspaces.map((item) => {
                const isActive = item.id === workspace;

                return (
                  <button
                    className={[
                      "flex h-10 items-center justify-between rounded-md px-3 text-left text-sm font-medium transition",
                      isActive
                        ? "bg-zinc-950 text-white"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                    ].join(" ")}
                    key={item.id}
                    onClick={() => setWorkspace(item.id)}
                    type="button"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </span>
                    {isActive ? <ChevronRight size={16} aria-hidden /> : null}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 rounded-md border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-900">
                <ShieldCheck size={16} aria-hidden />
                Tenant boundary
              </div>
              <div className="mt-3 grid gap-2 text-xs text-zinc-600">
                <p>Organization: VIA</p>
                <p>Data scope: Courses, batches, AI sources</p>
                <p>Policy: Permission-first access</p>
              </div>
            </div>

            <div className="mt-auto rounded-md border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-sm font-medium text-emerald-800">Demo status</p>
              <div className="mt-3 space-y-2">
                {["Web app", "Backend API", "AI worker"].map((item) => (
                  <div className="flex items-center justify-between text-xs" key={item}>
                    <span className="text-emerald-800">{item}</span>
                    <CheckCircle2 size={14} className="text-emerald-600" aria-hidden />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="border-b border-zinc-200 bg-white px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="green">Product demo</Badge>
                  <Badge tone="blue">AI grounded</Badge>
                  <Badge>Multi-tenant SaaS</Badge>
                </div>
                <h1 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
                  {currentWorkspaceLabel}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button icon={<Search size={16} aria-hidden />} variant="secondary">
                  Search
                </Button>
                <Button
                  icon={<Bell size={16} aria-hidden />}
                  variant="ghost"
                  aria-label="Notifications"
                />
                <Button icon={<Sparkles size={16} aria-hidden />} onClick={() => setWorkspace("ai")}>
                  Ask AI
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 p-4 sm:p-6 xl:grid-cols-[1fr_360px]">
            <div className="min-w-0 space-y-6">
              {workspace === "overview" ? <OverviewPanel /> : null}
              {workspace === "onboarding" ? (
                <OnboardingPanel
                  completedSteps={completedOnboardingSteps}
                  onCompletePolicy={() => setAiPolicyReady(true)}
                  onSignIn={() => setSignedIn(true)}
                  progress={onboardingProgress}
                  signedIn={signedIn}
                />
              ) : null}
              {workspace === "courses" ? <CoursesPanel /> : null}
              {workspace === "ai" ? <AiPanel /> : null}
              {workspace === "live" ? <LivePanel /> : null}
              {workspace === "analytics" ? <AnalyticsPanel /> : null}
            </div>

            <DemoRail completedSteps={completedOnboardingSteps.length} progress={onboardingProgress} />
          </div>
        </section>
      </div>
    </main>
  );
}

function OverviewPanel() {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <div>
              <h2 className="text-base font-semibold">Institution operating layer</h2>
              <p className="mt-1 text-sm text-zinc-500">Live signals from learning, content, AI, and operations.</p>
            </div>
            <Badge tone="green">Healthy</Badge>
          </div>

          <div className="mt-4 grid gap-3">
            {timeline.map((item) => (
              <div className="grid grid-cols-[56px_1fr] gap-3 rounded-md border border-zinc-200 p-3" key={item.label}>
                <div className="text-sm font-semibold text-zinc-900">{item.time}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-zinc-100 p-1 text-zinc-700">{item.icon}</span>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Launch readiness</h2>
            <Layers3 size={18} className="text-zinc-500" aria-hidden />
          </div>
          <div className="mt-5 space-y-4">
            {launchReadiness.map((item) => (
              <ProgressRow key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function OnboardingPanel({
  completedSteps,
  onCompletePolicy,
  onSignIn,
  progress,
  signedIn,
}: {
  completedSteps: OrganizationOnboardingStep[];
  onCompletePolicy: () => void;
  onSignIn: () => void;
  progress: number;
  signedIn: boolean;
}) {
  return (
    <section className="grid min-w-0 gap-6 2xl:grid-cols-[0.95fr_1.05fr]">
      <div className="min-w-0 rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h2 className="text-base font-semibold">Organization setup</h2>
            <p className="mt-1 text-sm text-zinc-500">Vikas International Academy is preparing its first EduOS launch.</p>
          </div>
          <Badge className="shrink-0" tone={signedIn ? "green" : "red"}>
            {signedIn ? "Session active" : "Sign-in needed"}
          </Badge>
        </div>

        <div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-2 2xl:grid-cols-1 min-[1680px]:grid-cols-2">
          <div className="min-w-0 rounded-md border border-zinc-200 p-4">
            <div className="flex items-center gap-2">
              <KeyRound size={17} className="text-zinc-600" aria-hidden />
              <h3 className="text-sm font-semibold">Admin sign-in</h3>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <FieldPreview label="Email" value="admin@via.edu" />
              <FieldPreview label="School slug" value="via" />
              <FieldPreview label="Role" value="Organization owner" />
            </div>
            <Button
              className="mt-4 w-full"
              disabled={signedIn}
              icon={<ShieldCheck size={16} aria-hidden />}
              onClick={onSignIn}
            >
              {signedIn ? "Signed in" : "Start session"}
            </Button>
          </div>

          <div className="min-w-0 rounded-md border border-zinc-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">School profile</h3>
              <Badge tone="blue">Growth plan</Badge>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <FieldPreview label="Academic year" value="2026-2027" />
              <FieldPreview label="Timezone" value="Asia/Kolkata" />
              <FieldPreview label="Contact" value="admin@via.edu" />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-md bg-zinc-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold">Launch progress</h3>
            <span className="text-sm text-zinc-500">{progress}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
            {roleAssignments.map((assignment) => (
              <div className="rounded border border-zinc-200 bg-white p-3" key={assignment.label}>
                <p className="text-xs text-zinc-500">{assignment.label}</p>
                <p className="mt-1 text-lg font-semibold">{assignment.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Onboarding checklist</h2>
          <Badge tone={progress > 80 ? "green" : "blue"}>{progress > 80 ? "Launch review" : "In progress"}</Badge>
        </div>
        <div className="mt-4 grid gap-3">
          {onboardingSteps.map((step, index) => {
            const isComplete = completedSteps.includes(step.id);
            const isNext = !isComplete && step.id === (progress > 80 ? "launch_review" : "ai_policy");

            return (
              <div
                className={[
                  "grid grid-cols-[32px_1fr] gap-3 rounded-md border p-3",
                  isComplete ? "border-emerald-200 bg-emerald-50" : "border-zinc-200",
                ].join(" ")}
                key={step.id}
              >
                <span
                  className={[
                    "grid h-8 w-8 place-items-center rounded text-xs font-semibold",
                    isComplete ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-600",
                  ].join(" ")}
                >
                  {isComplete ? <CheckCircle2 size={16} aria-hidden /> : index + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{step.label}</p>
                    {isNext ? <Badge tone="blue">Next</Badge> : null}
                  </div>
                  <p className="mt-1 text-sm text-zinc-500">{step.meta}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="mt-4 w-full"
          disabled={completedSteps.includes("ai_policy")}
          icon={<Sparkles size={16} aria-hidden />}
          onClick={onCompletePolicy}
        >
          {completedSteps.includes("ai_policy") ? "AI policy ready" : "Approve AI policy"}
        </Button>
      </div>
    </section>
  );
}

function CoursesPanel() {
  return (
    <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold">Course operations</h2>
          <p className="mt-1 text-sm text-zinc-500">Courses connect lessons, batches, assignments, and approved AI sources.</p>
        </div>
        <Button icon={<UploadCloud size={16} aria-hidden />} variant="secondary">
          Upload material
        </Button>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        {courses.map((course) => (
          <article className="rounded-md border border-zinc-200 p-4" key={course.title}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">{course.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{course.batch}</p>
              </div>
              <Badge tone={course.aiStatus === "Indexed" ? "green" : course.aiStatus === "Indexing" ? "blue" : "red"}>
                {course.aiStatus}
              </Badge>
            </div>
            <div className="mt-5 space-y-3">
              <ProgressRow label="Completion" value={course.completion} />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded bg-zinc-50 p-3">
                  <p className="text-zinc-500">Lessons</p>
                  <p className="mt-1 font-semibold">{course.lessons}</p>
                </div>
                <div className="rounded bg-zinc-50 p-3">
                  <p className="text-zinc-500">AI sessions</p>
                  <p className="mt-1 font-semibold">{course.tutorSessions}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiPanel() {
  return (
    <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">AI Tutor session</h2>
          <Badge tone="green">Grounded</Badge>
        </div>
        <div className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-medium text-zinc-700">Student asks</p>
          <p className="mt-2 text-sm leading-6 text-zinc-900">
            Why does induced current oppose the change in magnetic flux?
          </p>
        </div>
        <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">EduOS AI Tutor</p>
          <p className="mt-2 text-sm leading-6 text-emerald-950">
            Lenz&apos;s law says the induced current flows in a direction that creates a magnetic field opposing the flux change. This keeps energy conserved: work must be done to change the flux, and that work appears as electrical energy.
          </p>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Citations</p>
          <div className="mt-2 grid gap-2">
            {aiCitations.map((citation) => (
              <div className="flex items-center gap-2 rounded border border-zinc-200 px-3 py-2 text-sm" key={citation}>
                <LibraryBig size={15} className="text-zinc-500" aria-hidden />
                <span>{citation}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold">AI pipeline</h2>
        <div className="mt-4 grid gap-3">
          {["Permission check", "Prompt builder", "Hybrid retrieval", "Chunk ranking", "Model routing", "Response validation"].map((step, index) => (
            <div className="flex items-center gap-3 rounded-md border border-zinc-200 p-3" key={step}>
              <span className="flex h-7 w-7 items-center justify-center rounded bg-zinc-950 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span className="text-sm font-medium">{step}</span>
              <CheckCircle2 size={16} className="ml-auto text-emerald-600" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LivePanel() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
          <div>
            <h2 className="text-base font-semibold">Physics live class</h2>
            <p className="text-sm text-zinc-500">Electromagnetic Induction</p>
          </div>
          <Badge tone="red">Live</Badge>
        </div>
        <div className="grid min-h-[360px] place-items-center bg-zinc-950 p-6 text-white">
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/10">
              <Play size={30} aria-hidden />
            </div>
            <p className="mt-4 text-lg font-semibold">Teacher screen share</p>
            <p className="mt-2 text-sm text-zinc-300">38 students watching • recording active • AI summary enabled</p>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold">Class controls</h2>
        <div className="mt-4 grid gap-3">
          {classControls.map((item) => (
            <div className="flex items-center gap-3 rounded-md border border-zinc-200 p-3" key={item.label}>
              <span className="rounded bg-zinc-100 p-2 text-zinc-700">{item.icon}</span>
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-sm text-zinc-500">{item.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnalyticsPanel() {
  return (
    <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold">Learning analytics</h2>
          <p className="mt-1 text-sm text-zinc-500">Weakness detection from attendance, assignments, exams, and AI sessions.</p>
        </div>
        <Badge tone="blue">Updated 12 min ago</Badge>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {skillData.map((skill) => (
            <ProgressRow key={skill.label} label={skill.label} value={skill.value} />
          ))}
        </div>
        <div className="rounded-md bg-zinc-50 p-4">
          <h3 className="text-sm font-semibold">Recommended intervention</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Create a 20-minute revision set for Organic Chemistry and Magnetism, then schedule an AI-assisted doubt session before Friday&apos;s quiz.
          </p>
        </div>
      </div>
    </section>
  );
}

function DemoRail({ completedSteps, progress }: { completedSteps: number; progress: number }) {
  return (
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
          <Clock3 size={18} className="text-zinc-500" aria-hidden />
          <h2 className="text-base font-semibold">Implementation map</h2>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          {["Next.js demo shell", "NestJS API scaffold", "Auth and onboarding", "AI worker queue", "Shared SDK and types"].map((item) => (
            <div className="flex items-center justify-between" key={item}>
              <span className="text-zinc-600">{item}</span>
              <CheckCircle2 size={16} className="text-emerald-600" aria-hidden />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <GraduationCap size={18} className="text-zinc-500" aria-hidden />
          <h2 className="text-base font-semibold">Current product slice</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Organization onboarding is {progress}% ready with {completedSteps} setup steps complete. Persisted course creation comes next.
        </p>
      </section>
    </aside>
  );
}

function FieldPreview({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 gap-1 rounded bg-zinc-50 px-3 py-2 sm:grid-cols-[minmax(92px,0.45fr)_minmax(0,1fr)] sm:items-center">
      <span className="text-zinc-500">{label}</span>
      <span className="min-w-0 break-words font-medium text-zinc-900 sm:text-right">{value}</span>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-zinc-700">{label}</span>
        <span className="text-zinc-500">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
