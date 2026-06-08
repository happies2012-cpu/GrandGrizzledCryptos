export interface Template {
  tag: string
  tagColor: string
  tagText: string
  name: string
  desc: string
  code: string
}

export type TemplateCategory =
  | 'initial' | 'features' | 'auth' | 'ui' | 'backend' | 'debug' | 'deploy' | 'quick'

export const TEMPLATE_CATEGORIES: { key: TemplateCategory; label: string }[] = [
  { key: 'initial',   label: 'Initial Build' },
  { key: 'features',  label: 'Features' },
  { key: 'auth',      label: 'Auth & Security' },
  { key: 'ui',        label: 'UI/UX' },
  { key: 'backend',   label: 'Backend' },
  { key: 'debug',     label: 'Debug & Fix' },
  { key: 'deploy',    label: 'Deploy' },
  { key: 'quick',     label: 'Quick Ops' },
]

export const TEMPLATES: Record<TemplateCategory, Template[]> = {
  initial: [
    {
      tag: 'Foundation', tagColor: 'rgba(99,102,241,0.15)', tagText: '#818cf8',
      name: 'System Initialization Sequence',
      desc: 'Complete app generation prompt — system architecture initialized',
      code: `SYSTEM INITIALIZED — BUILD SEQUENCE ACTIVE

Target: [APP_DESIGNATION]
Stack:
  Frontend : React 18 + TypeScript + Tailwind CSS
  Backend  : Node.js 20 + Express + PostgreSQL
  Auth     : JWT + Refresh Tokens + RBAC
  State    : Redux Toolkit + RTK Query
  Forms    : React Hook Form + Zod
  Motion   : Framer Motion

Directives:
1. [Feature Node Alpha — specify]
2. [Feature Node Beta  — specify]
3. [Feature Node Gamma — specify]

Design Protocol:
- Glassmorphism: backdrop-filter blur(16px)
- Dual Theme: Dark + Light, persisted localStorage
- Responsive: 320px → 768px → 1280px
- Accessibility: WCAG 2.1 AA
- Performance: Lighthouse > 90

EXECUTE IMMEDIATELY. NO CONFIRMATION REQUIRED.`
    },
    {
      tag: 'Architecture', tagColor: 'rgba(139,92,246,0.15)', tagText: '#a78bfa',
      name: 'Neural Architecture Blueprint',
      desc: 'Define full technical stack and code standards',
      code: `ARCHITECTURE BLUEPRINT LOADED

Tech Matrix:
  Frontend  → React 18 + TypeScript + Tailwind v3
  Backend   → Node.js 20 / FastAPI (Python)
  Database  → PostgreSQL + Prisma ORM
  Auth      → JWT (15m) + Refresh (7d httpOnly)
  Cache     → Redis (sessions + rate limiting)
  Queue     → Bull MQ (background jobs)
  Storage   → S3-compatible (file uploads)
  Realtime  → WebSocket (Socket.io)

Standards Protocol:
  - Zero any[] TypeScript types
  - Async/await throughout — no callbacks
  - Zod validation on all inputs
  - Parameterized queries — no SQL injection
  - Environment vars — no hardcoded secrets
  - Error boundaries on all React trees
  - Skeleton loaders on all async components

COMPILE AND DEPLOY.`
    },
    {
      tag: 'Design System', tagColor: 'rgba(16,185,129,0.15)', tagText: '#34d399',
      name: 'Visual System Parameters',
      desc: 'Complete design specification protocol',
      code: `DESIGN SYSTEM PARAMETERS LOADED

Glassmorphism Protocol:
  backdrop-filter  : blur(16px)
  Dark  background : rgba(255,255,255,0.04)
  Light background : rgba(255,255,255,0.60)
  Border dark      : rgba(255,255,255,0.08)
  Border light     : rgba(0,0,0,0.07)
  Radius           : 20px cards / 12px inputs / 999px pills
  Shadow dark      : 0 8px 32px rgba(0,0,0,0.4)
  Shadow light     : 0 8px 32px rgba(0,0,0,0.08)

Color Matrix:
  Primary   : #6366f1  (Indigo)
  Secondary : #8b5cf6  (Violet)
  Accent    : #06b6d4  (Cyan)
  Success   : #10b981  (Emerald)
  Warning   : #f59e0b  (Amber)
  Danger    : #ef4444  (Red)

Typography:
  UI    : Inter (300–900)
  Code  : JetBrains Mono (400,700)
  Scale : 12/14/16/18/20/24/32/48/64px

Motion: 0.2s hover / 0.3s theme / Framer entrance`
    },
  ],
  features: [
    {
      tag: 'Feature', tagColor: 'rgba(245,158,11,0.15)', tagText: '#fbbf24',
      name: 'Feature Injection Protocol',
      desc: 'Inject a new feature module into existing system',
      code: `FEATURE INJECTION INITIATED

Module: [FEATURE_DESIGNATION]
Function: Enable users to [SPECIFIC_OPERATION]

Requirements:
  □ [Requirement Alpha]
  □ [Requirement Beta]
  □ Integration node: existing [component/API]
  □ Data persistence: [table/collection]
  □ Input validation: [field specifications]
  □ Loading state: skeleton UI
  □ Error state: toast + fallback UI
  □ Mobile responsive: 100%
  □ Accessibility: ARIA compliant

EXECUTE. INTEGRATE. VERIFY.`
    },
    {
      tag: 'Realtime', tagColor: 'rgba(6,182,212,0.15)', tagText: '#22d3ee',
      name: 'Neural Link — Realtime System',
      desc: 'WebSocket-powered real-time data synchronization',
      code: `NEURAL LINK PROTOCOL ACTIVATED

Realtime Features Required:
  ✦ Live data sync for [entity type]
  ✦ Online/offline presence indicators
  ✦ Multi-tab state synchronization
  ✦ Auto-reconnect on connection loss (exp backoff)
  ✦ Typing indicators in [chat/comments]
  ✦ Optimistic UI updates (pre-confirm server)
  ✦ Unread badge count (real-time increment)
  ✦ Toast alerts on live system events

Stack: Socket.io (server) + socket.io-client (React)
Fallback: Long polling if WebSocket unavailable
Auth: JWT handshake on connection

LINK ESTABLISHED. SYNCHRONIZING.`
    },
    {
      tag: 'Analytics', tagColor: 'rgba(236,72,153,0.15)', tagText: '#f472b6',
      name: 'Analytics Intelligence Core',
      desc: 'Data visualization and metrics dashboard',
      code: `ANALYTICS MODULE ONLINE

Visualization Matrix:
  ✦ KPI Cards with delta indicators (↑/↓ % vs prior period)
  ✦ Time-series chart: [metric] (day/week/month toggle)
  ✦ Bar chart: [metric] segmented by [dimension]
  ✦ Donut chart: [distribution breakdown]
  ✦ Data grid: sortable, filterable, exportable
  ✦ Date range selector (preset + custom)
  ✦ Period comparison mode

Library: Recharts (lightweight, TypeScript-native)
Data: RTK Query with 5-min cache + manual refetch
Export: CSV (Papa Parse) + PDF (jsPDF)
All charts: responsive, accessible, dark/light aware

PROCESSING DATA MATRIX...`
    },
  ],
  auth: [
    {
      tag: 'Security', tagColor: 'rgba(239,68,68,0.15)', tagText: '#f87171',
      name: 'Authentication Sequence',
      desc: 'Full JWT auth system with security hardening',
      code: `AUTHENTICATION PROTOCOL ENGAGED

Access Control Matrix:
  Roles   : Admin → Manager → User (hierarchical)
  Tokens  : Access (15min JWT) + Refresh (7d httpOnly)
  Storage : Access in memory / Refresh in httpOnly cookie

Pages Required:
  ✦ /login          — email + password + "remember device"
  ✦ /signup         — name + email + password + verify
  ✦ /verify-email   — token from email link
  ✦ /forgot         — email input → send reset link
  ✦ /reset-password — token + new password + confirm

Security Hardening:
  ✦ Bcrypt rounds: 12
  ✦ Rate limit: 5 attempts / 15min / IP (Redis)
  ✦ Brute force lock: 1hr after 10 failures
  ✦ CSRF token on state-changing requests
  ✦ Logout all devices endpoint
  ✦ Activity log (IP, device, timestamp)

IDENTITY VERIFIED. ACCESS GRANTED.`
    },
    {
      tag: 'RBAC', tagColor: 'rgba(99,102,241,0.15)', tagText: '#818cf8',
      name: 'Permission Grid System',
      desc: 'Role-based access control with granular permissions',
      code: `PERMISSION MATRIX INITIALIZED

Role Hierarchy:
  ADMIN   → Full system sovereignty
  MANAGER → Create, read, update (no delete, no admin)
  USER    → Own data only (read + update self)

Implementation Protocol:
  DB:       roles, permissions, role_permissions tables
  Middleware: requireRole('admin') | requirePermission('entity:action')
  Hook:     usePermission('users:write') → boolean
  UI:       Hide/disable elements without permission
  Route:    <ProtectedRoute role="manager" />
  API:      403 JSON response with clear message

Permission Naming:
  users:[read|write|delete]
  reports:[read|export]
  billing:[read|write]
  [entity]:[action]

ACCESS LEVEL DETERMINED. MATRIX LOCKED.`
    },
  ],
  ui: [
    {
      tag: 'UI/UX', tagColor: 'rgba(139,92,246,0.15)', tagText: '#a78bfa',
      name: 'Glassmorphism Render Protocol',
      desc: 'Apply premium glassmorphism to any component',
      code: `GLASSMORPHISM RENDER SEQUENCE

Target Component: [COMPONENT_IDENTIFIER]

Visual Parameters:
  backdrop-filter  : blur(16px)
  background dark  : rgba(255,255,255,0.04)
  background light : rgba(255,255,255,0.60)
  border           : 1px solid rgba(255,255,255,0.08)
  border-radius    : 20px
  box-shadow       : 0 8px 32px rgba(0,0,0,0.4),
                     inset 0 1px 0 rgba(255,255,255,0.08)

Motion Sequence:
  Hover   → translateY(-4px) + shadow intensify
  Press   → scale(0.98)
  Enter   → opacity(0) + translateY(20px) → normal (0.4s)
  Stagger → 0.05s delay per list item
  Shimmer → skeleton loading animation

RENDERING COMPLETE. VISUAL INTEGRITY CONFIRMED.`
    },
    {
      tag: 'Theme', tagColor: 'rgba(16,185,129,0.15)', tagText: '#34d399',
      name: 'Dual Theme System Protocol',
      desc: 'Dark/light mode with system detection and persistence',
      code: `DUAL THEME MATRIX ACTIVE

Implementation:
  Strategy : data-theme attribute on <html>
  Detection : window.matchMedia('prefers-color-scheme')
  Storage   : localStorage key 'theme'
  Toggle    : Framer Motion animated switch

CSS Architecture:
  :root[data-theme="dark"]  { /* dark vars */ }
  :root[data-theme="light"] { /* light vars */ }

  All colors via CSS custom properties:
  var(--bg-base), var(--text-primary),
  var(--bg-glass), var(--border), var(--accent)

Rules:
  ✦ ZERO hardcoded colors in components
  ✦ ALL components use CSS variables only
  ✦ Transition: all CSS vars 0.35s ease
  ✦ Glassmorphism adapts automatically
  ✦ Test EVERY page in BOTH modes

THEME ENGINE ONLINE. BOTH MODES VERIFIED.`
    },
    {
      tag: 'Motion', tagColor: 'rgba(245,158,11,0.15)', tagText: '#fbbf24',
      name: 'Animation Framework Protocol',
      desc: 'Framer Motion animation system for the entire app',
      code: `MOTION FRAMEWORK INITIALIZED

Entrance Animations (Framer Motion):
  Page:      opacity 0→1, y 20→0, duration 0.4s
  Cards:     stagger 0.05s delay, y 30→0
  Hero:      sequential: badge → h1 → p → CTA
  Lists:     stagger children with container variants

Interaction Animations:
  Button hover : scale(1.02) + box-shadow glow
  Card hover   : translateY(-4px) + border brighten
  Link hover   : color transition + underline scale
  Toggle       : spring physics (stiffness:300, damping:25)

Background Orbs (AnimatedBackground):
  3–5 orbs with different sizes (400–700px)
  Animate: y oscillation (-30 to +30px), scale (1 to 1.05)
  Duration: 6s–12s per orb (staggered)
  Filter: blur(80px), opacity 0.25–0.4

MOTION SYSTEMS ONLINE. ALL NODES ACTIVE.`
    },
  ],
  backend: [
    {
      tag: 'API', tagColor: 'rgba(6,182,212,0.15)', tagText: '#22d3ee',
      name: 'API Construction Protocol',
      desc: 'RESTful API endpoint design with full validation',
      code: `API CONSTRUCTION SEQUENCE

Resource: /api/v1/[entity]
Auth: Bearer JWT required (except GET public routes)

Endpoint Matrix:
  GET    /api/v1/[entity]        → List (page, limit, sort, filter)
  GET    /api/v1/[entity]/:id    → Retrieve single entity
  POST   /api/v1/[entity]        → Create (validate body)
  PUT    /api/v1/[entity]/:id    → Full update (auth check)
  PATCH  /api/v1/[entity]/:id    → Partial update
  DELETE /api/v1/[entity]/:id    → Soft delete (deleted_at)

Response Protocol:
  200 OK        → { data, meta: { page, total } }
  201 Created   → { data, message }
  400 Bad Req   → { error, details: ZodError[] }
  401 Unauth    → { error: 'AUTHENTICATION_REQUIRED' }
  403 Forbidden → { error: 'INSUFFICIENT_PERMISSIONS' }
  404 Not Found → { error: 'ENTITY_NOT_FOUND' }
  429 Rate Lim  → { error: 'RATE_LIMIT_EXCEEDED', retryAfter }
  500 Error     → { error: 'INTERNAL_SYSTEM_FAILURE' }

ENDPOINTS COMPILED. API MATRIX ACTIVE.`
    },
    {
      tag: 'Database', tagColor: 'rgba(245,158,11,0.15)', tagText: '#fbbf24',
      name: 'Schema Architecture',
      desc: 'PostgreSQL schema with proper indexing',
      code: `DATABASE SCHEMA PROTOCOL

CREATE TABLE [entity_name] (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  status      VARCHAR(50) NOT NULL DEFAULT 'active'
                CHECK (status IN ('active','inactive','archived')),
  metadata    JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at  TIMESTAMPTZ
);

-- Performance Indexes
CREATE INDEX idx_[entity]_user_id    ON [entity](user_id);
CREATE INDEX idx_[entity]_status     ON [entity](status) WHERE deleted_at IS NULL;
CREATE INDEX idx_[entity]_created_at ON [entity](created_at DESC);
CREATE INDEX idx_[entity]_search     ON [entity] USING GIN(to_tsvector('english', name));

-- Auto-update trigger
CREATE TRIGGER set_updated_at BEFORE UPDATE ON [entity]
  FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

SCHEMA COMPILED. DATABASE READY.`
    },
  ],
  debug: [
    {
      tag: 'Debug', tagColor: 'rgba(239,68,68,0.15)', tagText: '#f87171',
      name: 'Anomaly Detection Protocol',
      desc: 'Structured bug report for precise diagnosis',
      code: `ANOMALY DETECTED — DIAGNOSIS INITIATED

Affected System: [COMPONENT/FEATURE IDENTIFIER]

Malfunction Report:
  Observed  : [What the system is doing]
  Expected  : [What it should do]
  Frequency : [Always / Intermittent / On specific input]

Reproduction Sequence:
  Step 1 → [Action]
  Step 2 → [Action]
  Step 3 → [Anomaly manifests]

Error Output:
  [PASTE EXACT ERROR MESSAGE / STACK TRACE HERE]

Environment:
  Browser : [Chrome 125 / Firefox / Safari]
  OS      : [Platform]
  Node    : [version if backend]

Requested Actions:
  ✦ Identify root cause
  ✦ Patch anomaly
  ✦ Explain cause
  ✦ Add guard to prevent recurrence

DIAGNOSIS COMPLETE. PATCH REQUESTED.`
    },
    {
      tag: 'Review', tagColor: 'rgba(99,102,241,0.15)', tagText: '#818cf8',
      name: 'System Integrity Scan',
      desc: 'Comprehensive code review and optimization request',
      code: `INTEGRITY SCAN INITIATED

Target: [COMPONENT/MODULE IDENTIFIER]

Scan Parameters:
  □ TypeScript: eliminate any[], add proper types
  □ Performance: remove unnecessary re-renders (React.memo, useMemo, useCallback)
  □ Security: XSS vectors, injection points, exposed secrets
  □ Accessibility: ARIA labels, keyboard nav, focus management
  □ Error handling: all async paths covered, user-facing messages
  □ Loading states: every data fetch has skeleton
  □ Empty states: helpful CTAs when no data
  □ Mobile: tap targets ≥ 44px, scroll behavior
  □ Bundle: remove unused imports and dead code
  □ API calls: deduplicated, properly cached

Output Format:
  Provide specific code changes with line references.
  Explain each issue and the fix applied.

SCAN COMPLETE. REPORT FOLLOWS.`
    },
  ],
  deploy: [
    {
      tag: 'DevOps', tagColor: 'rgba(16,185,129,0.15)', tagText: '#34d399',
      name: 'Deployment Sequence Alpha',
      desc: 'Full production deployment configuration',
      code: `DEPLOYMENT SEQUENCE INITIATED

Environment Matrix:
  .env.development  → local dev (no real keys)
  .env.staging      → staging server
  .env.production   → production (secrets manager)

Required Secrets:
  DATABASE_URL      — PostgreSQL connection string
  JWT_SECRET        — 64-char random string
  JWT_REFRESH_SEC   — 7-day refresh secret
  REDIS_URL         — Redis connection string
  CORS_ORIGIN       — allowed frontend origins
  SMTP_*            — email service credentials
  STORAGE_*         — S3/R2 bucket config

Frontend → Vercel:
  Build : npm run build
  Output: dist/
  Env   : VITE_API_URL = https://api.yourdomain.com
  Headers: vercel.json → cache-control, security

Backend → Railway/Render:
  Start   : node dist/index.js
  Health  : GET /health → 200 { status: 'nominal' }
  Migrate : npm run db:migrate (on deploy hook)
  Monitor : Sentry DSN injected via env

CI/CD → GitHub Actions:
  On push main → lint → test → build → deploy

DEPLOYMENT SEQUENCE COMPLETE. SYSTEM LIVE.`
    },
  ],
  quick: [
    {
      tag: 'Quick', tagColor: 'rgba(245,158,11,0.15)', tagText: '#fbbf24',
      name: 'Rapid Feature Injection',
      desc: 'Fast feature addition with all states',
      code: `RAPID INJECT: [FEATURE_NAME]
Users can [ACTION].
Must include: validation, loading, error states.
Match styling of [existing component].
Responsive + accessible. Execute now.`
    },
    {
      tag: 'Quick', tagColor: 'rgba(239,68,68,0.15)', tagText: '#f87171',
      name: 'Anomaly Patch',
      desc: 'Fast targeted bug fix',
      code: `PATCH REQUIRED: [BUG_DESCRIPTION]
Manifests when: [TRIGGER_CONDITION]
Expected behavior: [CORRECT_STATE]
Verify: [RELEVANT_FILE_OR_COMPONENT]
Apply fix. Confirm resolution.`
    },
    {
      tag: 'Quick', tagColor: 'rgba(139,92,246,0.15)', tagText: '#a78bfa',
      name: 'Visual Recalibration',
      desc: 'Targeted styling update',
      code: `VISUAL RECALIBRATE: [COMPONENT]
Modify: [color/spacing/layout/size]
Add: [animation/effect/interaction]
Direction: [modern/minimal/futuristic]
Preserve all functionality.`
    },
    {
      tag: 'Quick', tagColor: 'rgba(6,182,212,0.15)', tagText: '#22d3ee',
      name: 'API Link Sequence',
      desc: 'Fast external API integration',
      code: `API LINK: [SERVICE_NAME]
Endpoint: [URL]
Auth: [method + credential location]
Fetch: [data type]
Render as: [component type]
Handle: loading skeleton + error state + empty state.`
    },
  ],
}
