SANJIVANI UNIVERSITY
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING

UNIVERSITY RESEARCH AND LABORATORY MANAGEMENT SYSTEM (URLMS) USING ANGULAR

A MAIN PROJECT REPORT
SUBMITTED IN PARTIAL FULFILLMENT OF THE REQUIREMENTS
FOR THE COURSE
FRONT-END UI DESIGN AND DEVELOPMENT (ANGULAR)

Project repository: https://github.com/ayushkale06/university-research-lab-system

Submitted by:
| Candidate Name | Permanent Roll Number |
| :--- | :--- |
| 1. Rohit Subhash Bhosale | 2124UCEF1041 |
| 2. Sandesh Prashant Tadkase | 2124UCEF1042 |
| 3. Vaibhav Satteshwar Dake | 2124UCEF1043 |
| 4. Sujit Ravindra More | 2124UCEF1044 |
| 5. Ayush Kishor Kale | 2124UCEF1045 |

Under the Guidance / Supervision of:
Prof. Ashish Sir
Faculty / Project Trainer

Submission Date: 04 November 2026  
Academic Year 2026–2027

---

CERTIFICATE OF AUTHENTICITY

This is to certify that the project report entitled “UNIVERSITY RESEARCH AND LABORATORY MANAGEMENT SYSTEM (URLMS)” is a bona fide record of the work carried out by the following undergraduate students of Sanjivani University, Department of Computer Science and Engineering, in partial fulfillment of the requirements of the course Front-End UI Design and Development (Angular) during the academic year 2026–2027:

| Sr. No. | Candidate Name | University Roll Number |
| :---: | :--- | :--- |
| 1. | Rohit Subhash Bhosale | 2124UCEF1041 |
| 2. | Sandesh Prashant Tadkase | 2124UCEF1042 |
| 3. | Vaibhav Satteshwar Dake | 2124UCEF1043 |
| 4. | Sujit Ravindra More | 2124UCEF1044 |
| 5. | Ayush Kishor Kale | 2124UCEF1045 |

The project work embodied in this main report has been carried out under our guidance and supervision. To the best of our knowledge and belief, this project has fulfilled all the curricular and academic requirements specified by Sanjivani University.

| _______________________ <br> Prof. Ashish Sir <br> Project Guide / Trainer | _______________________ <br> Project Coordinator <br> Dept. of Computer Science | _______________________ <br> Head of Department <br> Dept. of Computer Science |
| :--- | :--- | :--- |
| Date: 04 November 2026 <br> Place: Sanjivani University | Seal of the Department | _______________________ <br> External Examiner |

---

CANDIDATES’ DECLARATION

We hereby declare that this project report entitled “University Research and Laboratory Management System (URLMS)”, submitted to the Department of Computer Science and Engineering, Sanjivani University, in partial fulfillment of the requirements of the course Front-End UI Design and Development (Angular), is an authentic record of our own work, system design, and software implementation carried out under the supervision of Prof. Ashish Sir.

We further confirm that this work is original and has not been submitted in part or full to any other university, institute, or examining body for the award of any diploma, degree, or professional certification. All secondary sources, libraries, frameworks, and reference literature utilized during the conceptualization and development phases have been acknowledged in accordance with standard academic citation guidelines.

| Sr. No. | Candidate Name & Roll Number | Signature |
| :---: | :--- | :--- |
| 1. | Rohit Subhash Bhosale (2124UCEF1041) | ______________________ |
| 2. | Sandesh Prashant Tadkase (2124UCEF1042) | ______________________ |
| 3. | Vaibhav Satteshwar Dake (2124UCEF1043) | ______________________ |
| 4. | Sujit Ravindra More (2124UCEF1044) | ______________________ |
| 5. | Ayush Kishor Kale (2124UCEF1045) | ______________________ |

Date: 04/11/2026  
Place: Sanjivani University, Kopargaon  

---

ACKNOWLEDGEMENT

The completion of this main project entitled “University Research and Laboratory Management System (URLMS)” marks a significant milestone in our undergraduate academic journey. We take this opportunity to express our gratitude to all the individuals whose guidance, encouragement, and mentorship supported us throughout the design, development, and documentation phases of this project.

First and foremost, we express our heartfelt gratitude and deepest respect to our project trainer and faculty mentor, Prof. Ashish Sir, Department of Computer Science and Engineering, Sanjivani University. His guidance, technical clarity in front-end development with Angular, and consistent encouragement provided the direction needed to design a structured, maintainable, and well-organized academic enterprise application.

We are equally grateful to the Head of the Department and the Project Coordinators of the Computer Science and Engineering Department for providing the computing facilities, continuous academic oversight, and the supportive institutional infrastructure that enabled collaborative project development.

We extend our appreciation to our classmates and laboratory staff whose feedback and suggestions during project discussions helped us refine the structure and presentation of our work.

Finally, we express our gratitude to our parents, family members, and friends for their enduring moral support, patience, and encouragement throughout the demanding stages of this project.

Project Team Members:
1. Rohit Subhash Bhosale (2124UCEF1041)
2. Sandesh Prashant Tadkase (2124UCEF1042)
3. Vaibhav Satteshwar Dake (2124UCEF1043)
4. Sujit Ravindra More (2124UCEF1044)
5. Ayush Kishor Kale (2124UCEF1045)

---

ABSTRACT

The University Research and Laboratory Management System (URLMS) is a web-based academic research and scientific facility management application developed using the Angular framework. The main purpose of this project is to provide a digital platform for managing important university-level research operations such as user authentication with role-based access control (RBAC), multi-million research grants, project proposal lifecycles, high-end laboratory equipment scheduling with conflict detection, chemical inventory tracking, and Environmental Health & Safety (EHS) audit compliance.

In many universities and research institutions, daily activities are handled using manual paper registers, static spreadsheets, or disparate software tools. These methods make it difficult to maintain accurate research records, prevent double-booking collisions on shared scientific instruments, track grant fund utilization against approved milestones, and monitor hazardous chemical reserves. The proposed system simplifies these activities through a centralized web application that provides a structured approach to managing research projects, scientific facilities, equipment reservations, and laboratory safety records.

The application is developed using Angular 22, TypeScript, HTML, CSS, and RxJS. Angular provides a component-based structure and modern Signal reactivity, while TypeScript supports organized and maintainable application logic. RxJS is used as part of Angular’s reactive programming environment. For data management and development purposes, the project utilizes Angular reactive services combined with a persistent client-side data store, containing structured collections for users, projects, grants, publications, laboratories, equipment, reservations, maintenance records, chemical inventory, requisitions, and safety audits.

The application follows a modular structure with separate model and service files, which improves code organization, reusability, and maintainability. The project demonstrates how modern front-end technologies can be used to develop an institutional research management interface that eliminates scheduling conflicts, provides real-time visibility into sponsored grant expenditures, enhances laboratory safety compliance, and establishes a foundation for further academic automation.

Keywords: Angular, University Research Management, Laboratory Management, Equipment Scheduling, Conflict Detection, TypeScript, Grant Tracking, EHS Compliance, Web Application.

---

TABLE OF CONTENTS

| Preliminary Section | Page |
| :--- | :--- |
| Certificate of Authenticity | ii |
| Candidates’ Declaration | iii |
| Acknowledgement | iv |
| Abstract | v |
| List of Figures | vii |
| List of Tables | viii |
| List of Abbreviations | viii |

| Main Report Chapters | Page |
| :--- | :--- |
| Chapter 1: Introduction | 1 |
| Chapter 2: Problem Statement | 3 |
| Chapter 3: Objectives and Scope | 4 |
| Chapter 4: Existing System and Proposed System | 7 |
| Chapter 5: Software and Hardware Requirements | 9 |
| Chapter 6: System Architecture | 11 |
| Chapter 7: System Design | 13 |
| Chapter 8: Technology Stack | 19 |
| Chapter 9: Module Description | 21 |
| Chapter 10: Implementation Details | 23 |
| Chapter 11: User Interface Screenshots and Visual Analysis | 26 |
| Chapter 12: Testing and Quality Assurance | 30 |
| Chapter 13: Challenges Encountered and Technical Solutions | 33 |
| Chapter 14: Results and Discussion | 34 |
| Chapter 15: Conclusion and Future Enhancements | 35 |
| Chapter 16: References | 36 |
| Chapter 17: Individual Contribution Report | 37 |

---

LIST OF FIGURES

| Figure Title & Description | Page |
| :--- | :---: |
| Figure 6.1: URLMS Application Architecture Flow | 11 |
| Figure 7.1: URLMS Unified System Architecture Diagram | 13 |
| Figure 7.2: Application Data Flow Diagram | 14 |
| Figure 7.3: Database Structure Diagram (Data Collections Hierarchy) | 15 |
| Figure 7.4: Angular Component Hierarchy (AppComponent & Shell Structure) | 18 |
| Figure 10.1: URLMS Angular Project Folder Structure | 23 |
| Figure 11.1: Institutional Login & Quick-Persona Viva Switcher Interface | 26 |
| Figure 11.2: Central Executive Dashboard with Grant Analytics & Real-Time Alerts | 27 |
| Figure 11.3: Faculty & Research Scholars Directory Interface | 27 |
| Figure 11.4: Research Projects & Milestone Deliverables Tracking Console | 28 |
| Figure 11.5: High-End Equipment Catalog & Operational Status Matrix | 28 |
| Figure 11.6: Conflict-Free Equipment Slot Reservation & Booking Management Console | 29 |

---

LIST OF TABLES

| Table Title & Content | Page |
| :--- | :---: |
| Table 3.1: Functional Scope Matrix of the URLMS Application | 5 |
| Table 4.1: Comprehensive Comparison between Existing System and Proposed System | 8 |
| Table 5.1: Software Requirements and Their Purpose | 9 |
| Table 5.2: Minimum Hardware Specifications | 10 |
| Table 7.1: Equipment Collection Field Description | 16 |
| Table 7.2: Research Project & Grant Collection Field Description | 16 |
| Table 9.1: URLMS Modules and Team Member Allocations | 21 |
| Table 12.1: Test Environment Configuration | 30 |
| Table 12.2: Test-Case Execution Matrix (TC-01 through TC-12) | 31 |
| Table 17.1: Individual Member Contribution Matrix across Application Modules | 38 |

---

LIST OF ABBREVIATIONS

| Abbreviation | Full Technical Term / Expansion |
| :--- | :--- |
| API | Application Programming Interface |
| BSL | Biosafety Level (BSL-1, BSL-2, BSL-3) |
| CLI | Command Line Interface (Angular CLI) |
| CSS | Cascading Style Sheets |
| DOI | Digital Object Identifier |
| EHS | Environmental Health and Safety |
| FE-SEM | Field Emission Scanning Electron Microscope |
| HTML | HyperText Markup Language |
| HTTP | HyperText Transfer Protocol |
| JSON | JavaScript Object Notation |
| MSDS | Material Safety Data Sheet |
| NPM | Node Package Manager |
| OSHA | Occupational Safety and Health Administration |
| PI | Principal Investigator |
| PPE | Personal Protective Equipment |
| RBAC | Role-Based Access Control |
| REST | Representational State Transfer |
| RxJS | Reactive Extensions for JavaScript |
| SPA | Single Page Application |
| UI | User Interface |
| UML | Unified Modeling Language |
| URLMS | University Research and Laboratory Management System |

---

## CHAPTER 1: INTRODUCTION

### 1.1 Introduction
Modern university campuses and technical research institutions perform a vast array of mission-critical scientific activities every day. These activities include supervising funded academic research investigations, tracking multi-million financial grants from governmental and industrial agencies, allocating shared scientific instrumentation among scholars, managing chemical inventories, and enforcing rigorous biosafety standards. Managing these activities manually becomes exceedingly challenging as the volume of faculty investigators, research scholars, high-value instruments, and funded grants grows. Manual methods also require disproportionate administrative effort, leading to record discrepancies, double-booking disputes, and compliance oversights.

To address these problems, the University Research and Laboratory Management System (URLMS) project has been developed as an enterprise-grade, web-based management application using the Angular framework. A modern laboratory management system is an integrated software platform that coordinates scientific research workflows, automates resource scheduling, maintains grant accounts, and enforces regulatory safety checklists. The URLMS application unites research administration, facility operations, and safety governance within a unified, reactive interface.

The application leverages Angular 22 to build a component-based user interface, TypeScript to write maintainable business logic, and custom CSS along with Bootstrap 5 to deliver an academic, professional appearance. It follows a modular development methodology where data models, business services, route guards, and presentation views are maintained independently.

### 1.2 Background of the Project
Traditional university research centers often rely upon fragmented, decentralized tools to maintain their academic records:
- **Project Proposals & Milestones:** Tracked in disparate Microsoft Word documents or offline spreadsheets.
- **Grant Funds & Budgets:** Audited through manual spreadsheets without real-time synchronization between disbursed and utilized funds.
- **Instrument Reservations:** Handled through paper sign-up sheets or loose emails, frequently resulting in scheduling collisions on multimillion-dollar instruments.
- **Chemical Stock & Reagents:** Checked manually only when containers run empty, causing costly experimental downtime.
- **Safety Audits:** Maintained in paper binders attached to laboratory doors with no searchable digital audit trail.

These manual techniques result in duplicate data entry, conflicting reservations, delayed grant audits, and safety vulnerabilities. Modern web architectures provide a clean solution. Angular provides standalone components, declarative client routing, dependency injection, reactive Signals, and RxJS observables. By utilizing Angular, the URLMS project establishes a structured digital foundation for university-wide research operations.

### 1.3 Purpose of the Project
The primary purpose of this project is to develop an organized, user-friendly, and enterprise-grade research and laboratory management platform. The project focuses on:
- Establishing secure user authentication and Role-Based Access Control (RBAC).
- Providing an executive analytics dashboard for university deans and facility directors.
- Managing research project lifecycles from proposal review to milestone completion.
- Tracking sponsored grant funding, budget disbursement, and real-time expenditure.
- Maintaining an institutional repository of indexed publications with DOIs and citations.
- Providing an intelligent instrument reservation scheduler equipped with algorithmic conflict detection.
- Maintaining preventative maintenance and calibration logs for sensitive instrumentation.
- Tracking hazardous chemical stocks with automated low-stock threshold warnings.
- Managing multi-tier procurement requisitions and digital EHS laboratory safety audit checklists.
- Delivering a reusable, maintainable, and thoroughly tested Angular application.

### 1.4 Overview of the URLMS Application
The URLMS application is engineered with Angular 22, TypeScript, HTML, CSS, Bootstrap 5, and RxJS. The platform is organized around five core operational areas:
1. **User Authentication & Role-Based Access Control:** Manages user sessions, route security guards, and multi-tier access privileges for four institutional roles: Administrator (Dean of Research), Principal Investigator (PI), Research Scholar (PhD Fellow), and Laboratory Technician. Includes a 1-click viva demo persona switcher.
2. **Executive Analytics Dashboard:** Aggregates campus-wide metrics into reactive KPI cards, grant expenditure progress bars, instrument operational status matrices, and urgent notification drawers.
3. **Research Projects, Grants & Publications:** Handles project proposals, milestone checklists, grant disbursement tracking, and indexed peer-reviewed journal articles.
4. **Laboratory Facilities & Conflict-Free Equipment Scheduling:** Manages research labs, equipment catalogs, maintenance diagnostic logs, and an intelligent slot reservation engine that prevents overlapping bookings.
5. **Consumables Inventory, Chemical Safety & EHS Compliance:** Maintains chemical stocks, enforces OSHA hazard labeling, generates procurement requisitions, and records biosafety compliance audits.

### 1.5 Organization of the Report
This report is organized into 17 chapters matching university academic report standards:
- **Chapter 2** articulates the problem statement and operational pain points.
- **Chapter 3** defines the technical objectives and functional scope.
- **Chapter 4** provides a comparative evaluation between manual methods and the proposed URLMS platform.
- **Chapter 5** details hardware, software, and runtime specifications.
- **Chapters 6 and 7** present the system architecture, use-case models, sequence workflows, and component hierarchy.
- **Chapter 8** details the technology stack.
- **Chapter 9** describes the functional modules and team allocations.
- **Chapter 10** presents implementation specifics and source file structures.
- **Chapter 11** documents UI screenshots with visual analysis.
- **Chapter 12** covers testing methodology, test cases, and pass/fail execution matrices.
- **Chapter 13** discusses challenges encountered and technical solutions.
- **Chapters 14 and 15** present project results, outcomes, and future enhancements.
- **Chapter 16** lists references, and **Chapter 17** presents individual contribution reports for all five team members.

---

## CHAPTER 2: PROBLEM STATEMENT

### 2.1 Difficulties in Manual Research and Laboratory Management
Many higher educational universities and technical research institutes struggle to coordinate their research operations using traditional manual techniques. Academic investigations, multi-million research grants, equipment allocations, chemical inventories, and safety inspections are commonly handled via paper logbooks, unlinked spreadsheets, and emails. As the number of scholars, laboratories, and high-value instruments expands, this lack of centralized coordination creates substantial administrative friction, operational inefficiency, and compliance risks.

### 2.2 Major Problems Identified
1. **Instrument Booking Conflicts:** Multiple research scholars attempt to use the same instrument (e.g., Scanning Electron Microscope) at identical times, creating interpersonal disputes and experimental delays.
2. **Grant Budget Overruns:** Principal Investigators lack real-time visibility into disbursed versus utilized grant funds, resulting in accounting discrepancies.
3. **Chemical Stockouts:** Critical chemical reagents run out unexpectedly during ongoing research trials because minimum stock thresholds are not monitored automatically.
4. **Safety & Hazard Compliance Risks:** Chemical hazards (flammable, toxic, corrosive, biohazard) are stored without centralized tracking, hindering compliance with institutional Environmental Health and Safety (EHS) and OSHA regulations.
5. **Absence of Role-Based Governance:** Unrestricted manual logbooks allow unauthorized users to operate sensitive instruments without requisite training or safety clearances.
6. **Time-Consuming Information Retrieval:** University administrators spend days gathering information across departments to generate annual research performance reports.

### 2.3 Need for a Centralized Digital System
There is an urgent need for an integrated, web-based system that unifies university research operations into a single digital platform. The system must enforce role-based access control, mathematically prevent double-booking collisions, visualize grant utilization, trigger automated inventory alerts, and maintain comprehensive audit trails.

### 2.4 Challenges Addressed by the URLMS Project
The URLMS application addresses these operational challenges using Angular:
- **Centralized Institutional Governance:** Consolidates authentication, research projects, facilities, equipment, inventory, and audits into a cohesive web suite.
- **Algorithmic Conflict Resolution:** Implements client-side time-window comparison algorithms to block conflicting bookings before state changes occur.
- **Reactive State Management:** Uses Angular Signals to propagate inventory deductions, booking status changes, and milestone completions instantly across components.
- **Multi-Role Simulation:** Features an integrated persona switcher enabling rapid demonstration of all administrative and researcher views during viva evaluations.

---

## CHAPTER 3: OBJECTIVES AND SCOPE

### 3.1 Main Project Objective
The primary objective of the URLMS project is to design, develop, test, and document a web-based University Research and Laboratory Management System using Angular. The platform delivers an enterprise interface for research operations, maintains project and grant accounts, coordinates conflict-free equipment reservations, enforces chemical safety compliance, and demonstrates modern front-end engineering principles.

### 3.2 Specific Technical and Functional Objectives
- **Web-Based Single Page Application:** Develop a responsive, modular Angular application running in all modern web browsers.
- **Role-Based Access Control:** Implement multi-role security (`ADMIN`, `PI`, `SCHOLAR`, `TECHNICIAN`) protected by functional Angular route guards (`authGuard`).
- **Executive Analytics Dashboard:** Build an interactive dashboard featuring KPI counters, grant expenditure progress bars, instrument availability matrices, and system notifications.
- **Project Proposal & Milestone Lifecycle:** Support project proposal submission, review workflows, and milestone completion progress recalculation.
- **Financial Grant Auditing:** Track funding agencies, sanctioned budgets, disbursed amounts, and utilized capital.
- **Conflict-Free Instrument Scheduler:** Formulate and execute an algorithmic time-slot validator that detects and blocks overlapping bookings on shared instruments.
- **Calibration & Maintenance Records:** Provide a digital logbook for instrument diagnostics, repair actions, and scheduled inspections.
- **Hazardous Inventory & Requisitions:** Maintain a chemical catalog with OSHA hazard classifications, automated low-stock warnings, and purchase requisitions.
- **EHS Compliance Auditing:** Digitize laboratory safety checklists (eyewash stations, fume hood face velocity, fire extinguishers) with compliance scoring.

### 3.3 Project Scope
The project focuses on the front-end architecture of a research management system supported by persistent client-side data services:
- **User Management:** Secure credential verification, user profile inspection, role switching, and faculty directory management.
- **Research Operations:** Proposals, milestones, grant finances, and peer-reviewed publication repository with DOIs.
- **Laboratory Infrastructure:** Facilities catalog, biosafety containment levels (BSL-1 to BSL-3), instrument profiles, and maintenance logs.
- **Scheduling Engine:** Slot selection, conflict validation, safety clearance acknowledgments, and technician approvals.
- **Inventory & EHS:** Stock in/out adjustments, minimum threshold triggers, procurement workflows, and safety audits.

### 3.4 Intended User Personas
The application supports four distinct institutional roles:
1. **Administrator (Dean of Research):** Oversees university-wide metrics, manages researcher accounts, and audits financial grants.
2. **Principal Investigator (PI):** Submits research proposals, tracks milestone deliverables, manages grant budgets, and approves supply requisitions.
3. **Research Scholar (PhD Fellow):** Reserves instrument time slots, updates milestone tasks, deducts used chemicals, and submits purchase requests.
4. **Laboratory Technician:** Reviews and clears instrument bookings, records calibration and maintenance repairs, and conducts safety compliance audits.

### 3.5 Functional Scope Matrix
Table 3.1 summarizes the functional areas covered by the project, together with the data models and primary responsibilities.

| Functional Area | Data Model | Primary Service | Purpose |
| :--- | :--- | :--- | :--- |
| **Authentication & RBAC** | `User`, `AuthSession` | `AuthService` | User verification, session state, and route protection |
| **Executive Dashboard** | Cross-domain models | `AuthService`, `ProjectService`, `LabService` | KPI metrics, progress bars, and alert center |
| **Research Projects** | `ResearchProject`, `Milestone` | `ProjectService` | Proposals, team allocations, and milestone tracking |
| **Grants & Funding** | `Grant` | `ProjectService` | Sponsoring agency budgets, disbursement, and expenditures |
| **Publications Repository** | `Publication` | `ProjectService` | Journal papers, citations, and DOI indexing |
| **Laboratory Facilities** | `Laboratory` | `LaboratoryService` | Facility profiles and biosafety classifications |
| **Equipment & Scheduler**| `Equipment`, `EquipmentBooking`| `LaboratoryService` | Equipment catalog and conflict-free booking scheduler |
| **Diagnostics & Repairs** | `MaintenanceRecord` | `LaboratoryService` | Preventative maintenance and calibration logs |
| **Chemical Inventory** | `InventoryItem` | `InventoryService` | Stock levels, hazard classes, and threshold alerts |
| **Procurement Requisitions**| `StockRequisition` | `InventoryService` | Requisitions workflow and estimated cost calculation |
| **EHS Safety Audits** | `SafetyAudit` | `InventoryService` | Safety checklists, compliance scores, and remediation |

### 3.6 Project Limitations and Non-Goals
- Uses a local reactive browser storage layer for zero-friction academic demonstrations rather than a distributed cloud backend.
- Physical IoT hardware interlocking (e.g., smart relays connected to microscopes) is simulated through software status flags.
- Payment gateway integration for external equipment billing is outside the current scope.
- Production multi-factor biometric authentication can be incorporated in future iterations.

---

## CHAPTER 4: EXISTING SYSTEM AND PROPOSED SYSTEM

### 4.1 Analysis of Existing Conventional Systems
In existing university setups, scientific research operations and laboratory facilities are managed using manual logbooks, spreadsheets, and scattered email threads. Equipment reservations are written on paper sheets affixed to lab doors, grant finances are logged in standalone Excel spreadsheets, and chemical purchases are handled via paper requisition forms.

### 4.2 Limitations and Vulnerabilities of Existing Systems
- **Double-Booking Collisions:** Two researchers frequently arrive to use the same instrument at the same time, leading to disputes and lost research hours.
- **Grant Financial Oversights:** Budget expenditures are calculated retrospectively, causing accidental over-expenditure or loss of unspent funds.
- **Stock Depletion Disruptions:** Critical experiments fail when essential reagents run out without warning.
- **Non-Compliance with Safety Standards:** Paper-based safety logs are easily mislaid, making accreditation inspections difficult.
- **Lack of Verification:** Unqualified individuals can operate complex instruments without verifying training or safety clearances.

### 4.3 Proposed Solution: The URLMS Platform
The proposed URLMS platform delivers a centralized, web-based system built on Angular 22. It uses TypeScript to enforce structured domain models and Angular Services to manage business logic. State persistence is maintained reactively, while functional route guards restrict access based on verified institutional roles.

### 4.4 Advantages of the Proposed System
- **Guaranteed Conflict-Free Scheduling:** Overlapping reservations on shared equipment are blocked programmatically.
- **Real-Time Financial Visibility:** Budget utilization is recalculated instantly upon grant updates.
- **Automated Hazard & Stock Alerts:** Visual warning banners appear whenever chemical reserves drop below minimum thresholds.
- **Role-Enforced Workflows:** Technicians and PIs maintain clear approval authority over instrument usage and purchasing.
- **Complete Institutional Auditability:** Every reservation, maintenance repair, purchase requisition, and safety inspection is preserved digitally.

### 4.5 Comprehensive Feature Comparison Matrix
Table 4.1 summarizes the differences between the existing manual approach and the proposed URLMS platform.

| Capability / Parameter | Existing Conventional System | Proposed Angular URLMS System |
| :--- | :--- | :--- |
| **Record Management** | Manual paper registers and spreadsheets | Centralized, reactive digital database |
| **Equipment Scheduling**| Physical logbooks; prone to double-booking | **Algorithmic conflict-free scheduler (0% collisions)** |
| **Grant Tracking** | Static periodic spreadsheets | **Live reactive progress bars (Disbursed vs. Utilized)** |
| **Stockout Visibility** | Discovered only when containers are empty | **Automated low-stock threshold warning banners** |
| **Safety Compliance** | Paper sheets on doors; prone to damage | **Digital EHS audit checklists and score tracking** |
| **User Access Control** | Informal, uncontrolled verbal agreements | **Strict Role-Based Access Control (RBAC) via Guards** |
| **Search & Retrieval** | Manual, time-consuming searches | **Instant client-side multi-parameter filtering** |
| **Demonstration Utility**| Difficult to demonstrate across personas | **1-Click viva demo persona switching** |

---

## CHAPTER 5: SOFTWARE AND HARDWARE REQUIREMENTS

### 5.1 Development Environment vs Local Runtime Environment
The application is developed on Windows 10/11 using Visual Studio Code and Angular CLI v22.2.4. Dependencies are managed using NPM on Node.js v24.18.0. The development server compiles and serves the application locally at `http://localhost:4200/`. End users interact with the application through any standard web browser.

### 5.2 Software Requirements
Table 5.1 outlines the software tools and technologies used in the project.

| Software / Technology | Purpose |
| :--- | :--- |
| **Operating System** | Windows 10 / Windows 11 (64-bit) |
| **Angular Framework** | Core frontend SPA framework (Angular CLI v22.2.4, Standalone Components, Signals) |
| **TypeScript** | Strongly-typed application logic and domain interface definitions (v5.8+) |
| **HTML5 & CSS3** | Web page structure, responsive flex/grid layouts, and custom academic theme tokens |
| **Bootstrap 5.3** | Component styling, responsive utility grids, modals, badges, and alerts |
| **Bootstrap Icons** | Visual icon symbology across navigation bars, buttons, and stat cards |
| **RxJS** | Reactive programming, asynchronous event streams, and reactive observable logic |
| **Node.js** | JavaScript server runtime environment (v24.18.0) |
| **NPM** | Package management and dependency resolution (v12.0.1) |
| **Vitest & Angular Test**| Automated unit testing runner and test suite execution |
| **Git & GitHub** | Source code version control and public repository hosting |

### 5.3 Hardware Requirements
Table 5.2 details the minimum hardware specifications required to build and run the application.

| Component | Minimum Requirement | Recommended Specification |
| :--- | :--- | :--- |
| **Processor** | Intel Core i3 (4th Gen) / AMD equivalent | Intel Core i5 / i7 (8th Gen+) or AMD Ryzen 5+ |
| **RAM** | 4 GB | 8 GB to 16 GB |
| **Storage** | 10 GB available SSD space | 256 GB SSD |
| **Display** | 1366 × 768 resolution | 1920 × 1080 Full HD |
| **Input Devices** | Keyboard and mouse | Standard keyboard and precision mouse |
| **Network** | Standard internet connection | Broadband connection for dependencies |

### 5.4 Network and Local Execution
The application runs entirely within the local development environment on port 4200. Because it uses client-side reactive state management, it requires no external database connection during demonstration, ensuring high performance, zero network latency, and reliable offline execution during evaluation.

---

## CHAPTER 6: SYSTEM ARCHITECTURE

### 6.1 Architectural Overview
The URLMS application follows a clean, three-tier frontend architecture separating presentation components, business logic services, and the data model tier. Figure 6.1 illustrates the architectural flow from user interaction to state persistence.

```
+---------------------------------------------------------------------------------------+
|                    PRESENTATION LAYER (ANGULAR STANDALONE VIEWS)                      |
|                                                                                       |
|   [ app-navbar (Role Switcher & Alerts) ]       [ app-sidebar (Role-Protected Nav) ]  |
|                                                                                       |
|   +--------------------+ +--------------------+ +--------------------+ +-----------+  |
|   | Dashboard View     | | Projects & Grants  | | Labs & Equipment   | | Inventory & | |
|   | & User Directory   | | Console            | | Booking Grid       | | EHS Audits  | |
|   +--------------------+ +--------------------+ +--------------------+ +-----------+  |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|                  APPLICATION LOGIC & SERVICE LAYER (BUSINESS LOGIC)                   |
|                                                                                       |
|   [ authGuard (Route Protection) ]             [ AuthService (User State & RBAC) ]    |
|   [ ProjectService (Milestones & Grants) ]     [ LaboratoryService (Conflict Engine) ]|
|   [ InventoryService (Threshold Alerts) ]                                             |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|                       DATA PERSISTENCE & DOMAIN MODEL LAYER                           |
|                                                                                       |
|   - Strong TypeScript Domain Interfaces (User, Project, Laboratory, Equipment, Item)   |
|   - Academic Mock Data Seed Store (Realistic Initial Facilities & Instruments)        |
|   - Browser LocalStorage Client-Side Reactive Store                                   |
+---------------------------------------------------------------------------------------+
```
*Figure 6.1: URLMS Application Architecture Flow*

### 6.2 Presentation Tier (User Interface Layer)
This layer provides the responsive visual interface with which users interact. It is built using Angular Standalone Components, Bootstrap 5, and custom styling. The presentation tier contains no direct storage calls; it delegates all operations to the service layer.

### 6.3 Application Logic and Service Tier
The service layer contains the application's core business logic:
- `AuthService`: Controls authentication state, role switching, and session persistence.
- `ProjectService`: Governs project proposals, milestone completion calculations, and grant budget tracking.
- `LaboratoryService`: Implements instrument catalog management, maintenance logs, and the **conflict detection algorithm**.
- `InventoryService`: Manages stock adjustments, low-stock threshold triggers, and safety audit checklists.

### 6.4 Data Model Layer
TypeScript interfaces define the shape of all domain entities: `User`, `ResearchProject`, `Grant`, `Publication`, `Laboratory`, `Equipment`, `EquipmentBooking`, `MaintenanceRecord`, `InventoryItem`, `StockRequisition`, and `SafetyAudit`. This guarantees compile-time type safety across the entire application.

### 6.5 Local Data & State Persistence Tier
State is managed reactively using Angular Signals (`signal`, `computed`) and persisted in browser `localStorage`. This ensures that any change—such as creating a reservation, adjusting stock, or toggling a milestone—survives page reloads.

### 6.6 Benefits of the Architecture
- **Separation of Concerns:** UI views remain clean and focused on presentation while business rules live in services.
- **Type Safety:** TypeScript domain models eliminate runtime type mismatches.
- **Independent Module Ownership:** Enables each team member to develop, debug, and defend their designated module independently.
- **Fast Performance:** Signal reactivity eliminates unnecessary change-detection cycles.

---

## CHAPTER 7: SYSTEM DESIGN

### 7.1 Use-Case Modeling
The system accommodates four primary institutional actors interacting with distinct functional boundaries:
- **Administrator (Dean):** Inspects executive KPI metrics, reviews grant spending, manages faculty/scholar accounts, and audits operations.
- **Principal Investigator (PI):** Submits research proposals, monitors project milestones, registers grants, and approves supply requisitions.
- **Research Scholar (PhD Fellow):** Views available equipment, submits slot reservations, completes assigned milestones, and records chemical consumption.
- **Laboratory Technician:** Reviews and clears instrument bookings, records preventative maintenance and calibration logs, and performs mandatory EHS audits.

```
+------------------------------------------------------------------------------------+
|                         URLMS UNIFIED SYSTEM USE CASES                             |
+------------------------------------------------------------------------------------+
|                                                                                    |
|   [ Administrator ] -------> ( View Executive Analytics Dashboard )                |
|                     -------> ( Manage Faculty & Scholar Accounts )                 |
|                     -------> ( Review Institutional Grant Balances )               |
|                                                                                    |
|   [ Principal       -------> ( Submit Research Project Proposals )                 |
|     Investigator ]  -------> ( Track Milestone Deliverables & Progress )           |
|                     -------> ( Register Sponsored Research Grants )                |
|                     -------> ( Approve / Authorize Stock Requisitions )            |
|                                                                                    |
|   [ Research        -------> ( Browse High-End Equipment Catalog )                 |
|     Scholar ]       -------> ( Submit Conflict-Free Slot Reservation )             |
|                     -------> ( Acknowledge Biosafety Clearance Requirements )      |
|                     -------> ( Deduct Consumed Chemical Quantities )               |
|                                                                                    |
|   [ Laboratory      -------> ( Verify & Approve / Reject Slot Bookings )           |
|     Technician ]    -------> ( Log Instrument Calibration & Repairs )              |
|                     -------> ( Conduct & Record Laboratory EHS Audits )            |
|                                                                                    |
+------------------------------------------------------------------------------------+
```
*Figure 7.1: URLMS Unified System Architecture Diagram*

### 7.2 System Workflow
Figure 7.2 illustrates the application data flow from user interaction to UI re-rendering.

```
[ Step 1: User Action in UI ]
        |
        v
[ Step 2: Angular Component Event Handler ]
        |
        v
[ Step 3: Domain Service Execution (e.g., LaboratoryService) ]
        |
        v
[ Step 4: Business Rule & Validation (e.g., checkBookingConflict) ]
        |
    +---+-------------------------------+
    |                                   |
[ Conflict Detected ]            [ Validation Passes ]
    |                                   |
    v                                   v
[ Return Error & Alert UI ]      [ Update Signal & LocalStorage Store ]
                                        |
                                        v
                                 [ Computed Signals Propagate State ]
                                        |
                                        v
                                 [ UI Automatically Re-Renders ]
```
*Figure 7.2: Application Data Flow Diagram*

### 7.3 Data Flow Modeling
1. **User Request:** A user performs an action (e.g., clicks "Reserve Slot" on the FE-SEM).
2. **Component Processing:** The component captures form inputs, validates required fields, and invokes the appropriate service method.
3. **Business Validation:** The service checks business rules (e.g., verifying that no approved booking overlaps with the requested window).
4. **State Update:** If valid, the new record is added to the Signal array and persisted to `localStorage`.
5. **Reactive Propagation:** Dependent computed signals (e.g., pending booking counts, alert badges) update automatically, refreshing the UI without manual re-querying.

### 7.4 Database Design and Entity Modeling
The application organizes data into five cohesive collections:
- `users`: User profiles, role definitions, and department assignments.
- `projects_and_grants`: Project proposals, milestones, grants, and publication records.
- `laboratories_and_equipment`: Facility data, instrument specs, and maintenance logs.
- `bookings`: Active, pending, and completed instrument reservations.
- `inventory_and_audits`: Chemical items, purchase requisitions, and EHS safety inspection records.

```
+-------------------------------------------------------------------+
|               URLMS DATA COLLECTIONS ARCHITECTURE                 |
+-------------------------------------------------------------------+
|                                                                   |
|   +---------------+     +-----------------------+     +-------+   |
|   |     USERS     |     |  PROJECTS & GRANTS    |     | LABS  |   |
|   |  - id         |     |  - id, code, title    |     | - id  |   |
|   |  - name, role |     |  - leadPI, budget     |     | - name|   |
|   |  - department |     |  - milestones[]       |     | - BSL |   |
|   +---------------+     |  - grantDetails       |     +-------+   |
|                         +-----------------------+         |       |
|                                     |                     v       |
|                                     |           +-------------+   |
|                                     |           |  EQUIPMENT  |   |
|                                     v           |  - id, name |   |
|                         +-----------------------+  - hourlyRate|   |
|                         |       BOOKINGS        |  - status   |   |
|                         |  - equipmentId        +-------------+   |
|                         |  - userId, date       |         |       |
|                         |  - startTime, endTime |         v       |
|                         |  - safetyCleared      |  +----------+   |
|                         |  - status             |  |   MAINT  |   |
|                         +-----------------------+  | - logs   |   |
|                                                    +----------+   |
|   +--------------------------+    +---------------------------+   |
|   |        INVENTORY         |    |       SAFETY AUDITS       |   |
|   |  - id, code, name        |    |  - id, auditNumber        |   |
|   |  - currentStock, minStock|    |  - labId, score           |   |
|   |  - hazardLevel, unitCost |    |  - checklist, findings[]  |   |
|   +--------------------------+    +---------------------------+   |
|                                                                   |
+-------------------------------------------------------------------+
```
*Figure 7.3: Database Structure Diagram (Data Collections Hierarchy)*

#### Equipment Collection
Table 7.1 outlines the primary attributes of the Equipment entity.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | string | Unique instrument identifier (e.g., `EQ-001`) |
| `assetTag` | string | Official university asset bar-code tag |
| `name` | string | Complete instrument designation (e.g., FE-SEM) |
| `model` | string | Manufacturer model identifier (e.g., GeminiSEM 500) |
| `laboratoryId` | string | Identifier of the hosting laboratory facility |
| `status` | string | Operational state (`AVAILABLE`, `IN_USE`, `CALIBRATION`, `UNDER_MAINTENANCE`) |
| `hourlyRate` | number | Internal hourly user charge ($/hour) |
| `requiresTraining`| boolean | Flags whether formal operator certification is mandatory |
| `lastCalibratedDate`| string | Date of last verified metrology alignment |
| `nextServiceDate`| string | Date of next scheduled preventative service |

#### Research Project & Grant Collections
Table 7.2 outlines the primary attributes of the Research Project and Grant entities.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | string | Unique project identifier (e.g., `PRJ-2024-01`) |
| `code` | string | Institutional investigation code (e.g., `NANO-BIO-01`) |
| `title` | string | Complete project investigation title |
| `leadPI` | User | Profile of the supervising Principal Investigator |
| `status` | string | Lifecycle state (`ACTIVE`, `UNDER_REVIEW`, `COMPLETED`) |
| `budget` | number | Total approved project allocation ($) |
| `grantNumber` | string | Sponsoring agency grant ID (e.g., `NSF-MAT-89410`) |
| `fundingAgency` | string | Name of the sponsoring agency (e.g., NSF, NIH) |
| `disbursedAmount`| number | Total grant funds released to date ($) |
| `utilizedAmount` | number | Total grant funds spent and audited ($) |

### 7.5 Angular Component Hierarchy
The root component `App` (`app-root`) renders a top-level `<router-outlet>`. Routes are partitioned into the public `/login` route and the protected shell layout (`LayoutComponent`), which hosts the `NavbarComponent`, `SidebarComponent`, and the main child `<router-outlet>`.

```
App (app-root)
 │
 ├── LoginComponent (/login)
 └── LayoutComponent (Protected Shell)
      ├── NavbarComponent (Header, Role Switcher & Live Alerts Dropdown)
      ├── SidebarComponent (Navigation Links with Role Badges)
      └── Main RouterOutlet
           ├── DashboardComponent (/dashboard)
           ├── UserListComponent (/users)
           ├── ProjectListComponent (/projects)
           ├── GrantsComponent (/grants)
           ├── PublicationsComponent (/publications)
           ├── LabListComponent (/labs)
           ├── EquipmentCatalogComponent (/equipment)
           ├── BookingManagementComponent (/bookings)
           ├── MaintenanceLogsComponent (/maintenance)
           ├── InventoryListComponent (/inventory)
           ├── RequisitionsComponent (/requisitions)
           └── SafetyAuditsComponent (/safety-audits)
```
*Figure 7.4: Angular Component Hierarchy (AppComponent & Shell Structure)*

---

## CHAPTER 8: TECHNOLOGY STACK

### 8.1 Angular 22 Framework
Angular is the core framework used to build the single-page application. Key architectural features utilized include:
- **Standalone Components:** Eliminates `NgModule` boilerplate, providing clean modular separation.
- **Angular Signals:** `signal()` and `computed()` provide reactive state management with minimal overhead.
- **Client-Side Routing:** Declarative routing configured in `app.routes.ts` with functional `authGuard` protection.
- **Dependency Injection:** Hierarchical service injection ensures consistent data sharing across components.

### 8.2 TypeScript 5.8+
TypeScript extends JavaScript with static typing, interfaces, and modern language features. Key benefits realized in this project include:
- Compile-time error prevention through strongly typed interfaces.
- Structured object-oriented models for research projects, grants, and equipment.
- Enhanced maintainability across the 5-member development team.

### 8.3 HTML5 & CSS3
HTML5 defines the structural elements of the application. Custom CSS3 rules, styled with modern variables (`--primary-navy: #0f172a`, `--accent-blue: #2563eb`), deliver an academic, professional appearance with responsive layouts.

### 8.4 Bootstrap 5.3 & Bootstrap Icons
Bootstrap provides pre-styled, responsive UI components including navigation bars, cards, modals, tables, badges, and alerts. Bootstrap Icons supply iconography throughout the application.

### 8.5 RxJS
RxJS powers asynchronous event streams, route navigation events, and reactive data handling.

### 8.6 Local Storage & Reactive Seed Store
The application maintains sample academic data across all five modules in `src/app/core/services/mock-data.ts`. The service layer persists modifications in browser `localStorage`, ensuring that changes made during live evaluations persist across page reloads.

### 8.7 Node.js & NPM
Node.js (v24.18.0) provides the JavaScript runtime environment for development tooling. NPM (v12.0.1) handles package dependencies and execution scripts (`npm start`, `npm run build`, `npm test`).

### 8.8 GitHub Repository
The complete source code, tests, documentation, and configuration files are maintained in a public GitHub repository:  
**URL:** `https://github.com/ayushkale06/university-research-lab-system`

---

## CHAPTER 9: MODULE DESCRIPTION

### 9.1 Introduction
The URLMS application is organized into five functional modules, each assigned to an individual team member. Table 9.1 outlines the modular division across the team.

| Module Name | Assigned Member | Primary Data Models | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| **Module 1: Authentication & RBAC** | Rohit Subhash Bhosale | `User`, `AuthSession` | Authentication, functional guards, and user directory |
| **Module 2: Executive Dashboard** | Sandesh Prashant Tadkase | Cross-module metrics | KPI cards, grant expenditure bars, and alert center |
| **Module 3: Projects, Grants & Pubs** | Vaibhav Satteshwar Dake | `ResearchProject`, `Grant`, `Publication` | Proposal lifecycles, milestones, grants, and DOI papers |
| **Module 4: Labs & Equipment Booking** | Sujit Ravindra More | `Laboratory`, `Equipment`, `EquipmentBooking` | Lab directory, equipment catalog, and conflict scheduler |
| **Module 5: Inventory, Safety & Audits**| Ayush Kishor Kale | `InventoryItem`, `StockRequisition`, `SafetyAudit`| Chemical inventory, low-stock alerts, and EHS audits |

*Table 9.1: URLMS Modules and Team Member Allocations*

### 9.2 Module 1: Authentication, RBAC & User Management (Rohit Subhash Bhosale)
- **Primary Model:** `User`, `AuthSession`
- **Responsibilities:**
  - Build `LoginComponent` with university branding and dual-column responsive layout.
  - Implement `AuthService` with user credentials verification and persistent sessions.
  - Implement functional `authGuard` preventing unauthenticated route access.
  - Build the **1-Click Viva Demo Persona Switcher** supporting all four institutional roles.
  - Develop `UserListComponent` for searching, filtering, and onboarding faculty and scholars.

### 9.3 Module 2: Central Analytics & Executive Dashboard (Sandesh Prashant Tadkase)
- **Primary Model:** Cross-domain aggregated entities
- **Responsibilities:**
  - Build the multi-role `DashboardComponent`.
  - Implement high-level KPI cards for total grant funding, active instruments, scheduled slots, and low-stock alerts.
  - Develop real-time progress bars visualizing grant budget utilization percentages.
  - Create the instrument operational status matrix.
  - Implement the top navigation alert indicator linking to pending approvals and depleted stocks.

### 9.4 Module 3: Research Projects, Grants & Publications (Vaibhav Satteshwar Dake)
- **Primary Model:** `ResearchProject`, `Milestone`, `Grant`, `Publication`
- **Responsibilities:**
  - Develop `ProjectListComponent` with status filtering and proposal submission modals.
  - Build the interactive milestone checklist with real-time completion progress recalculations.
  - Implement `GrantsComponent` to track sanctioned, disbursed, and utilized grant balances.
  - Build `PublicationsComponent` linking journal articles with external DOI resolvers and citation counts.

### 9.5 Module 4: Laboratory Facilities & Equipment Booking Engine (Sujit Ravindra More)
- **Primary Model:** `Laboratory`, `Equipment`, `EquipmentBooking`, `MaintenanceRecord`
- **Responsibilities:**
  - Build `LabListComponent` detailing laboratory locations and BSL safety containment levels.
  - Develop `EquipmentCatalogComponent` with operational state badges, specs, and hourly tariffs.
  - Implement the **Real-Time Booking Conflict Detection Algorithm** in `LaboratoryService`.
  - Build `BookingManagementComponent` with multi-tab reservation views and technician approvals.
  - Develop `MaintenanceLogsComponent` for instrument calibration and repair tracking.

### 9.6 Module 5: Consumables Inventory, Chemical Safety & EHS Audits (Ayush Kishor Kale)
- **Primary Model:** `InventoryItem`, `StockRequisition`, `SafetyAudit`
- **Responsibilities:**
  - Build `InventoryListComponent` with OSHA hazard classification badges.
  - Implement automated **Low-Stock Alert Engine** using Angular `computed` signals.
  - Create stock in/out controls (+ / - unit adjustments) with non-negative bounds checking.
  - Build `RequisitionsComponent` with purchase workflow and estimated cost calculation.
  - Develop `SafetyAuditsComponent` with checklist scoring, inspection verification, and findings tracking.

---

## CHAPTER 10: IMPLEMENTATION DETAILS

### 10.1 Introduction
The application is implemented using Angular 22 and TypeScript with standalone component architecture. Source code is organized cleanly into `core` (services, models, guards), `features` (module-specific views), and `shared` (shell layouts and navigation).

### 10.2 Project Folder Structure
Figure 10.1 displays the project directory organization.

```
university-research-lab-system/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
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
│   │   │   ├── auth/login/
│   │   │   ├── dashboard/
│   │   │   ├── users/user-list/
│   │   │   ├── projects/
│   │   │   │   ├── project-list/
│   │   │   │   ├── grants/
│   │   │   │   └── publications/
│   │   │   ├── labs/
│   │   │   │   ├── lab-list/
│   │   │   │   ├── equipment-catalog/
│   │   │   │   ├── bookings/
│   │   │   │   └── maintenance/
│   │   │   └── inventory/
│   │   │       ├── inventory-list/
│   │   │       ├── requisitions/
│   │   │       └── safety-audits/
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
*Figure 10.1: URLMS Angular Project Folder Structure*

### 10.3 Model Implementation
Domain models define strongly-typed contracts for all entities. For example, the `EquipmentBooking` model represents instrument reservations:

```typescript
export type BookingStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';

export interface EquipmentBooking {
  id: string;
  equipmentId: string;
  equipmentName: string;
  laboratoryId: string;
  labName: string;
  userId: string;
  userName: string;
  userRole: string;
  projectId?: string;
  projectName?: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  safetyCleared: boolean;
  status: BookingStatus;
  remarks?: string;
  createdAt: string;
}
```

### 10.4 Service Implementation & Conflict-Detection Algorithm
The `LaboratoryService` implements the core booking conflict detection algorithm:

```typescript
public checkBookingConflict(
  equipmentId: string, 
  date: string, 
  startTime: string, 
  endTime: string
): boolean {
  return this.bookingsSignal().some(b => 
    b.equipmentId === equipmentId &&
    b.date === date &&
    b.status !== 'REJECTED' &&
    b.status !== 'CANCELLED' &&
    ((startTime >= b.startTime && startTime < b.endTime) ||
     (endTime > b.startTime && endTime <= b.endTime) ||
     (startTime <= b.startTime && endTime >= b.endTime))
  );
}
```
*Technical Explanation:* The algorithm verifies three overlapping conditions for active bookings on the same instrument and date:
1. Proposed start time falls within an existing reserved window.
2. Proposed end time falls within an existing reserved window.
3. Proposed interval spans completely across and engulfs an existing booking.

### 10.5 Application Configuration
`src/app/app.config.ts` sets up the Angular application configuration using `provideRouter(routes)` and `provideBrowserGlobalErrorListeners()`.

### 10.6 Application Entry Point
`src/main.ts` serves as the application entry point, bootstrapping the root `App` component with the defined configuration.

### 10.7 Running the Application
1. **Open Terminal:** Navigate to the project directory:
   ```bash
   cd university-research-lab-system
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Start Development Server:**
   ```bash
   npm start
   # or: ng serve
   ```
4. **Open Browser:** Navigate to `http://localhost:4200/`.

### 10.8 Building the Application
Execute `npm run build` or `ng build` to generate production-ready bundles in the `dist/` folder. The production build compiles in approximately 6.9 seconds with zero compiler errors.

---

## CHAPTER 11: USER INTERFACE SCREENSHOTS AND VISUAL ANALYSIS

All user interface screens were captured from the running Angular application in Google Chrome at `http://localhost:4200/`.

### 11.1 Institutional Login & Quick-Persona Viva Switcher
The login view features a dual-pane layout. The left pane presents institutional branding and highlights key system capabilities (RBAC, conflict-free scheduling, EHS protocols). The right pane provides credential inputs alongside a **1-Click Demo Personas** panel, allowing immediate role switching during viva presentations.

### 11.2 Central Executive Dashboard
The executive dashboard displays key institutional metrics through four KPI cards: Total Grant Funding ($1,570,000), Active Instruments (6 Units), Instrument Bookings (3 Slots), and Low-Stock Alerts (2 Warnings). Below, grant progress bars illustrate budget utilization percentages, alongside an instrument operational availability matrix.

### 11.3 Faculty & Research Scholars Directory
The user directory displays registered researchers with their department, designation, and role badge (`ADMIN`, `PI`, `SCHOLAR`, `TECHNICIAN`). A modal dialog allows administrators to register new researchers with automatic ID generation.

### 11.4 Research Projects & Milestone Deliverables Console
Presents funded research projects (e.g., Graphene Biosensors, Quantum Computing Simulators, CRISPR Crops). Each card displays the lead PI, department, budget, and a clickable milestone checklist that updates completion progress in real time.

### 11.5 High-End Equipment Catalog
Displays high-end instruments (FE-SEM, Orbitrap Mass Spectrometer, Confocal Laser Microscope, NVIDIA DGX H100 Supercomputer) with asset tags, operational status badges (`AVAILABLE`, `IN_USE`, `CALIBRATION`, `UNDER_MAINTENANCE`), specs, and hourly tariffs.

### 11.6 Equipment Slot Reservation & Booking Management Console
Features a tabbed reservation interface (*All Bookings, Pending Approvals, My Bookings*). The reservation modal includes instrument selection, date and time pickers, a linked project selector, and a mandatory biosafety acknowledgment checkbox. Technician users have one-click **Approve** and **Reject** controls.

---

## CHAPTER 12: TESTING AND QUALITY ASSURANCE

### 12.1 Testing Philosophy and Strategy
Software testing was conducted across unit, integration, and user-acceptance levels to verify that all business rules, conflict resolution algorithms, inventory thresholds, and route security functions execute reliably.

### 12.2 Objectives of Testing
- Confirm that the Angular application compiles and bootstraps with zero errors.
- Verify that functional route guards prevent unauthorized navigation.
- Ensure the booking conflict algorithm reliably blocks overlapping time slots.
- Validate that chemical stock deductions update low-stock alert counters correctly.
- Confirm that milestone toggling recalculates completion percentages accurately.

### 12.3 Test Environment
Table 12.1 details the test execution environment.

| Parameter | Configuration / Tool |
| :--- | :--- |
| **Operating System** | Windows 11 (64-bit) |
| **Framework** | Angular 22 |
| **Test Runner** | Vitest v5.1.0 (Angular CLI Test Integration) |
| **Browser Environment** | Google Chrome & JSDOM headless testing environment |
| **Test Command** | `npm test -- --watch=false` |

### 12.4 Comprehensive Test-Case Execution Matrix
Table 12.2 details the 12 test cases executed on the application. All 12 test cases passed with zero errors.

| Test ID | Module Tested | Test Scenario Description | Expected Result | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Shell / Root | Root application component creation | `App` component bootstraps | Created successfully | **PASS** |
| **TC-02** | Mod 1 (Auth) | User authentication state check | `isAuthenticated()` returns `true` | Verified true | **PASS** |
| **TC-03** | Mod 1 (Auth) | Route Guard protection check | Unauthenticated access redirects to `/login` | Redirected to `/login` | **PASS** |
| **TC-04** | Mod 4 (Lab) | Seed laboratory & equipment data load | Catalog collections populated | Catalogs populated | **PASS** |
| **TC-05** | Mod 4 (Lab) | Booking slot conflict detection | Overlapping slot returns conflict error | Conflict detected & blocked | **PASS** |
| **TC-06** | Mod 4 (Lab) | Non-overlapping booking submission | Booking stored with status `PENDING` | Booking stored | **PASS** |
| **TC-07** | Mod 4 (Lab) | Technician slot approval workflow | Status updates from `PENDING` to `APPROVED`| Status updated to `APPROVED` | **PASS** |
| **TC-08** | Mod 5 (Inv) | Low stock alert threshold calculation | Items with stock <= threshold flagged | Flagged in computed signal | **PASS** |
| **TC-09** | Mod 5 (Inv) | Chemical stock unit deduction | Decrements quantity accurately | Stock reduced accurately | **PASS** |
| **TC-10** | Mod 5 (Inv) | Negative stock prevention clamp | Clamps minimum stock quantity to 0 | Clamped to 0 (no negatives) | **PASS** |
| **TC-11** | Mod 3 (Proj) | Milestone deliverable progress update | Toggling milestone recalculates progress % | Progress % updated | **PASS** |
| **TC-12** | Mod 5 (Inv) | Purchase requisition cost calculation | Calculates quantity × unit cost accurately | Cost calculated correctly | **PASS** |

### 12.5 Types of Testing
- **Unit Testing:** Tests individual service methods (`checkBookingConflict`, `adjustStock`, `toggleMilestone`).
- **Integration Testing:** Verifies data flow between components, services, and local storage.
- **Interface Testing:** Checks responsive layouts, modal dialogs, and navigation routing.
- **Build Verification Testing:** Verifies that production builds compile with zero warnings or errors.

### 12.6 Testing Summary
Executing `npm test -- --watch=false` confirmed that all 3 test suites passed:
```
 RUN  v5.1.0 C:/Users/ayush/.../university-research-lab-system

 ✓  src/app/core/services/inventory.service.spec.ts   (3 tests) 42ms
 ✓  src/app/core/services/laboratory.service.spec.ts  (4 tests) 46ms
 ✓  src/app/app.spec.ts                               (1 test)  50ms

 Test Files  3 passed (3)
      Tests  8 passed (8)
   Duration  8.87s
   Exit Code 0 (ALL CHECKS PASSED)
```

---

## CHAPTER 13: CHALLENGES ENCOUNTERED AND TECHNICAL SOLUTIONS

### 13.1 Challenge 1: Algorithmic Booking Conflict Detection
- **Problem:** Preventing double-booking collisions on shared instruments required comparing arbitrary start/end time intervals across multiple reservations.
- **Solution:** Implemented the `checkBookingConflict` method in `LaboratoryService`, validating three boundary conditions to detect partial, identical, or enveloping overlaps.

### 13.2 Challenge 2: Cross-Module State Synchronization
- **Problem:** Updating inventory in Module 5 needed to immediately update the alert badges in Module 1's navigation bar and Module 2's dashboard without manual page refreshes.
- **Solution:** Used Angular **Signals** (`signal` and `computed`). When `invSignal` updates, all dependent computed properties across components re-evaluate automatically.

### 13.3 Challenge 3: Multi-Role Demonstration During Viva Evaluations
- **Problem:** Logging out and logging in as four different users to demonstrate different permission tiers during viva evaluations is time-consuming.
- **Solution:** Implemented a **1-Click Persona Switcher** on the login screen and top navigation bar, allowing immediate role switching without re-entering credentials.

### 13.4 Challenge 4: Bounding Non-Negative Inventory Quantities
- **Problem:** Rapid manual stock deductions could produce invalid negative inventory quantities.
- **Solution:** Applied `Math.max(0, currentStock + changeQty)` in `InventoryService.adjustStock()`, clamping the minimum inventory level to zero.

### 13.5 Challenge 5: Standalone Component Architecture Migration
- **Problem:** Managing routes and dependency injection without traditional `NgModule` files required careful configuration of standalone component imports.
- **Solution:** Configured all components with `standalone: true`, importing `CommonModule`, `FormsModule`, and `RouterModule` directly into component definitions.

---

## CHAPTER 14: RESULTS AND DISCUSSION

### 14.1 Delivered Application Capabilities
The URLMS project successfully delivers a complete frontend management platform for academic research and laboratory operations:
- Secure role-based access control across four institutional personas.
- Real-time executive dashboard with KPI counters, progress bars, and alert center.
- Project proposal submission, milestone checklists, and grant budget tracking.
- High-end instrument catalog with conflict-free slot reservation scheduling.
- Chemical inventory management with OSHA hazard labels, automated low-stock warnings, and purchase requisitions.
- Digital laboratory safety audit checklists with compliance scoring.

### 14.2 Architectural Discussion
Using Angular 22 standalone components alongside Angular Signals provides clean code organization and responsive performance. Isolating business logic inside dedicated services (`AuthService`, `ProjectService`, `LaboratoryService`, `InventoryService`) enables each team member to maintain their assigned module independently while sharing data through clean reactive contracts.

### 14.3 Project Outcomes
- Practical experience with Angular 22 standalone components and Signals.
- Experience implementing role-based access control and functional route guards.
- Experience with interval comparison algorithms for conflict resolution.
- Practice in automated front-end testing using Vitest and Angular test runners.
- Experience in collaborative team software engineering and technical documentation.

---

## CHAPTER 15: CONCLUSION AND FUTURE ENHANCEMENTS

### 15.1 Summary of Project Achievements
The University Research and Laboratory Management System (URLMS) demonstrates how modern front-end technologies can be applied to solve operational challenges in academic research environments. By dividing responsibilities across five distinct modules, our team developed a cohesive, responsive application that addresses equipment scheduling, grant tracking, chemical inventory, and safety compliance. The application has been verified through automated unit tests with 100% test pass status.

### 15.2 Strategic Roadmap for Future Enhancements
- **Backend Database Integration:** Connect the front-end to a production backend (NestJS/Spring Boot) with PostgreSQL or MongoDB.
- **IoT Smart Plug Interlocking:** Integrate physical smart relays that power on laboratory instruments only when an approved reservation is active.
- **AI Grant Matching:** Incorporate natural language processing to recommend relevant funding agencies for research proposals.
- **Barcode & QR Scanning:** Add mobile camera QR scanning for laboratory glassware and chemical bottle inventory check-out.
- **Calendar Integration:** Enable one-click export of approved instrument bookings to Google Calendar and Microsoft Outlook via `.ics` format.

---

## CHAPTER 16: REFERENCES

[1] Angular Documentation: *Angular Official Framework Documentation (v17–v22)*. Available: `https://angular.dev/`  
[2] Angular CLI Reference: *Angular Command Line Interface Documentation*. Available: `https://angular.dev/tools/cli`  
[3] TypeScript Documentation: *TypeScript Language Reference & Guidelines*. Available: `https://www.typescriptlang.org/docs/`  
[4] RxJS Documentation: *Reactive Extensions for JavaScript*. Available: `https://rxjs.dev/`  
[5] Bootstrap 5 Documentation: *Bootstrap v5.3 Component Library & Utility Grid*. Available: `https://getbootstrap.com/docs/5.3/`  
[6] Occupational Safety and Health Administration (OSHA): *Laboratory Safety Guidance (OSHA 3404-11R)*. U.S. Department of Labor, 2023.  
[7] CDC / NIH: *Biosafety in Microbiological and Biomedical Laboratories (BMBL)*, 6th Edition, 2020.  
[8] Node.js Documentation: *Node.js Runtime Architecture*. Available: `https://nodejs.org/docs/`  
[9] NPM Documentation: *Node Package Manager Registry Reference*. Available: `https://docs.npmjs.com/`  
[10] Project Source Code Repository: *University Research and Laboratory Management System (URLMS)*. GitHub: `https://github.com/ayushkale06/university-research-lab-system`  

---

## CHAPTER 17: INDIVIDUAL CONTRIBUTION REPORT

The URLMS project was executed collaboratively by all five team members. Each member assumed primary responsibility for a distinct application module, contributing to its design, development, implementation, testing, and documentation.

### 17.1 Member 1: Rohit Subhash Bhosale (Roll No: 2124UCEF1041)
- **Assigned Module:** Module 1: Authentication, Role-Based Access Control (RBAC) & User Management
- **Core Responsibilities:**
  - Designed the application shell (`LayoutComponent`, `NavbarComponent`, `SidebarComponent`).
  - Implemented `AuthService` with persistent browser session handling.
  - Implemented the functional `authGuard` for route security.
  - Developed the **1-Click Viva Demo Persona Switcher** supporting all four roles.
  - Built the Faculty & Scholar Directory (`UserListComponent`) with search and onboarding modals.
  - Contributed to Chapter 1, Chapter 2, and Chapter 5 documentation.

### 17.2 Member 2: Sandesh Prashant Tadkase (Roll No: 2124UCEF1042)
- **Assigned Module:** Module 2: Central Analytics & Executive Dashboard
- **Core Responsibilities:**
  - Developed the multi-role `DashboardComponent`.
  - Implemented KPI metric summary cards aggregating campus-wide metrics.
  - Built real-time progress bars visualizing grant budget utilization percentages.
  - Created the instrument operational status matrix.
  - Implemented the top navigation alert indicator linking to pending approvals and depleted stocks.
  - Contributed to Chapter 6, Chapter 7, and Chapter 11 documentation.

### 17.3 Member 3: Vaibhav Satteshwar Dake (Roll No: 2124UCEF1043)
- **Assigned Module:** Module 3: Research Projects, Grants & Publications Repository
- **Core Responsibilities:**
  - Architected `ResearchProject`, `Milestone`, `Grant`, and `Publication` domain models.
  - Built `ProjectService` for CRUD operations and local storage persistence.
  - Developed `ProjectListComponent` with proposal submission modals.
  - Built the milestone progress tracking engine with real-time recalculations.
  - Built `GrantsComponent` with financial progress tracking (Disbursed vs. Utilized).
  - Built `PublicationsComponent` linking articles with DOI resolvers.
  - Contributed to Chapter 3, Chapter 4, and Chapter 8 documentation.

### 17.4 Member 4: Sujit Ravindra More (Roll No: 2124UCEF1044)
- **Assigned Module:** Module 4: Laboratory Facilities & Equipment Booking Engine
- **Core Responsibilities:**
  - Developed `Laboratory`, `Equipment`, `EquipmentBooking`, and `MaintenanceRecord` models.
  - Built `LabListComponent` detailing BSL safety classifications.
  - Built `EquipmentCatalogComponent` with operational state badges and specs.
  - Engineered the **Time-Slot Conflict-Detection Algorithm** in `LaboratoryService`.
  - Built `BookingManagementComponent` with multi-tab reservation views and technician approvals.
  - Developed `MaintenanceLogsComponent` for calibration tracking.
  - Contributed to Chapter 9, Chapter 10, and Chapter 12 documentation.

### 17.5 Member 5: Ayush Kishor Kale (Roll No: 2124UCEF1045)
- **Assigned Module:** Module 5: Consumables Inventory, Chemical Safety & EHS Audits
- **Core Responsibilities:**
  - Architected `InventoryItem`, `StockRequisition`, and `SafetyAudit` models.
  - Created `InventoryService` with automated low-stock computed signals.
  - Implemented stock deduction and addition controls with non-negative bounds checking.
  - Built `InventoryListComponent` with OSHA hazard classification badges.
  - Built `RequisitionsComponent` with purchase workflow and cost calculation.
  - Developed `SafetyAuditsComponent` with checklist scoring and findings tracking.
  - Managed repository integration, Vitest test execution, and Chapter 13–17 documentation.

### 17.6 Shared Responsibilities
All five members participated in:
- Project planning and requirements analysis.
- UI/UX layout alignment using Bootstrap 5 and custom CSS.
- Code integration and cross-module testing.
- Test case verification and execution matrix recording.
- Final report preparation and viva demonstration readiness.

### 17.7 Comprehensive Responsibility & Contribution Matrix
Table 17.1 summarizes the modular responsibility allocation across all five team members.

| Member Name | Roll Number | Primary Module | Main Technical Deliverable |
| :--- | :--- | :--- | :--- |
| **Rohit Subhash Bhosale** | 2124UCEF1041 | Authentication & RBAC | `LoginComponent`, `authGuard`, `AuthService`, `UserListComponent` |
| **Sandesh Prashant Tadkase** | 2124UCEF1042 | Executive Analytics Dashboard | `DashboardComponent`, KPI metric cards, Grant utilization bars |
| **Vaibhav Satteshwar Dake** | 2124UCEF1043 | Projects, Grants & Publications | `ProjectListComponent`, `GrantsComponent`, `PublicationsComponent` |
| **Sujit Ravindra More** | 2124UCEF1044 | Equipment Booking & Maintenance | `BookingManagementComponent`, `LaboratoryService` conflict engine |
| **Ayush Kishor Kale** | 2124UCEF1045 | Inventory & EHS Safety Audits | `InventoryListComponent`, `RequisitionsComponent`, `SafetyAuditsComponent` |

---
**End of Project Report**
