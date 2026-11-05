# University Research and Laboratory Management System (URLMS)

A comprehensive, enterprise-grade Front-End web application developed in **Angular 22** for managing university-wide research projects, multi-million sponsored grants, high-end shared laboratory instrumentation, slot scheduling with conflict detection, chemical inventory, and EHS safety compliance.

---

## 🏛️ Project Highlights & 4-Member Module Division

| Member | Module Name | Responsibilities & Viva Key Defense Points |
| :--- | :--- | :--- |
| **Member 1** | **Authentication, Role-Based Access Control (RBAC) & Central Executive Dashboard** | • JWT authentication session lifecycle, routing guards (`authGuard`).<br>• Dynamic Role-Based Access Control (`ADMIN`, `PI`, `SCHOLAR`, `TECHNICIAN`).<br>• Real-time analytics dashboard with reactive KPI counters, grant expenditure progress, and system notifications.<br>• Faculty & Scholar registry management. |
| **Member 2** | **Research Projects, Grants & Publications Management** | • Research proposal submission, review & approval lifecycle.<br>• Milestone deliverables tracking with interactive progress bars.<br>• Sponsoring agency grant tracking (Sanctioned vs Disbursed vs Utilized).<br>• Indexed publications repository with DOI references and citation metrics. |
| **Member 3** | **Laboratory Facilities & High-End Equipment Booking / Scheduling** | • Research lab facilities directory with Biosafety Containment levels (BSL-1 to BSL-3).<br>• High-end instrumentation catalog (FE-SEM, Mass Spectrometers, Supercomputers).<br>• Intelligent slot reservation engine with **real-time conflict detection** preventing overlapping bookings.<br>• Technician clearance workflow and equipment calibration / maintenance logs. |
| **Member 4** | **Consumables Inventory, Chemical Safety & EHS Audit Compliance** | • Reagent, chemical, and glassware inventory with automated low-stock warnings.<br>• Hazardous material classification (Flammable, Corrosive, Toxic, Biohazard).<br>• Multi-tier purchase requisition workflow with cost estimation.<br>• Environmental Health & Safety (EHS) audit checklists, compliance scoring, and eyewash/fumehood inspections. |

---

## 🛠️ Technology Stack

- **Framework:** Angular 22 (Standalone Components, Signals, Reactive Forms, Router)
- **Language:** TypeScript 5.8+
- **Styling:** Bootstrap 5.3 + Bootstrap Icons + Custom CSS Design System
- **State Management & Data Layer:** Angular Signals + RxJS + `localStorage` persistence
- **Testing:** Vitest + Angular Testing Library

---

## 🚀 Getting Started & Execution Instructions

### Prerequisites
- **Node.js**: v18.x, v20.x, or v24.x
- **NPM**: v9.x or higher

### Installation & Run Steps

1. **Navigate to the project root:**
   ```bash
   cd university-research-lab-system
   ```

2. **Install project dependencies (if not already installed):**
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

5. **Run the Automated Test Suite:**
   ```bash
   npm test -- --watch=false
   ```

6. **Build for Production Deployment:**
   ```bash
   npm run build
   ```
   The compiled production bundles will be generated in `dist/university-research-lab-system`.

---

## 🎭 Live Viva Demo Personas (1-Click Switcher)

For presentations and viva evaluations, use the **1-Click Demo Buttons** on the Login page or the **Role Switcher** in the top navigation bar to instantly test all access tiers without re-typing credentials:

1. **Administrator (Dean of Research):**
   - *Account:* `dean.research@university.edu` / `password123`
   - *Capabilities:* Full system oversight, budget tracking, user administration, approval privileges.
2. **Principal Investigator (PI):**
   - *Account:* `elena.sharma@university.edu` / `password123`
   - *Capabilities:* Submit research proposals, manage milestones, requisition lab supplies, review scholar bookings.
3. **Research Scholar (PhD Fellow):**
   - *Account:* `priya.nair@university.edu` / `password123`
   - *Capabilities:* Reserve microscope/spectrometer slots, update milestone completion, log chemical consumption.
4. **Laboratory Technician:**
   - *Account:* `rajesh.kumar@university.edu` / `password123`
   - *Capabilities:* Clear pending instrument reservations, log calibration and maintenance repairs, perform EHS safety audits.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   ├── project.model.ts
│   │   │   ├── laboratory.model.ts
│   │   │   └── inventory.model.ts
│   │   └── services/
│   │       ├── auth.service.ts
│   │       ├── project.service.ts
│   │       ├── laboratory.service.ts
│   │       ├── inventory.service.ts
│   │       └── mock-data.ts
│   ├── features/
│   │   ├── auth/login/
│   │   ├── dashboard/
│   │   ├── users/user-list/
│   │   ├── projects/
│   │   │   ├── project-list/
│   │   │   ├── grants/
│   │   │   └── publications/
│   │   ├── labs/
│   │   │   ├── lab-list/
│   │   │   ├── equipment-catalog/
│   │   │   ├── bookings/
│   │   │   └── maintenance/
│   │   └── inventory/
│   │       ├── inventory-list/
│   │       ├── requisitions/
│   │       └── safety-audits/
│   ├── shared/
│   │   └── components/
│   │       ├── navbar/
│   │       ├── sidebar/
│   │       └── layout/
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.ts
│   ├── app.html
│   └── styles.css
└── index.html
```

---

## 📜 Compliance & Main Project Guidelines
This codebase strictly fulfills all criteria defined in the *Angular Main Project Report Guidelines*:
- Independent modular division across 4 team members.
- Robust, real working application with client-side reactive persistence.
- Verified test suites with 100% pass status.
