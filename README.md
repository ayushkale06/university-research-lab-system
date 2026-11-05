# University Research and Laboratory Management System (URLMS)

A comprehensive, enterprise-grade Front-End web application developed in **Angular 22** for managing university-wide research projects, multi-million sponsored grants, high-end shared laboratory instrumentation, slot scheduling with algorithmic conflict detection, chemical inventory, and EHS safety compliance.

---

## 🏛️ Academic & Institutional Details

- **Institution:** Sanjivani University, Kopargaon
- **Department:** Department of Computer Science and Engineering
- **Course:** Front-End UI Design and Development (Angular)
- **Project Trainer / Guide:** Prof. Ashish Sir
- **Academic Year:** 2026–2027
- **Submission Date:** 04 November 2026
- **GitHub Repository:** [https://github.com/ayushkale06/university-research-lab-system](https://github.com/ayushkale06/university-research-lab-system)

---

## 👥 Project Team Members & Modular Division (5 Members)

| Sr. No. | Team Member Name | Permanent Roll No. | Assigned Primary Module | Core Technical Deliverables & Viva Defense Points |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Rohit Subhash Bhosale** | `2124UCEF1041` | **Module 1: Authentication, Role-Based Access Control (RBAC) & User Management** | • Institutional login interface with responsive split-screen branding.<br>• Session authentication lifecycle & functional route security via `authGuard`.<br>• Dynamic Role-Based Access Control (`ADMIN`, `PI`, `SCHOLAR`, `TECHNICIAN`).<br>• Integrated **1-Click Viva Demo Persona Switcher**.<br>• Faculty & Scholar user management directory (`UserListComponent`). |
| **2** | **Sandesh Prashant Tadkase** | `2124UCEF1042` | **Module 2: Central Analytics & Executive Dashboard** | • Multi-role executive dashboard with adaptive greetings (`DashboardComponent`).<br>• High-level KPI summary cards (Grant Capital, Instruments, Slots, Alerts).<br>• Real-time progress bars visualizing grant budget utilization percentages.<br>• High-end instrumentation operational availability matrix.<br>• Central notification drawer for low stock and pending reservation alerts. |
| **3** | **Vaibhav Satteshwar Dake** | `2124UCEF1043` | **Module 3: Research Projects, Grants & Publications Repository** | • Research project proposal submission and review lifecycle (`ProjectListComponent`).<br>• Interactive **Milestone Deliverables Tracker** with live progress recalculations.<br>• Sponsored research grants management (Sanctioned vs Disbursed vs Utilized).<br>• Institutional publications repository with DOI references and citation metrics (`PublicationsComponent`). |
| **4** | **Sujit Ravindra More** | `2124UCEF1044` | **Module 4: Laboratory Facilities & Equipment Booking Engine** | • University facilities directory with Biosafety containment levels (BSL-1 to BSL-3).<br>• Shared instrumentation catalog (FE-SEM, Mass Spectrometers, Supercomputers).<br>• **Real-Time Booking Conflict Detection Engine** that blocks overlapping slots.<br>• Multi-tab reservation management (*All, Pending, My Bookings*) with technician approvals.<br>• Preventative maintenance and calibration logbook (`MaintenanceLogsComponent`). |
| **5** | **Ayush Kishor Kale** | `2124UCEF1045` | **Module 5: Consumables Inventory, Chemical Safety & EHS Audits** | • Reagent, chemical, and glassware inventory with OSHA hazard classifications.<br>• Automated **Low-Stock Alert Engine** using Angular `computed` signals.<br>• Non-negative stock deduction and addition controls (`InventoryService`).<br>• Multi-tier material procurement requisitions with cost estimation.<br>• Environmental Health & Safety (EHS) audit checklists, compliance scoring, and remediation logs. |

---

## 🛠️ Technology Stack

- **Framework:** Angular 22 (Standalone Components, Signals, Reactive Forms, Router)
- **Language:** TypeScript 5.8+
- **Styling:** Bootstrap 5.3 + Bootstrap Icons + Custom CSS Design System
- **State Management & Data Layer:** Angular Signals + RxJS + `localStorage` client-side reactive store
- **Testing:** Vitest + Angular Testing Library (100% Pass Status)
- **Runtime & Tools:** Node.js v24.x, NPM v12.x, Angular CLI v22.2.4

---

## 🚀 Getting Started & Execution Instructions

### Prerequisites
- **Node.js**: v18.x, v20.x, or v24.x
- **NPM**: v9.x or higher

### Installation & Run Steps

1. **Clone or navigate to the project directory:**
   ```bash
   git clone https://github.com/ayushkale06/university-research-lab-system.git
   cd university-research-lab-system
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm start
   # or: ng serve
   ```

4. **Access the application:**
   Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

5. **Run the Automated Unit Test Suite:**
   ```bash
   npm test -- --watch=false
   ```
   *Result:* 3 test suites passed, 8 tests passed (covering conflict detection, inventory thresholds, and root application setup).

6. **Build for Production Deployment:**
   ```bash
   npm run build
   ```
   *Result:* Production bundles generated in `dist/university-research-lab-system` in ~6.9 seconds with zero compiler errors.

---

## 🎭 Live Viva Demo Personas (1-Click Switcher)

For presentations and viva evaluations, use the **1-Click Demo Buttons** on the Login page or the **Role Switcher Dropdown** in the top navigation bar to test all access tiers instantly without typing credentials:

1. **Administrator (Dean of Research — Dr. Arthur Vance):**
   - *Role:* `ADMIN`
   - *Capabilities:* Full system oversight, budget tracking, user onboarding, and approval overrides.
2. **Principal Investigator (PI — Dr. Elena Sharma):**
   - *Role:* `PI`
   - *Capabilities:* Submit research proposals, manage milestones, requisition lab supplies, and review scholar bookings.
3. **Research Scholar (PhD Fellow — Priya Nair):**
   - *Role:* `SCHOLAR`
   - *Capabilities:* Reserve microscope/spectrometer slots, update milestone completion, and log chemical consumption.
4. **Laboratory Technician (Lead Technical Officer — Rajesh Kumar):**
   - *Role:* `TECHNICIAN`
   - *Capabilities:* Clear pending instrument reservations, log calibration and maintenance repairs, and conduct EHS safety audits.

---

## 📂 Project Structure

```
university-research-lab-system/
├── public/
│   └── favicon.ico
├── docs/
│   └── PROJECT_REPORT.md             <-- Full Sanjivani University Main Project Report
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts     <-- Route security
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── project.model.ts
│   │   │   │   ├── laboratory.model.ts
│   │   │   │   └── inventory.model.ts
│   │   │   └── services/
│   │   │       ├── auth.service.ts
│   │   │       ├── project.service.ts
│   │   │       ├── laboratory.service.ts
│   │   │       ├── inventory.service.ts
│   │   │       └── mock-data.ts
│   │   ├── features/
│   │   │   ├── auth/login/           <-- Module 1: Auth & Viva Demo Switcher
│   │   │   ├── dashboard/            <-- Module 2: Analytics & KPI Cards
│   │   │   ├── users/user-list/      <-- Module 1: Faculty/Scholar Directory
│   │   │   ├── projects/             <-- Module 3: Projects, Grants & Pubs
│   │   │   ├── labs/                 <-- Module 4: Facilities, Equipment & Conflict Scheduler
│   │   │   └── inventory/            <-- Module 5: Inventory, Requisitions & EHS Audits
│   │   ├── shared/components/
│   │   │   ├── navbar/
│   │   │   ├── sidebar/
│   │   │   └── layout/
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   └── app.html
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── README.md
```

---

## 📜 Full Documentation
The comprehensive academic project report is available in [`docs/PROJECT_REPORT.md`](docs/PROJECT_REPORT.md) formatted according to Sanjivani University standards covering:
- Cover Page, Certificate, Declaration, Acknowledgement, Abstract
- Chapters 1 to 17 with Architecture, Workflow, Use Case & Component Diagrams
- Testing tables (TC-01 through TC-12)
- Individual 5-Member Contribution Reports
