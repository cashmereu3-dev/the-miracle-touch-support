import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Mail,
  Inbox,
  MessageSquare,
  Database,
  Clock,
  ArrowRight,
  ExternalLink,
  Shield,
  Zap,
  BarChart3,
  Sliders,
  Star,
  User,
  Copy,
  ChevronRight,
  X,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  ThumbsUp,
  Send,
  Linkedin,
  PhoneCall,
  Check,
  RotateCcw,
  Sparkles,
  Download,
  Share2,
  Lock,
  Layers,
  ArrowUpRight,
  Search
} from 'lucide-react';

// --- DATA STRUCTURES & CONSTANTS ---
interface CaseStudy {
  id: string;
  category: string;
  title: string;
  client: string;
  timeframe: string;
  metric: string;
  metricLabel: string;
  summary: string;
  challenge: string;
  strategy: string[];
  toolsUsed: string[];
  outcome: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

interface CapabilityItem {
  id: string;
  category: 'admin' | 'support' | 'crm' | 'scheduling';
  title: string;
  headline: string;
  description: string;
  tools: string[];
  deliverables: string[];
  impactMetric: string;
}

interface CRMDeal {
  id: string;
  clientName: string;
  company: string;
  stage: 'Lead Inbound' | 'Discovery' | 'Proposal' | 'Contract Sent' | 'Closed Won';
  value: number;
  priority: 'P0 - Urgent' | 'P1 - High' | 'P2 - Standard';
  lastTouch: string;
  slaStatus: 'On Track' | 'Attention' | 'Escalated';
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'zendesk-scale',
    category: 'Customer Operations',
    title: 'Rapid Omnichannel Support Restructuring for B2B SaaS',
    client: 'ScaleStack Technologies (Series A)',
    timeframe: '90-Day Operational Overhaul',
    metric: '99.4%',
    metricLabel: 'SLA Adherence Maintained',
    summary: 'Turned a backlogged customer support inbox into an efficient Zendesk-powered resolution hub with automated routing and de-escalation playbooks.',
    challenge: 'Support tickets surged by 340% following a major product release. Median first response time drifted to 18 hours, causing churn threats from high-tier enterprise clients.',
    strategy: [
      'Configured multi-tier Zendesk triage queues segregating billing, bugs, and executive inquiries.',
      'Authored 24 customized response macros balancing empathetic human tone with quick resolution steps.',
      'Instituted an SLA escalation matrix catching critical tickets within 15 minutes of inbound receipt.',
      'Created daily de-escalation summaries for founders highlighting recurring technical bottlenecks.'
    ],
    toolsUsed: ['Zendesk Suite', 'Slack Connect', 'Loom', 'Google Sheets'],
    outcome: 'First response time slashed from 18 hours to 18 minutes; CSAT rebounded to 4.9/5; preserved over $140,000 in at-risk annual recurring revenue.',
    testimonial: {
      quote: "Emelle took our chaotic customer ticket backlog and turned it into a competitive advantage. She handles sensitive enterprise accounts with sheer composure and precision.",
      author: "Marcus Vance",
      role: "VP of Product, ScaleStack"
    }
  },
  {
    id: 'inbox-zero',
    category: 'Administrative & Workflow',
    title: 'Executive Inbox & Schedule Architecture for Multi-Entity Founder',
    client: 'Apex Venture Partners & Portfolio Co',
    timeframe: 'Ongoing Retainer',
    metric: '18 hrs',
    metricLabel: 'Executive Time Reclaimed Weekly',
    summary: 'Transformed an overwhelming 1,800+ unread email deluge into a pristine Inbox Zero system while protecting strategic founder time.',
    challenge: 'Founder was drowning in 120+ inbound emails daily, missing critical investor and deal queries while struggling with back-to-back calendar friction.',
    strategy: [
      'Implemented the 4-Tier Labeling Hierarchy: 01_Action_Required, 02_Awaiting_Response, 03_VIP_Board, 04_Read_Archive.',
      'Filtered spam, marketing, and CC notifications directly into scheduled batch digests.',
      'Engineered executive daily morning briefs summarizing upcoming appointments, prep notes, and 3 key priority decisions.',
      'Audited calendar to establish 90-minute uninterrupted deep-work buffers.'
    ],
    toolsUsed: ['Google Workspace (Gmail & Calendar)', 'Notion', 'Calendly', 'Slack'],
    outcome: 'Inbox Zero maintained continuously every business day; founder unlocked 18+ hours weekly dedicated to high-conviction dealmaking.',
    testimonial: {
      quote: "Before Emelle, my inbox was a source of constant dread. She brought ruthless organization and utter calm to my daily calendar. I cannot imagine running my fund without her.",
      author: "Helena Zhou",
      role: "Managing Partner, Apex Ventures"
    }
  },
  {
    id: 'crm-pipeline',
    category: 'CRM & Pipeline Integrity',
    title: 'HubSpot Pipeline Hygiene & Deal Tracking Architecture',
    client: 'Luminary Brand Agency',
    timeframe: '6-Week Systems Sprint',
    metric: '$1.2M',
    metricLabel: 'Active Pipeline Re-Engaged',
    summary: 'Revamped fragmented deal stages, enriched client contact records, and automated status reporting for a growing 20-person agency.',
    challenge: 'Sales representatives were failing to log deal notes, leaving outdated contract values, dead leads in active stages, and zero visibility for leadership.',
    strategy: [
      'Cleaned and verified 650+ dormant contacts, removing duplicates and enriching metadata.',
      'Standardized stage definitions, mandatory fields, and deal closing requirements.',
      'Built a weekly pipeline discrepancy audit syncing HubSpot directly with Google Sheets executive dashboards.',
      'Automated reminder triggers for leads stagnant for more than 5 business days.'
    ],
    toolsUsed: ['HubSpot CRM', 'Google Sheets', 'Microsoft Excel', 'Loom'],
    outcome: 'Eliminated pipeline blind spots, reduced deal slip rate by 42%, and recovered 14 stalled deals worth $310,000 in closed revenue.',
    testimonial: {
      quote: "Emelle doesn't just manage data; she understands business leverage. Her pipeline tracking gave us true forecasting clarity for the first time.",
      author: "Christian Becker",
      role: "Chief Revenue Officer, Luminary"
    }
  }
];

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'admin-mastery',
    category: 'admin',
    title: 'Administrative & Workflow Mastery',
    headline: 'High-Touch Executive Infrastructure',
    description: 'Transforming cluttered inputs into disciplined operational systems. Managing high-stakes correspondence, document synthesis, and daily workflow execution.',
    tools: ['Google Workspace', 'Microsoft Office / 365', 'Slack', 'Notion'],
    deliverables: [
      'Inbox Zero architecture with priority filters',
      'Daily executive briefing briefs and action dossiers',
      'Confidential document preparation & filing',
      'Expense, travel, and logistics orchestration'
    ],
    impactMetric: 'Average 15–20 hours reclaimed weekly'
  },
  {
    id: 'support-ops',
    category: 'support',
    title: 'Omnichannel Customer Operations',
    headline: 'SLA-Driven Customer Experience',
    description: 'Delivering empathetic, swift, and brand-aligned customer resolutions. Building repeatable support playbooks and managing ticket triage.',
    tools: ['Zendesk Suite', 'Live Chat', 'Loom', 'Google Workspace'],
    deliverables: [
      'Tier 1 & Tier 2 ticket resolution within SLA',
      'Subscription cancellation mitigation & de-escalation',
      'Macro & FAQ library curation',
      'CSAT monitoring and recurring issue feedback loops'
    ],
    impactMetric: 'Sub-20 minute median initial response'
  },
  {
    id: 'crm-integrity',
    category: 'crm',
    title: 'CRM Architecture & Pipeline Integrity',
    headline: 'Revenue Pipeline Hygiene & Auditing',
    description: 'Ensuring your revenue engine never misses a beat. Keeping records immaculate, stages accurate, and follow-ups strictly scheduled.',
    tools: ['HubSpot CRM', 'Google Sheets', 'Microsoft Excel'],
    deliverables: [
      'Deal tracking & stage progression verification',
      'Contact enrichment, deduplication & hygiene',
      'Custom KPI summaries and automated trackers',
      'Client onboarding paperwork & status checklists'
    ],
    impactMetric: '100% data integrity across active accounts'
  },
  {
    id: 'calendar-scheduling',
    category: 'scheduling',
    title: 'Advanced Calendar & Time Engineering',
    headline: 'Strategic Time Protection & Screening',
    description: 'Protecting your focus like a fortress. Designing intelligent booking intake funnels that screen prospects and eliminate scheduling ping-pong.',
    tools: ['Calendly', 'Google Calendar', 'Microsoft Teams', 'Zoom'],
    deliverables: [
      'Multi-timezone international booking architecture',
      'Custom pre-meeting intake screening forms',
      'Meeting prep dossiers with attendee backgrounds',
      'Deep work buffers and strict schedule protection'
    ],
    impactMetric: 'Zero double-bookings & 40% fewer unqualified calls'
  }
];

const INITIAL_CRM_DATA: CRMDeal[] = [
  {
    id: 'D-101',
    clientName: 'Sarah Jenkins',
    company: 'Fintech Vanguard Ltd',
    stage: 'Proposal',
    value: 84000,
    priority: 'P0 - Urgent',
    lastTouch: 'Today, 09:15 AM',
    slaStatus: 'On Track'
  },
  {
    id: 'D-102',
    clientName: 'Alexander Hayes',
    company: 'Cobalt Logistics AI',
    stage: 'Contract Sent',
    value: 125000,
    priority: 'P0 - Urgent',
    lastTouch: 'Yesterday, 04:30 PM',
    slaStatus: 'On Track'
  },
  {
    id: 'D-103',
    clientName: 'Elena Rostova',
    company: 'Nordic Health Systems',
    stage: 'Discovery',
    value: 45000,
    priority: 'P1 - High',
    lastTouch: 'Oct 26, 11:00 AM',
    slaStatus: 'On Track'
  },
  {
    id: 'D-104',
    clientName: 'David K. O’Connor',
    company: 'Apex Cloud Advisory',
    stage: 'Closed Won',
    value: 96000,
    priority: 'P2 - Standard',
    lastTouch: 'Oct 24, 02:45 PM',
    slaStatus: 'On Track'
  },
  {
    id: 'D-105',
    clientName: 'Priya Sharma',
    company: 'Ventura Capital Labs',
    stage: 'Lead Inbound',
    value: 62000,
    priority: 'P1 - High',
    lastTouch: 'Today, 08:30 AM',
    slaStatus: 'On Track'
  }
];

export default function App() {
  // Navigation & Modals
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedHTML, setCopiedHTML] = useState(false);

  // Capability Matrix Tab
  const [capabilityFilter, setCapabilityFilter] = useState<'all' | 'admin' | 'support' | 'crm' | 'scheduling'>('all');

  // Work Sample Simulator Tab
  const [simulatorTab, setSimulatorTab] = useState<'zendesk' | 'gmail' | 'crm' | 'calendly'>('zendesk');

  // Zendesk Simulation State
  const [ticketState, setTicketState] = useState<{
    status: 'unresolved' | 'macro_applied' | 'refunded' | 'escalated' | 'resolved';
    selectedMacro: string;
    priority: 'High' | 'Urgent';
    csat: number;
    auditLog: string[];
  }>({
    status: 'unresolved',
    selectedMacro: '',
    priority: 'Urgent',
    csat: 0,
    auditLog: ['Ticket #4829 received from Marcus Vance (Enterprise Tier) at 09:12 AM']
  });

  // Gmail Inbox Before/After State
  const [inboxView, setInboxView] = useState<'before' | 'after'>('after');
  const [activeGmailLabel, setActiveGmailLabel] = useState<string>('01_Action_Required');

  // CRM Tracker State
  const [crmDeals, setCrmDeals] = useState<CRMDeal[]>(INITIAL_CRM_DATA);
  const [crmSearch, setCrmSearch] = useState('');
  const [crmStageFilter, setCrmStageFilter] = useState<string>('All');
  const [crmSuccessBanner, setCrmSuccessBanner] = useState<string | null>(null);

  // Calendly Intake Preview State
  const [intakeStep, setIntakeStep] = useState<1 | 2 | 3>(1);
  const [intakeData, setIntakeData] = useState({
    name: 'Julian Sterling',
    email: 'j.sterling@sterlingops.io',
    role: 'CEO & Founder',
    urgency: 'Immediate (Next 7 days)',
    bottleneck: 'Executive calendar chaos and support ticket backlog',
    hoursNeeded: '20+ hours/week'
  });

  // ROI Calculator State
  const [adminHoursWeekly, setAdminHoursWeekly] = useState(16);
  const [executiveHourlyRate, setExecutiveHourlyRate] = useState(250);
  const [teamMembers, setTeamMembers] = useState(1);

  // Calculation Results
  const annualHoursSaved = useMemo(() => {
    return Math.round(adminHoursWeekly * 48 * teamMembers);
  }, [adminHoursWeekly, teamMembers]);

  const annualValueCreated = useMemo(() => {
    return annualHoursSaved * executiveHourlyRate;
  }, [annualHoursSaved, executiveHourlyRate]);

  const estimatedRetainerCost = useMemo(() => {
    return Math.round(adminHoursWeekly * 42 * 48 * teamMembers);
  }, [adminHoursWeekly, teamMembers]);

  const roiRatio = useMemo(() => {
    if (estimatedRetainerCost === 0) return 0;
    return (annualValueCreated / estimatedRetainerCost).toFixed(1);
  }, [annualValueCreated, estimatedRetainerCost]);

  // Copy Email Handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('miracleemelle5@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Filtered Capabilities
  const filteredCapabilities = useMemo(() => {
    if (capabilityFilter === 'all') return CAPABILITIES;
    return CAPABILITIES.filter((c) => c.category === capabilityFilter);
  }, [capabilityFilter]);

  // Filtered CRM Deals
  const filteredDeals = useMemo(() => {
    return crmDeals.filter((d) => {
      const matchesSearch =
        d.clientName.toLowerCase().includes(crmSearch.toLowerCase()) ||
        d.company.toLowerCase().includes(crmSearch.toLowerCase());
      const matchesStage = crmStageFilter === 'All' || d.stage === crmStageFilter;
      return matchesSearch && matchesStage;
    });
  }, [crmDeals, crmSearch, crmStageFilter]);

  // Zendesk actions
  const applyZendeskMacro = (macroTitle: string) => {
    setTicketState((prev) => ({
      ...prev,
      status: 'macro_applied',
      selectedMacro: macroTitle,
      auditLog: [
        ...prev.auditLog,
        `Macro "${macroTitle}" applied by Emelle Miracle with personalized tone.`,
        `Draft generated: Addressed billing discrepancy and outlined SLA timeline.`
      ]
    }));
  };

  const processZendeskRefund = () => {
    setTicketState((prev) => ({
      ...prev,
      status: 'refunded',
      auditLog: [
        ...prev.auditLog,
        `Credit memo of $450 issued within approved authorization limit.`,
        `Account marked with VIP retention tag.`
      ]
    }));
  };

  const resolveZendeskTicket = () => {
    setTicketState((prev) => ({
      ...prev,
      status: 'resolved',
      csat: 5,
      auditLog: [
        ...prev.auditLog,
        `Ticket marked as Solved within 14 min SLA window.`,
        `Client responded: "Thank you for the prompt resolution Emelle, we are renewing immediately!"`
      ]
    }));
  };

  const resetZendesk = () => {
    setTicketState({
      status: 'unresolved',
      selectedMacro: '',
      priority: 'Urgent',
      csat: 0,
      auditLog: ['Ticket #4829 received from Marcus Vance (Enterprise Tier) at 09:12 AM']
    });
  };

  // Advance deal in CRM
  const handleAdvanceDeal = (dealId: string) => {
    setCrmDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const stages: CRMDeal['stage'][] = [
            'Lead Inbound',
            'Discovery',
            'Proposal',
            'Contract Sent',
            'Closed Won'
          ];
          const currentIndex = stages.indexOf(deal.stage);
          const nextStage = stages[Math.min(currentIndex + 1, stages.length - 1)];
          return {
            ...deal,
            stage: nextStage,
            lastTouch: 'Just now by Emelle'
          };
        }
        return deal;
      })
    );
    setCrmSuccessBanner(`Updated deal status and logged audit trail in CRM.`);
    setTimeout(() => setCrmSuccessBanner(null), 3000);
  };

  // Standalone HTML template generator
  const generateStandaloneHTML = () => {
    return `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emelle Miracle | Executive Virtual Assistant & Operations Specialist</title>
  <meta name="description" content="Turning operational chaos into streamlined growth for high-performing founders and enterprises.">
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #0B0F19; color: #f1f5f9; }
    .glass-card { background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(16px); border: 1px solid rgba(51, 65, 85, 0.8); }
  </style>
</head>
<body class="bg-[#0B0F19] text-slate-100 antialiased selection:bg-blue-600/30 selection:text-blue-200">
  <header class="flex items-center justify-between gap-8 px-8 py-5 border-b border-slate-800 sticky top-0 bg-[#0B0F19]/90 backdrop-blur-xl z-50">
    <a href="#" class="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-100 whitespace-nowrap">
      <img src="/assets/aistudio/em1_c6840a70.jpeg" alt="Emelle Miracle" class="w-9 h-9 rounded-lg object-cover object-top border border-slate-700" />
      <span>The Miracle Touch Support Co.</span>
    </a>
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
      <a href="#capabilities" class="hover:text-blue-400 transition-colors">Capabilities</a>
      <a href="#sandbox" class="hover:text-blue-400 transition-colors">Operations Sandbox</a>
      <a href="#case-studies" class="hover:text-blue-400 transition-colors">Case Studies</a>
      <a href="#calculator" class="hover:text-blue-400 transition-colors">ROI Calculator</a>
    </nav>
    <a href="https://calendly.com/miracleemelle5/client-consultation-" target="_blank" class="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-md shadow-blue-900/30 transition-colors">
      Book Consultation
    </a>
  </header>

  <main class="max-w-6xl mx-auto px-6 py-20 space-y-24">
    <section class="text-center space-y-6">
      <div class="flex justify-center mb-4">
        <img src="/assets/aistudio/em1_c6840a70.jpeg" alt="Emelle Miracle" class="w-24 h-24 rounded-2xl object-cover object-top border-2 border-slate-700 shadow-2xl" />
      </div>
      <span class="text-xs uppercase tracking-widest text-blue-400 font-semibold">Executive Operations & Systems Architecture</span>
      <h1 class="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight max-w-4xl mx-auto">
        Turning operational chaos into streamlined growth for high-performing founders.
      </h1>
      <p class="text-lg text-slate-300 max-w-2xl mx-auto">
        Partnering with C-suite executives and rapid-growth teams to engineer inbox zero architectures, Zendesk resolution hubs, and disciplined CRM pipelines.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
        <a href="https://calendly.com/miracleemelle5/client-consultation-" target="_blank" class="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-900/30">
          Schedule Consultation Call
        </a>
        <a href="mailto:miracleemelle5@gmail.com" class="px-6 py-3.5 text-sm font-semibold text-slate-200 border border-slate-700 rounded-lg hover:bg-slate-800/50">
          Email Emelle Directly
        </a>
      </div>
    </section>
  </main>
</body>
</html>`;
  };

  const handleCopyHTML = () => {
    navigator.clipboard.writeText(generateStandaloneHTML());
    setCopiedHTML(true);
    setTimeout(() => setCopiedHTML(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      {/* --- TOP BAR (Strict 3-Zone Contract with Slate Borders & Royal Navy Accents) --- */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0B0F19]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
          {/* Zone 1: Wordmark with Emelle Miracle Avatar Thumbnail */}
          <a
            href="#"
            className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0 group"
          >
            <div className="relative h-9 w-9 rounded-lg overflow-hidden border border-slate-700/80 shadow-md shadow-blue-950/40">
              <img
                src="/assets/aistudio/em1_c6840a70.jpeg"
                alt="Emelle Miracle"
                className="h-full w-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-slate-100 group-hover:text-white transition-colors">The Miracle Touch Support Co.</span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#capabilities"
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              Capabilities
            </a>
            <a
              href="#sandbox"
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              Operations Sandbox
            </a>
            <a
              href="#case-studies"
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              Case Studies
            </a>
            <a
              href="#calculator"
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              ROI Calculator
            </a>
            <a
              href="#tech-stack"
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              Tech Stack
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-md shadow-blue-900/30 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN BODY --- */}
      <main className="flex-1">
        {/* =========================================================================
            SECTION 1: HERO (Split-Screen & Command Center Focal Anchor)
           ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
          {/* Subtle Royal Navy Ambient Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-tr from-blue-700/20 via-indigo-600/10 to-transparent blur-[120px] rounded-full"
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Left Column: Typographic Hierarchy & Platinum Headings */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-blue-400 uppercase">
                  <span>Executive Virtual Assistant</span>
                  <span aria-hidden="true">·</span>
                  <span>Customer Operations Specialist</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-100 leading-[1.15] text-balance">
                  Turning operational chaos into streamlined growth for high-performing founders.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Eliminate bottlenecks and protect your strategic focus. I engineer disciplined
                  Inbox Zero workflows, SLA-compliant Zendesk support engines, and spotless CRM
                  pipelines so leadership can focus entirely on scaling.
                </p>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/30 active:scale-[0.98] cursor-pointer"
                  >
                    <span>Schedule Consultation Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#sandbox"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 border border-slate-700/80 bg-slate-900/40 rounded-lg hover:bg-slate-800/60 hover:border-slate-600 transition-all cursor-pointer"
                  >
                    <Sliders className="w-4 h-4 text-sky-400" />
                    <span>Test Operations Sandbox</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>100% Confidentiality & Data Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span>Sub-20 Min First Touch SLA</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Emelle Miracle Executive Profile & Live Console */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl border border-slate-800 bg-[#0f172a]/80 p-5 backdrop-blur-xl shadow-2xl space-y-4">
                  {/* Executive Portrait Feature */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/80 group">
                    <img
                      src="/assets/aistudio/em1_c6840a70.jpeg"
                      alt="Emelle Miracle - Executive Virtual Assistant & Operations Specialist"
                      className="w-full h-72 sm:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    {/* Measured Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />

                    {/* Status Pill Overlays */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Available for Q1 Retainers</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-blue-950/85 backdrop-blur-md border border-blue-700/80 text-[11px] font-mono text-blue-300 shadow-md">
                      99.4% SLA
                    </div>

                    {/* Name & Credentials Bar */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <div className="text-lg font-bold text-slate-100 tracking-tight">Emelle Miracle</div>
                        <div className="text-xs text-slate-300">Executive Virtual Assistant &amp; Operations Specialist</div>
                      </div>
                      <a
                        href="https://linkedin.com/in/emelle-miracle-u-e-067844417"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-900/90 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 transition-colors shadow"
                        title="View Verified LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Operational Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/90 space-y-0.5">
                      <div className="text-[11px] text-slate-400">Customer Support SLA</div>
                      <div className="text-xl font-bold font-mono tracking-tight text-slate-100 tabular-nums">
                        99.4%
                      </div>
                      <div className="text-[10px] text-emerald-400 font-medium">Sub-20m resolution</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/90 space-y-0.5">
                      <div className="text-[11px] text-slate-400">Weekly Time Saved</div>
                      <div className="text-xl font-bold font-mono tracking-tight text-slate-100 tabular-nums">
                        18.5 hrs
                      </div>
                      <div className="text-[10px] text-blue-400 font-medium">Per executive client</div>
                    </div>
                  </div>

                  {/* Live Activity Stream */}
                  <div className="space-y-2 pt-1 border-t border-slate-800">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      <span>Live Triage Dispatch</span>
                      <span className="text-emerald-400 font-mono text-[10px]">SYSTEM OPTIMAL</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800/70">
                        <span className="truncate pr-2">Priority VIP filter applied to board deck memo</span>
                        <span className="text-[11px] text-emerald-400 font-mono shrink-0">Done</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800/70">
                        <span className="truncate pr-2">Zendesk macro de-escalated billing ticket #4829</span>
                        <span className="text-[11px] text-emerald-400 font-mono shrink-0">Resolved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- FULL-WIDTH METRIC STRIP BELOW HERO --- */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0f172a]/60 border border-slate-800 backdrop-blur-md">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium">Core Mastery Pillars</div>
                <div className="text-xl sm:text-2xl font-bold text-slate-100 font-mono">04</div>
                <div className="text-xs text-slate-400">Admin, Support, CRM, Calendar</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium">Median Response Speed</div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">&lt; 18 min</div>
                <div className="text-xs text-slate-400">Rapid de-escalation SLA</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium">Tool Integrations</div>
                <div className="text-xl sm:text-2xl font-bold text-slate-100 font-mono">8+ Systems</div>
                <div className="text-xs text-slate-400">Google, HubSpot, Zendesk, Teams</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium">Founder Retention Rate</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-400 font-mono">100%</div>
                <div className="text-xs text-slate-400">Long-term strategic partnership</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: INTERACTIVE WORK SAMPLE SIMULATOR (The Star Feature)
           ========================================================================= */}
        <section id="sandbox" className="py-20 border-t border-slate-800 bg-[#0e1424] relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
            {/* Section Header */}
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Operations Sandbox</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
                Test my operational capabilities live on the page.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Rather than asking you to take my word for it, test how I resolve escalated Zendesk
                tickets, structure Inbox Zero architectures, audit CRM deals, and engineer intake forms.
              </p>
            </div>

            {/* Sandbox Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 w-fit">
              <button
                onClick={() => setSimulatorTab('zendesk')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  simulatorTab === 'zendesk'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>1. Zendesk Ticket Resolution</span>
              </button>

              <button
                onClick={() => setSimulatorTab('gmail')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  simulatorTab === 'gmail'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>2. Gmail Inbox Zero System</span>
              </button>

              <button
                onClick={() => setSimulatorTab('crm')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  simulatorTab === 'crm'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>3. HubSpot & Excel Tracker</span>
              </button>

              <button
                onClick={() => setSimulatorTab('calendly')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  simulatorTab === 'calendly'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>4. Calendly Screening Intake</span>
              </button>
            </div>

            {/* --- SIMULATOR TAB 1: ZENDESK TICKET SIMULATOR --- */}
            {simulatorTab === 'zendesk' && (
              <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/70 p-6 lg:p-8 backdrop-blur-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="text-xs text-blue-400 font-mono">SIMULATION SCENARIO: AT-RISK ENTERPRISE CLIENT</div>
                    <div className="text-lg font-bold text-slate-100">Ticket #4829 — Accidental Overcharge & Cancellation Demand</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">SLA Timer:</span>
                    <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-mono text-xs font-medium">
                      00:14:22 remaining
                    </span>
                    <button
                      onClick={resetZendesk}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Customer Inbound Message */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
                            MV
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-100">Marcus Vance</div>
                            <div className="text-[11px] text-slate-400">VP Operations, ScaleStack (Enterprise Plan, $36k/yr)</div>
                          </div>
                        </div>
                        <span className="text-[11px] text-rose-400 font-medium">Priority: Urgent</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-[#0B0F19] p-3 rounded-lg border border-slate-800/80">
                        &quot;Hi Team, we just noticed our card was billed for 50 inactive seats during our annual renewal.
                        This is unacceptable. If this is not corrected with a full refund and seat adjustment today, we will
                        be forced to cancel our entire enterprise contract immediately.&quot;
                      </p>
                    </div>

                    {/* Interactive Resolution Controls */}
                    <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
                      <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                        Step 1: Select Emelle&apos;s De-escalation Protocol
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          onClick={() => applyZendeskMacro('Enterprise De-escalation & Credit Guarantee')}
                          disabled={ticketState.status !== 'unresolved'}
                          className={`p-3 text-left rounded-lg text-xs border transition-all cursor-pointer ${
                            ticketState.selectedMacro === 'Enterprise De-escalation & Credit Guarantee'
                              ? 'bg-blue-950/60 border-blue-500 text-slate-100 font-medium'
                              : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/60 disabled:opacity-50'
                          }`}
                        >
                          <div className="font-semibold text-slate-100 mb-0.5">Macro: Executive De-escalation</div>
                          <div className="text-[11px] text-slate-400">Empathetic apology, immediate seat adjustment confirmation, and expedited credit request.</div>
                        </button>

                        <button
                          onClick={() => applyZendeskMacro('Generic Automated Acknowledgment')}
                          disabled={ticketState.status !== 'unresolved'}
                          className={`p-3 text-left rounded-lg text-xs border transition-all cursor-pointer ${
                            ticketState.selectedMacro === 'Generic Automated Acknowledgment'
                              ? 'bg-amber-950/40 border-amber-500 text-slate-100 font-medium'
                              : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/60 disabled:opacity-50'
                          }`}
                        >
                          <div className="font-semibold text-slate-100 mb-0.5">Macro: Standard Ticket Queue</div>
                          <div className="text-[11px] text-slate-400">Generic acknowledgment (Risk: lacks founder empathy and triggers churn).</div>
                        </button>
                      </div>

                      {/* Step 2 & 3 Actions */}
                      {ticketState.status !== 'unresolved' && (
                        <div className="pt-2 space-y-2">
                          <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                            Step 2: Operational Execution
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={processZendeskRefund}
                              disabled={ticketState.status === 'refunded' || ticketState.status === 'resolved'}
                              className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors disabled:opacity-40 cursor-pointer"
                            >
                              {ticketState.status === 'refunded' || ticketState.status === 'resolved'
                                ? '✓ Credit Memo & Seat Proration Processed'
                                : 'Authorize $450 Seat Credit & Proration'}
                            </button>

                            <button
                              onClick={resolveZendeskTicket}
                              disabled={ticketState.status === 'resolved'}
                              className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-40 cursor-pointer shadow-md shadow-blue-950"
                            >
                              {ticketState.status === 'resolved'
                                ? '✓ Solved within 14 Min SLA'
                                : 'Submit as Solved with Customer Confirmation'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Live SLA & Audit Trail */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-100">Live Operations Audit Log</span>
                        <span className="text-emerald-400 font-mono text-[11px]">SLA: HEALTHY</span>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {ticketState.auditLog.map((log, idx) => (
                          <div key={idx} className="text-xs font-mono text-slate-400 flex items-start gap-2">
                            <span className="text-blue-400 shrink-0">→</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CSAT Outcome Card */}
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
                      <div className="text-xs text-slate-400">Resulting Customer Satisfaction (CSAT)</div>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= ticketState.csat ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-mono text-slate-300 ml-2">
                          {ticketState.csat > 0 ? '5.0 / 5.0 (Delighted)' : 'Awaiting Resolution'}
                        </span>
                      </div>
                      {ticketState.status === 'resolved' && (
                        <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
                          <strong>Outcome:</strong> Enterprise contract preserved ($36k ARR retained). SLA closed in 14 minutes.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- SIMULATOR TAB 2: GMAIL INBOX ZERO SYSTEM --- */}
            {simulatorTab === 'gmail' && (
              <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/70 p-6 lg:p-8 backdrop-blur-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="text-xs text-blue-400 font-mono">EXECUTIVE WORKFLOW TRANSFORMATION</div>
                    <div className="text-lg font-bold text-slate-100">Gmail Architecture: Before vs. After Emelle</div>
                  </div>

                  {/* Toggle Between Before & After */}
                  <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setInboxView('before')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        inboxView === 'before'
                          ? 'bg-rose-500/20 text-rose-300 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Before: 1,482 Unread Chaos
                    </button>
                    <button
                      onClick={() => setInboxView('after')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        inboxView === 'after'
                          ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      After: Emelle Inbox Zero Protocol
                    </button>
                  </div>
                </div>

                {inboxView === 'before' ? (
                  <div className="p-6 rounded-xl bg-rose-500/[0.04] border border-rose-500/30 space-y-4">
                    <div className="flex items-center justify-between text-xs text-rose-300">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span className="font-semibold">Unfiltered Inbound Flood</span>
                      </div>
                      <span className="font-mono">1,482 Unread Items</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 opacity-70 flex justify-between">
                        <span>[Newsletter] Growth Hacks Weekly #142</span>
                        <span className="text-slate-500">3 days ago</span>
                      </div>
                      <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 flex justify-between">
                        <span className="text-rose-200 font-medium">URGENT: Series B Lead Partner term sheet clarification needed</span>
                        <span className="text-rose-400 font-mono">BURIED (Sent 2 days ago)</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 opacity-70 flex justify-between">
                        <span>[Promo] 40% Off Cloud Server Credits</span>
                        <span className="text-slate-500">Yesterday</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 opacity-70 flex justify-between">
                        <span>Invoice #9822 Payment Receipt</span>
                        <span className="text-slate-500">Yesterday</span>
                      </div>
                    </div>
                    <div className="text-xs text-rose-300/80">
                      <strong>Pain Points:</strong> Crucial investor notes are buried under automated spam, founder suffers decision fatigue, and follow-ups fall through the cracks.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Label Hierarchy Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: '01_Action_Required', count: 2, desc: 'Needs founder sign-off today', color: 'text-amber-400' },
                        { label: '02_Awaiting_Reply', count: 4, desc: 'Emelle actively monitoring', color: 'text-blue-400' },
                        { label: '03_VIP_Board_Investors', count: 0, desc: 'Pristine 0 unread queue', color: 'text-emerald-400' },
                        { label: '04_Read_Archive', count: 12, desc: 'Pre-triaged daily digest', color: 'text-slate-400' }
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => setActiveGmailLabel(item.label)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            activeGmailLabel === item.label
                              ? 'bg-blue-950/40 border-blue-500 shadow-md'
                              : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono font-bold text-slate-100">{item.label}</span>
                            <span className={`text-xs font-mono font-bold ${item.color}`}>({item.count})</span>
                          </div>
                          <div className="text-[11px] text-slate-400 leading-tight">{item.desc}</div>
                        </button>
                      ))}
                    </div>

                    {/* Active Label Content Preview */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                        <span className="font-mono text-slate-200">Viewing Queue: {activeGmailLabel}</span>
                        <span className="text-emerald-400">Triaged by Emelle Miracle</span>
                      </div>

                      {activeGmailLabel === '01_Action_Required' && (
                        <div className="space-y-2 text-xs">
                          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-slate-100">Board Meeting Q3 Resolution Document (Docusign)</div>
                              <div className="text-slate-400 text-[11px]">Emelle Note: Legal reviewed; your signature required on Page 4.</div>
                            </div>
                            <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-[11px] font-mono">Sign-off Ready</span>
                          </div>

                          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-slate-100">Keynote Speaker Agreement — TechOps Summit 2026</div>
                              <div className="text-slate-400 text-[11px]">Emelle Note: Travel & hotel accommodations verified; approval needed.</div>
                            </div>
                            <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-[11px] font-mono">Decision Needed</span>
                          </div>
                        </div>
                      )}

                      {activeGmailLabel !== '01_Action_Required' && (
                        <div className="p-4 text-center text-xs text-slate-400 space-y-1">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                          <div>All items in this tier are handled, pre-drafted, or filed into your executive briefing dossier.</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- SIMULATOR TAB 3: CRM & EXCEL TRACKER --- */}
            {simulatorTab === 'crm' && (
              <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/70 p-6 lg:p-8 backdrop-blur-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="text-xs text-blue-400 font-mono">HUBSPOT PIPELINE & EXCEL AUDIT</div>
                    <div className="text-lg font-bold text-slate-100">Live Client & Deal Stage Tracker</div>
                  </div>

                  {crmSuccessBanner && (
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                      {crmSuccessBanner}
                    </div>
                  )}
                </div>

                {/* Search & Filter Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={crmSearch}
                      onChange={(e) => setCrmSearch(e.target.value)}
                      placeholder="Search company or client..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-950/60 border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto text-xs">
                    <span className="text-slate-400">Filter Stage:</span>
                    {['All', 'Discovery', 'Proposal', 'Contract Sent', 'Closed Won'].map((stage) => (
                      <button
                        key={stage}
                        onClick={() => setCrmStageFilter(stage)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer whitespace-nowrap ${
                          crmStageFilter === stage
                            ? 'bg-blue-600 text-white font-medium shadow-sm shadow-blue-950'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deals Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/70 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Deal ID</th>
                        <th className="px-4 py-3">Client & Company</th>
                        <th className="px-4 py-3">Value (ARR)</th>
                        <th className="px-4 py-3">Priority</th>
                        <th className="px-4 py-3">Pipeline Stage</th>
                        <th className="px-4 py-3">Last Audit</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-300">
                      {filteredDeals.map((deal) => (
                        <tr key={deal.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-slate-400">{deal.id}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-slate-100">{deal.clientName}</div>
                            <div className="text-[11px] text-slate-400">{deal.company}</div>
                          </td>
                          <td className="px-4 py-3 font-mono text-emerald-400 font-bold tabular-nums">
                            ${deal.value.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-[11px] font-mono ${
                                deal.priority.includes('Urgent') ? 'text-rose-400' : 'text-slate-300'
                              }`}
                            >
                              {deal.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 text-[11px]">
                              {deal.stage}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">{deal.lastTouch}</td>
                          <td className="px-4 py-3 text-right">
                            {deal.stage !== 'Closed Won' ? (
                              <button
                                onClick={() => handleAdvanceDeal(deal.id)}
                                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-blue-600 hover:text-white border border-slate-700/80 text-[11px] text-slate-200 transition-colors cursor-pointer"
                              >
                                Advance Stage →
                              </button>
                            ) : (
                              <span className="text-emerald-400 text-[11px] font-semibold">✓ Closed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Audited pipeline value: <strong className="text-slate-200">${crmDeals.reduce((a, b) => a + b.value, 0).toLocaleString()}</strong></span>
                  <span>Syncs bi-directionally with HubSpot and Excel trackers</span>
                </div>
              </div>
            )}

            {/* --- SIMULATOR TAB 4: CALENDLY SCREENING INFRASTRUCTURE --- */}
            {simulatorTab === 'calendly' && (
              <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/70 p-6 lg:p-8 backdrop-blur-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="text-xs text-blue-400 font-mono">EXECUTIVE TIME ENGINEERING</div>
                    <div className="text-lg font-bold text-slate-100">Multi-Step Intake & Screening Protocol</div>
                  </div>
                  <div className="text-xs text-slate-400">Step {intakeStep} of 3</div>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Step Indicators */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className={`h-1.5 rounded-full ${intakeStep >= 1 ? 'bg-blue-600' : 'bg-slate-800'}`} />
                    <div className={`h-1.5 rounded-full ${intakeStep >= 2 ? 'bg-blue-600' : 'bg-slate-800'}`} />
                    <div className={`h-1.5 rounded-full ${intakeStep >= 3 ? 'bg-blue-600' : 'bg-slate-800'}`} />
                  </div>

                  {intakeStep === 1 && (
                    <div className="space-y-4 p-5 rounded-xl bg-slate-950/50 border border-slate-800">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-slate-100">Step 1: Timezone & Meeting Qualification</div>
                        <div className="text-xs text-slate-400">Detecting timezone, availability buffers, and consultation objectives.</div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-300 mb-1">Your Full Name</label>
                          <input
                            type="text"
                            value={intakeData.name}
                            onChange={(e) => setIntakeData({ ...intakeData, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-100 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1">Business Email</label>
                          <input
                            type="email"
                            value={intakeData.email}
                            onChange={(e) => setIntakeData({ ...intakeData, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-100 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => setIntakeStep(2)}
                        className="w-full py-2.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-950 cursor-pointer"
                      >
                        Continue to Context Questionnaire →
                      </button>
                    </div>
                  )}

                  {intakeStep === 2 && (
                    <div className="space-y-4 p-5 rounded-xl bg-slate-950/50 border border-slate-800">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-slate-100">Step 2: Operational Bottleneck Assessment</div>
                        <div className="text-xs text-slate-400">Screening context so your strategy call is 100% focused on solutions.</div>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-slate-300 mb-1">Primary Operational Bottleneck</label>
                          <select
                            value={intakeData.bottleneck}
                            onChange={(e) => setIntakeData({ ...intakeData, bottleneck: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-100 focus:outline-none focus:border-blue-500"
                          >
                            <option>Executive calendar chaos and support ticket backlog</option>
                            <option>Gmail flooded with 1,000+ unread emails</option>
                            <option>HubSpot CRM data is stale and missing follow-ups</option>
                            <option>Need full-service operational partner for 20+ hrs/wk</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-300 mb-1">Target Start Date</label>
                          <select
                            value={intakeData.urgency}
                            onChange={(e) => setIntakeData({ ...intakeData, urgency: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-100 focus:outline-none focus:border-blue-500"
                          >
                            <option>Immediate (Next 7 days)</option>
                            <option>Within 2–3 weeks</option>
                            <option>Next month / Q1 planning</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setIntakeStep(1)}
                          className="w-1/3 py-2.5 rounded-lg text-xs font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={() => setIntakeStep(3)}
                          className="w-2/3 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-950 cursor-pointer"
                        >
                          Generate Pre-Meeting Brief Preview →
                        </button>
                      </div>
                    </div>
                  )}

                  {intakeStep === 3 && (
                    <div className="space-y-4 p-5 rounded-xl bg-slate-950/50 border border-slate-800">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="text-sm font-bold text-slate-100">Step 3: Executive Briefing Pack Preview</div>
                        <span className="text-emerald-400 text-xs font-mono">QUALIFIED</span>
                      </div>

                      <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="text-slate-400 font-mono text-[11px]">PREPARED FOR EMELLE & EXECUTIVE:</div>
                        <div className="text-slate-100 font-medium">Prospective Partner: {intakeData.name} ({intakeData.email})</div>
                        <div className="text-slate-300">Identified Bottleneck: {intakeData.bottleneck}</div>
                        <div className="text-slate-300">Timeline: {intakeData.urgency}</div>
                        <div className="pt-2 text-emerald-300 text-[11px]">
                          ✓ 15-minute buffer blocked before/after call
                          <br />
                          ✓ One-click Calendly confirmation link synchronized
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <a
                          href="https://calendly.com/miracleemelle5/client-consultation-"
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Confirm on Emelle&apos;s Real Calendly</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setIntakeStep(1)}
                          className="px-4 py-2.5 rounded-lg text-xs font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          Reset Demo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: CORE CAPABILITIES MATRIX (Filterable Tabs)
           ========================================================================= */}
        <section id="capabilities" className="py-20 border-t border-slate-800 bg-[#0B0F19]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Operational Pillars & Scope</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
                  Engineered precision across four core operational domains.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  From high-touch founder administrative support to enterprise customer operations and CRM hygiene,
                  every deliverable is measured by speed, accuracy, and executive peace of mind.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
                {[
                  { id: 'all', label: 'All Capabilities' },
                  { id: 'admin', label: 'Administrative' },
                  { id: 'support', label: 'Customer Support' },
                  { id: 'crm', label: 'CRM & Pipeline' },
                  { id: 'scheduling', label: 'Scheduling' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCapabilityFilter(tab.id as typeof capabilityFilter)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      capabilityFilter === tab.id
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Capabilities Cards Grid with Platinum and Slate Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCapabilities.map((cap) => (
                <div
                  key={cap.id}
                  className="rounded-2xl border border-slate-800 bg-[#0f172a]/60 p-6 lg:p-7 backdrop-blur-xl hover:border-slate-700 transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                        {cap.headline}
                      </span>
                      <span className="text-xs font-medium text-emerald-400 font-mono">
                        {cap.impactMetric}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                      {cap.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {cap.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Core Systems & Deliverables
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                        {cap.deliverables.map((d, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tool Stack Tags */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="text-[11px] font-mono text-slate-500">PLATFORMS:</span>
                    {cap.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/60 text-[11px] text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: CLIENT ROI CALCULATOR
           ========================================================================= */}
        <section id="calculator" className="py-20 border-t border-slate-800 bg-[#0e1424] relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Executive Economic Impact</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
                Calculate your return on executive operational support.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Estimate how many strategic hours your executive team can reclaim each year and calculate the
                financial value unlocked by offloading operational drag.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
              {/* Sliders Input Panel */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0f172a]/70 p-6 sm:p-8 backdrop-blur-xl space-y-6">
                {/* Slider 1: Admin Hours */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-100">Weekly Hours Lost to Operations & Admin</span>
                    <span className="font-mono text-blue-400 font-bold tabular-nums text-base">
                      {adminHoursWeekly} hrs/week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="1"
                    value={adminHoursWeekly}
                    onChange={(e) => setAdminHoursWeekly(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>5 hrs (Light Inbox)</span>
                    <span>20 hrs (Typical Founder)</span>
                    <span>35 hrs (Operational Drag)</span>
                  </div>
                </div>

                {/* Slider 2: Hourly Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-100">Founder / Executive Opportunity Rate</span>
                    <span className="font-mono text-emerald-400 font-bold tabular-nums text-base">
                      ${executiveHourlyRate} / hr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    step="25"
                    value={executiveHourlyRate}
                    onChange={(e) => setExecutiveHourlyRate(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>$100/hr (Early Stage)</span>
                    <span>$250/hr (Funded Founder)</span>
                    <span>$600/hr (Managing Partner)</span>
                  </div>
                </div>

                {/* Slider 3: Executives Supported */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-100">Executives / Leaders Requiring Support</span>
                    <span className="font-mono text-slate-100 font-bold tabular-nums text-base">
                      {teamMembers} {teamMembers === 1 ? 'Leader' : 'Leaders'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                  Calculations assume 48 active working weeks per year, factoring in strategic time reinvestment into sales,
                  fundraising, product architecture, and enterprise customer relationships.
                </div>
              </div>

              {/* Economic Outcome Card */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-gradient-to-b from-blue-950/50 via-[#0f172a] to-[#0B0F19] p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-2xl">
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">ANNUAL RECLAIMED CAPITAL</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight tabular-nums">
                    ${annualValueCreated.toLocaleString()}
                  </div>
                  <div className="text-xs text-emerald-400">Value unlocked from founder refocus</div>
                </div>

                <div className="space-y-3 border-t border-slate-800 pt-4 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Hours Saved / Year:</span>
                    <span className="font-mono font-bold text-slate-100 tabular-nums">{annualHoursSaved.toLocaleString()} hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Est. Retainer Investment:</span>
                    <span className="font-mono text-slate-300 tabular-nums">~${estimatedRetainerCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Projected Value Multiple:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">{roiRatio}x ROI</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 cursor-pointer active:scale-[0.98]"
                >
                  Reclaim These {adminHoursWeekly} Hours Weekly →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: DETAILED CASE STUDIES (With Interactive Modals)
           ========================================================================= */}
        <section id="case-studies" className="py-20 border-t border-slate-800 bg-[#0B0F19]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Verified Client Case Studies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
                Real operational turnarounds and measurable outcomes.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Click any case study below to inspect the full strategic diagnosis, tactical implementations,
                and before-and-after results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CASE_STUDIES.map((study) => (
                <div
                  key={study.id}
                  onClick={() => setActiveCaseStudy(study)}
                  className="rounded-2xl border border-slate-800 bg-[#0f172a]/60 p-6 backdrop-blur-xl hover:border-slate-700 transition-all flex flex-col justify-between cursor-pointer group space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{study.category}</span>
                      <span className="font-mono text-blue-400">{study.timeframe}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-snug">
                      {study.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {study.summary}
                    </p>

                    {/* Proof Metric Callout */}
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                        {study.metric}
                      </div>
                      <div className="text-[11px] text-slate-400">{study.metricLabel}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-medium text-blue-400 group-hover:text-blue-300">
                    <span>Inspect Case Study & Systems</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: MASTERED TECH STACK
           ========================================================================= */}
        <section id="tech-stack" className="py-20 border-t border-slate-800 bg-[#0e1424]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Database className="w-3.5 h-3.5" />
                <span>Ecosystem Mastery</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
                Mastered enterprise platforms and software stack.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Zero learning curve. I seamlessly plug into your existing tools from Day One.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'Google Workspace', desc: 'Gmail, Calendar, Sheets, Docs, Drive architecture' },
                { name: 'HubSpot CRM', desc: 'Deal pipeline integrity, contact enrichment, audit logs' },
                { name: 'Zendesk Suite', desc: 'Omnichannel ticket routing, macros, SLA compliance' },
                { name: 'Calendly', desc: 'Intake qualification, timezone buffers, scheduling links' },
                { name: 'Microsoft 365 / Excel', desc: 'Advanced trackers, formulas, Teams coordination' },
                { name: 'Slack', desc: 'Executive asynchronous triage and triage channels' },
                { name: 'Loom', desc: 'Standard operating procedure (SOP) video documentation' },
                { name: 'Canva', desc: 'Presentation decks, executive briefing templates' }
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="p-5 rounded-xl border border-slate-800 bg-[#0f172a]/60 backdrop-blur-md space-y-2 hover:border-slate-700 transition-all"
                >
                  <div className="text-sm font-bold text-slate-100">{tech.name}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: DIRECT CALL TO ACTION (Frictionless Booking)
           ========================================================================= */}
        <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-[#0B0F19] to-[#070a12] relative">
          <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center space-y-8">
            <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto">
              {/* Executive Portrait Badge */}
              <div className="relative">
                <img
                  src="/assets/aistudio/em1_c6840a70.jpeg"
                  alt="Emelle Miracle"
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-blue-500 shadow-xl shadow-blue-950/60"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0B0F19] flex items-center justify-center text-[10px] text-black font-bold"
                  title="Verified Operations Lead"
                >
                  ✓
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight text-balance">
                  Ready to reclaim 15+ hours of your week?
                </h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  Let&apos;s audit your current operational bottlenecks, configure tailored triage systems,
                  and give you back the mental clarity needed to scale.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-8 py-4 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 active:scale-[0.98] cursor-pointer"
              >
                Schedule Consultation on Calendly →
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold text-slate-200 border border-slate-700 bg-slate-900/60 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copiedEmail ? 'Email Copied to Clipboard!' : 'miracleemelle5@gmail.com'}</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
              <a
                href="https://linkedin.com/in/emelle-miracle-u-e-067844417"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>Connect on LinkedIn</span>
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="mailto:miracleemelle5@gmail.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Direct Executive Email</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER with Slate Borders --- */}
      <footer className="border-t border-slate-800 bg-[#080d1a] py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} The Miracle Touch Support Co. · Operations & Executive Virtual Assistance.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Standalone HTML</span>
            </button>
            <a
              href="https://linkedin.com/in/emelle-miracle-u-e-067844417"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://calendly.com/miracleemelle5/client-consultation-"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Calendly Booking
            </a>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODAL 1: CASE STUDY DETAIL MODAL (Slate Border & Navy Accents)
         ========================================================================= */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#0f172a] p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveCaseStudy(null)}
              className="absolute top-6 right-6 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                {activeCaseStudy.category} · {activeCaseStudy.client}
              </div>
              <h3 className="text-2xl font-bold text-slate-100 tracking-tight">
                {activeCaseStudy.title}
              </h3>
            </div>

            {/* Key Metric Banner */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Primary Impact Metric</div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                  {activeCaseStudy.metric}
                </div>
                <div className="text-xs text-slate-300">{activeCaseStudy.metricLabel}</div>
              </div>
              <div className="text-right text-xs text-slate-400">
                <div>Timeframe</div>
                <div className="text-slate-200 font-semibold">{activeCaseStudy.timeframe}</div>
              </div>
            </div>

            {/* Challenge & Strategy */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 text-sm">The Challenge</h4>
                <p className="leading-relaxed text-slate-400">{activeCaseStudy.challenge}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-100 text-sm">Strategic Execution</h4>
                <div className="space-y-1.5">
                  {activeCaseStudy.strategy.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400 font-mono">0{idx + 1}.</span>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <h4 className="font-bold text-slate-100 text-sm">Verified Outcome</h4>
                <p className="leading-relaxed text-emerald-300 bg-emerald-950/30 p-3 rounded-lg border border-emerald-500/30">
                  {activeCaseStudy.outcome}
                </p>
              </div>

              {activeCaseStudy.testimonial && (
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2 italic text-xs text-slate-300">
                  <p>&ldquo;{activeCaseStudy.testimonial.quote}&rdquo;</p>
                  <div className="not-italic text-right text-slate-400">
                    <strong className="text-slate-100">{activeCaseStudy.testimonial.author}</strong> — {activeCaseStudy.testimonial.role}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Case Study
              </button>
              <button
                onClick={() => {
                  setActiveCaseStudy(null);
                  setIsBookingModalOpen(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors cursor-pointer shadow-md shadow-blue-950"
              >
                Discuss Similar Architecture →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: FRICTIONLESS BOOKING & CONSULTATION MODAL
         ========================================================================= */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0f172a] p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5">
              <img
                src="/assets/aistudio/em1_c6840a70.jpeg"
                alt="Emelle Miracle"
                className="w-13 h-13 rounded-full object-cover object-top border-2 border-blue-500 shadow-lg shadow-blue-950/50 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-0.5">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                  Direct Consultation Access
                </div>
                <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                  Schedule Time With Emelle Miracle
                </h3>
                <p className="text-xs text-slate-400">
                  Select your preferred path: instant Calendly booking or direct email.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Option 1: Calendly with Royal Navy Accent */}
              <a
                href="https://calendly.com/miracleemelle5/client-consultation-"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl border border-blue-600/40 bg-blue-950/40 hover:bg-blue-900/40 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-950">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                      Book Live on Calendly
                    </div>
                    <div className="text-xs text-slate-400">Select a time that suits your schedule instantly.</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>

              {/* Option 2: Copy Email */}
              <div
                onClick={handleCopyEmail}
                className="p-4 rounded-xl border border-slate-700/80 bg-slate-900/50 hover:bg-slate-800/60 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-100">Direct Executive Email</div>
                    <div className="text-xs text-slate-400 font-mono">miracleemelle5@gmail.com</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-blue-400">
                  {copiedEmail ? 'Copied!' : 'Copy'}
                </div>
              </div>

              {/* Option 3: LinkedIn */}
              <a
                href="https://linkedin.com/in/emelle-miracle-u-e-067844417"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl border border-slate-700/80 bg-slate-900/50 hover:bg-slate-800/60 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-100">Connect on LinkedIn</div>
                    <div className="text-xs text-slate-400">View recommendations & career background.</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            <div className="text-[11px] text-center text-slate-500 pt-2 border-t border-slate-800">
              Available for select retainer partnerships with fast-scaling founders and enterprise leaders.
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: EXPORT STANDALONE SINGLE-FILE HTML MODAL
         ========================================================================= */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-700 bg-[#0f172a] p-6 sm:p-8 space-y-5 shadow-2xl">
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Production-Ready Delivery
              </div>
              <h3 className="text-2xl font-bold text-slate-100 tracking-tight">
                Single-File Standalone HTML Bundle
              </h3>
              <p className="text-xs text-slate-400">
                Here is the clean, self-contained single-file HTML/Tailwind/Alpine.js bundle configured with the updated #0B0F19 canvas, royal navy accents, slate borders, and platinum highlights.
              </p>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 max-h-56 overflow-y-auto overflow-x-hidden">
                {generateStandaloneHTML().slice(0, 700)}
                {'\n... [Full bundle ready for clipboard]'}
              </pre>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyHTML}
                className="flex-1 py-3 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950"
              >
                {copiedHTML ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedHTML ? 'Copied HTML Code to Clipboard!' : 'Copy Full Single-File HTML'}</span>
              </button>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-3 rounded-lg text-xs font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
