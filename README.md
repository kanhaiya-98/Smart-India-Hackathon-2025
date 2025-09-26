<div align="center">

<img src="https://img.shields.io/badge/Smart%20India%20Hackathon-2025-orange?style=for-the-badge&logo=india&logoColor=white" />
<img src="https://img.shields.io/badge/Internal%20Round-🏆%20Winner-gold?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-🚧%20Active%20Development-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Built%20With-React%20%2B%20TypeScript-61DAFB?style=for-the-badge&logo=react" />

<br /><br />

<h1>🏛️ Civic Pulse — Admin Panel</h1>
<h3><i>Bridging the gap between citizens and administration through transparency, speed, and intelligence.</i></h3>

<br />

> **"A city's pulse is measured not by its skyline, but by how swiftly it responds to its people."**

</div>

---
## 🏆 Recognition

> 🥇 **Internal Round Winner — Smart India Hackathon 2025**
> Awarded at our institution for robust architecture, user-centric design, and seamless issue-tracking workflow.

The project stood out for its **clean separation of concerns**, scalable component design, and a dashboard that genuinely simplifies the cognitive load on administrators who manage hundreds of complaints daily.

---

## 📖 The Story Behind Civic Pulse

Picture this: A pothole appears on a busy street in Ranchi. A resident notices it, maybe even photographs it — but has no idea where to report it. They visit the municipal office, fill out a form, and wait. Weeks pass. The pothole grows. Nothing happens.

This isn't a story unique to one city. It plays out every single day across **hundreds of Indian towns and cities** — a silent, systemic failure between those who identify problems and those who have the power to fix them.

When our team sat down to brainstorm for **Smart India Hackathon 2025**, this was the reality we refused to accept.

We didn't just want to build an app. We wanted to build a **nervous system** for civic governance — one that feels every complaint like a nerve ending, routes it to the right authority like a synapse firing, and resolves it with the efficiency of a body that actually cares.

**Civic Pulse** was born from that conviction.

---

## 🏁 Official Problem Statement

<table>
<tr>
<td><b>PS ID</b></td>
<td><code>SIH25031</code></td>
</tr>
<tr>
<td><b>Title</b></td>
<td>Crowdsourced Civic Issue Reporting and Resolution System</td>
</tr>
<tr>
<td><b>Organization</b></td>
<td>Government of Jharkhand</td>
</tr>
<tr>
<td><b>Category</b></td>
<td>Software</td>
</tr>
<tr>
<td><b>Theme</b></td>
<td>Clean & Green Technology</td>
</tr>
<tr>
<td><b>Edition</b></td>
<td>Smart India Hackathon 2025</td>
</tr>
</table>

### 📋 Problem Description

> Urban and rural areas across India face frequent civic issues — potholes, waste mismanagement, drainage blockages, streetlight failures — which often go **unresolved for extended periods** due to delayed reporting and poor inter-departmental coordination.
>
> Traditional grievance systems lack transparency and proper communication between citizens and authorities. There is a critical need for a **scalable, intelligent platform** that enables citizens to report issues instantly, automates issue classification, routes complaints to the correct department, and provides real-time tracking for both citizens and municipal officials.
>
> The expected solution should bridge the gap between public complaints and government action using **cloud computing, mobile technology, and machine learning** — transforming reactive governance into proactive, data-driven administration.

---

## 🎯 Our Vision

We envision a future where:

- A resident can report a broken streetlight in **under 60 seconds**, from their phone.
- The right department receives it **automatically**, without bureaucratic telephone tag.
- The complaint is tracked, resolved, and **verified with photo evidence**.
- The entire cycle — report to resolution — happens in **days, not months**.
- Municipal administrators make decisions backed by **real data**, not gut feelings.

**Civic Pulse** is our step toward making that future the present.

---

## 📑 Table of Contents

- [The Story](#-the-story-behind-civic-pulse)
- [Problem Statement](#-official-problem-statement)
- [Our Vision](#-our-vision)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Current Development Status](#-current-development-status)
- [Future Roadmap](#-future-roadmap)
- [Author](#-author)

---

## 🔍 Overview

Managing civic infrastructure requires rapid data processing, clear communication channels, and a command center that gives administrators a **full-picture view** — not fragments spread across spreadsheets and WhatsApp messages.

**Civic Pulse Admin Panel** is the administrative backbone of the full Civic Pulse ecosystem. It is the place where civic chaos is transformed into coordinated action.

Built for **municipal officials and department heads**, this panel lets administrators:

- 📊 **Visualize** real-time trends in city-wide issue reports
- 🗂️ **Filter and manage** complaints by department, priority, and resolution status
- 👆 **Accept, assign, forward, or reject** complaints with a single action
- 🔍 **Deep-dive** into individual reports with photo evidence and citizen descriptions
- 📈 **Track resolution velocity** across departments over time

This is not just a dashboard. It's a **command center for better governance**.

---

## 🚀 Key Features

### 📊 Intelligent Dashboard

- **Real-time Analytics** — Live visual breakdown of complaints by category, urgency, and department load.
- **Priority Heatmap** — At a glance, administrators know exactly what's on fire.
- **Resolution Velocity Metrics** — Track how fast each department closes tickets. Accountability built-in.
- **Geo-Tagging Support** *(Planned)* — See issues pinned on an interactive city map for logistics-aware assignment.

### 🛠️ Advanced Issue Management

- **Granular Filtering** — Sort and search by `Department`, `Priority (High / Medium / Low)`, `Status (Pending / In-Progress / Resolved)`, and date range.
- **One-Click Actions** — Accept, Reject, Forward, or Escalate — no multi-step forms, no wasted time.
- **Detailed Complaint View** — Full issue breakdown with submitted images, descriptions, geotag data, and citizen metadata.
- **Audit Trail** — Every action on a complaint is logged. Full accountability, always.

### ⚡ Optimized for Real Workflows

- **Responsive Design** — Fully functional on tablets and desktops. Built for officers in the field as much as those at a desk.
- **Type Safety** — Built with TypeScript. Fewer bugs, predictable behavior, maintainable at scale.
- **Component-Based UI** — Reusable, modular components that make the codebase easy to extend as requirements evolve.

---

## 🏗️ System Architecture

The architecture follows a **three-layer component-based model**, ensuring clean separation between what the user sees, how data is processed, and where it lives.

```
┌─────────────────────────────────────────────────┐
│             PRESENTATION LAYER                  │
│      React + Tailwind CSS (UI Components)       │
│   Dashboard · Issues · Departments · Reports    │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│               LOGIC LAYER                       │
│   Custom Hooks · Utility Functions · Filters    │
│     State Management · Data Transformations     │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│               DATA LAYER                        │
│    API Services · Backend Integration           │
│   REST Calls · Response Normalization           │
└─────────────────────────────────────────────────┘
```

**Design Principles:**

- **Modularity** — Every component can be developed, tested, and updated independently.
- **Scalability** — The architecture can absorb new features without re-engineering the core.
- **Separation of Concerns** — UI logic, business logic, and data fetching never bleed into each other.

---

## 💻 Tech Stack

| Component | Technology | Why We Chose It |
|---|---|---|
| **Framework** | React (Vite) | Lightning-fast HMR, optimized builds, modern DX |
| **Language** | TypeScript | Type safety, scalable code, fewer production bugs |
| **Styling** | Tailwind CSS | Utility-first, consistent design system, rapid UI iteration |
| **Icons** | Lucide React / Heroicons | Modern, lightweight, accessible iconography |
| **State Management** | React Hooks | Efficient local state without external library overhead |
| **Build Tool** | Vite | Sub-second dev server startup, optimized production bundles |

---

## 📂 Folder Structure

We follow a clean, modular structure that makes the project easy to navigate whether you're a first-time contributor or a seasoned team member.

```plaintext
SIH-PROJECT/
├── public/                   # Static assets (favicons, manifest, meta)
├── src/
│   ├── assets/               # Images, SVGs, global stylesheets
│   ├── components/           # Reusable UI components
│   │   ├── Buttons/          #   → Action buttons (Accept, Reject, Forward)
│   │   ├── Cards/            #   → Summary cards for dashboard metrics
│   │   ├── Modals/           #   → Complaint detail & confirmation modals
│   │   └── Tables/           #   → Issue listing with sorting & filtering
│   ├── layout/               # Layout wrappers
│   │   ├── Sidebar.tsx       #   → Navigation sidebar
│   │   └── Navbar.tsx        #   → Top navigation bar
│   ├── pages/                # Route-level views
│   │   ├── Dashboard.tsx     #   → Overview analytics
│   │   ├── Issues.tsx        #   → Issue management table
│   │   └── Settings.tsx      #   → Admin configuration
│   ├── types/                # TypeScript interfaces and type definitions
│   │   └── issue.types.ts    #   → Complaint, Status, Priority interfaces
│   ├── utils/                # Helper functions, constants, formatters
│   ├── App.tsx               # Root application component & routing
│   └── main.tsx              # ReactDOM rendering entry point
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started

Set up the development environment on your local machine in under 5 minutes.

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18+ — [Download here](https://nodejs.org/)
- **npm** — Comes bundled with Node.js
- **Git** — [Download here](https://git-scm.com/)

### Installation

**Step 1 — Clone the repository**

```bash
git clone https://github.com/kanhaiya-98/SIH-PROJECT.git
```

**Step 2 — Navigate into the project directory**

```bash
cd SIH-PROJECT
```

**Step 3 — Install dependencies**

> ⚠️ **Important:** This project uses specific package versions that may conflict with newer npm peer dependency resolution. Always use the `--legacy-peer-deps` flag.

```bash
npm install --legacy-peer-deps
```

**Step 4 — Start the development server**

```bash
npm run dev
```

Open your browser and visit `http://localhost:5173/` (or the port shown in your terminal).

---

## 🚧 Current Development Status

> **Active Development — Work in Progress**

Civic Pulse is not a finished product — it's a living project, actively being built and improved. Here's where things stand right now:

| Module | Status |
|---|---|
| Dashboard UI & Analytics | ✅ Complete |
| Issue Listing & Filtering | ✅ Complete |
| Complaint Detail View | ✅ Complete |
| One-Click Action Buttons | ✅ Complete |
| Backend API Integration | 🔄 In Progress |
| Authentication & Session Management | 🔄 In Progress |
| Geo-Tagging & Map View | 🔜 Planned |
| AI-Powered Auto-Categorization | 🔜 Planned |
| Role-Based Access Control | 🔜 Planned |
| Dark Mode | 🔜 Planned |
| PDF / CSV Export | 🔜 Planned |

We are actively working toward a fully integrated, production-ready system in time for the **SIH 2025 National Rounds**.

---

## 🔮 Future Roadmap

As we progress toward the National Rounds of SIH 2025 and beyond, here is what's coming:

- [ ] **🤖 AI-Powered Categorization** — NLP model to auto-classify complaint type (Sanitation / Roads / Electrical) based on description text, eliminating manual tagging.
- [ ] **🗺️ Interactive Geo-Map** — Visualize all active complaints as live pins on a city map. Click any pin to view issue details and assign teams.
- [ ] **🔐 Role-Based Access Control (RBAC)** — Distinct views and permissions for Super Admins, Department Heads, and Field Officers.
- [ ] **🌙 Dark Mode** — System-wide dark mode with user preference persistence.
- [ ] **📄 Export Reports** — Generate PDF and CSV reports for official auditing, departmental performance reviews, and government submissions.
- [ ] **🔔 Real-Time Notifications** — WebSocket-powered push alerts when new high-priority complaints are filed.
- [ ] **📱 Citizen-Facing Mobile App** — The companion app through which citizens submit reports, track status, and receive resolution confirmations.
- [ ] **📊 Predictive Analytics** — Use historical data to flag recurring hotspots and predict maintenance needs before they become crises.

---

## 👨‍💻 Author

**Kanhayya Gupta**
*AI Developer & System Architect*

Focused on building production-grade, scalable, and logically structured systems that solve real problems for real people.

[![GitHub](https://img.shields.io/badge/GitHub-kanhaiya--98-black?style=flat-square&logo=github)](https://github.com/kanhaiya-98)

---

<div align="center">

**Civic Pulse** is more than a hackathon project. It's a statement that students can build solutions worthy of the problems India faces.

*Made with ❤️ for a better India — one resolved complaint at a time.*

<br />

<img src="https://img.shields.io/badge/SIH%202025-PS%20SIH25031-orange?style=flat-square" />
<img src="https://img.shields.io/badge/Government%20of%20Jharkhand-Civic%20Tech-green?style=flat-square" />
<img src="https://img.shields.io/badge/Theme-Clean%20%26%20Green%20Technology-brightgreen?style=flat-square" />

</div>