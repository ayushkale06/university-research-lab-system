import { User } from '../models/user.model';
import { ResearchProject, Grant, Publication } from '../models/project.model';
import { Laboratory, Equipment, EquipmentBooking, MaintenanceRecord } from '../models/laboratory.model';
import { InventoryItem, StockRequisition, SafetyAudit } from '../models/inventory.model';

export const INITIAL_USERS: User[] = [
  {
    id: 'USR-001',
    name: 'Dr. Arthur Vance',
    email: 'dean.research@university.edu',
    role: 'ADMIN',
    department: 'Office of Dean of Research',
    designation: 'Dean of Research & Innovation',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    phone: '+1 (555) 234-5670',
    isActive: true
  },
  {
    id: 'USR-002',
    name: 'Dr. Elena Sharma',
    email: 'elena.sharma@university.edu',
    role: 'PI',
    department: 'Department of Nanotechnology & Materials',
    designation: 'Professor & Principal Investigator',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    phone: '+1 (555) 234-5671',
    isActive: true
  },
  {
    id: 'USR-003',
    name: 'Priya Nair',
    email: 'priya.nair@university.edu',
    role: 'SCHOLAR',
    department: 'Department of Biotechnology',
    designation: 'Senior Research Fellow (PhD)',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    phone: '+1 (555) 234-5672',
    isActive: true
  },
  {
    id: 'USR-004',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    role: 'TECHNICIAN',
    department: 'Central Instrumentation Facility',
    designation: 'Lead Laboratory Technical Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    phone: '+1 (555) 234-5673',
    isActive: true
  }
];

export const INITIAL_GRANTS: Grant[] = [
  {
    id: 'GRT-2024-01',
    grantNumber: 'NSF-MAT-89410',
    title: 'Advanced 2D Nanomaterials for Ultra-Sensitive Electrochemical Biosensors',
    fundingAgency: 'National Science Foundation (NSF)',
    totalBudget: 480000,
    disbursedAmount: 320000,
    utilizedAmount: 265400,
    startDate: '2024-01-15',
    endDate: '2026-12-31',
    status: 'ACTIVE'
  },
  {
    id: 'GRT-2024-02',
    grantNumber: 'DOE-QNT-44120',
    title: 'Scalable Fault-Tolerant Distributed Quantum Simulation Algorithms',
    fundingAgency: 'Department of Energy (DOE)',
    totalBudget: 750000,
    disbursedAmount: 500000,
    utilizedAmount: 410200,
    startDate: '2023-09-01',
    endDate: '2026-08-31',
    status: 'ACTIVE'
  },
  {
    id: 'GRT-2024-03',
    grantNumber: 'NIH-BIO-31902',
    title: 'Targeted High-Fidelity CRISPR-Cas12 Delivery in Plant Genomics',
    fundingAgency: 'National Institutes of Health (NIH)',
    totalBudget: 340000,
    disbursedAmount: 340000,
    utilizedAmount: 332000,
    startDate: '2023-03-01',
    endDate: '2025-02-28',
    status: 'AUDITED'
  }
];

export const INITIAL_PUBLICATIONS: Publication[] = [
  {
    id: 'PUB-101',
    title: 'Hierarchical Graphene-MoS2 Heterostructures for Femtomolar Glucose Biosensing',
    authors: ['Dr. Elena Sharma', 'Priya Nair', 'C. H. Wu'],
    journal: 'Nature Nanotechnology',
    year: 2024,
    doi: '10.1038/s41565-024-01642-x',
    status: 'PUBLISHED',
    linkedProjectId: 'PRJ-2024-01',
    citations: 28
  },
  {
    id: 'PUB-102',
    title: 'Topological Protection in Multi-Qubit Noisy Intermediate-Scale Architectures',
    authors: ['Prof. Marcus Vance', 'A. Rivera', 'Elena Sharma'],
    journal: 'IEEE Transactions on Quantum Engineering',
    year: 2024,
    doi: '10.1109/TQE.2024.3391820',
    status: 'PUBLISHED',
    linkedProjectId: 'PRJ-2024-02',
    citations: 14
  },
  {
    id: 'PUB-103',
    title: 'Orthogonal PAM Cas12 Ribonucleoproteins for Precision Plant Crop Genome Editing',
    authors: ['Priya Nair', 'Dr. Elena Sharma'],
    journal: 'Plant Biotechnology Journal',
    year: 2025,
    doi: '10.1111/pbi.14299',
    status: 'ACCEPTED',
    linkedProjectId: 'PRJ-2024-01',
    citations: 6
  }
];

export const INITIAL_PROJECTS: ResearchProject[] = [
  {
    id: 'PRJ-2024-01',
    code: 'NANO-BIO-01',
    title: 'Graphene-Based Biosensors for Early Detection of Oncogenic Biomarkers',
    abstract: 'Development of scalable, non-invasive point-of-care bio-sensing platforms utilizing 2D functionalized graphene nanosheets for femtomolar level cancer biomarker detection.',
    department: 'Department of Nanotechnology & Materials',
    leadPI: INITIAL_USERS[1],
    coInvestigators: [INITIAL_USERS[2]],
    status: 'ACTIVE',
    startDate: '2024-02-01',
    endDate: '2026-06-30',
    budget: 480000,
    grantId: 'GRT-2024-01',
    grantDetails: INITIAL_GRANTS[0],
    milestones: [
      { id: 'M-1', title: 'Synthesis and chemical functionalization of graphene oxide sheets', dueDate: '2024-06-30', completed: true, description: 'Chemical vapor deposition and acid reflux treatment with Raman spectroscopy validation.' },
      { id: 'M-2', title: 'Electrochemical impedance characterization with antigen binding', dueDate: '2024-12-15', completed: true, description: 'Nyquist plot analysis and limit-of-detection (LOD) calibration.' },
      { id: 'M-3', title: 'Clinical microfluidic prototype fabrication', dueDate: '2025-08-30', completed: false, description: 'Integration of PDMS channels with electrode arrays.' },
      { id: 'M-4', title: 'In-vitro validation and peer-reviewed journal submission', dueDate: '2026-04-15', completed: false, description: 'Testing with blinded serum samples and final publication release.' }
    ]
  },
  {
    id: 'PRJ-2024-02',
    code: 'QNT-COMP-02',
    title: 'Scalable Quantum Noise Mitigation for Cloud High-Performance Simulators',
    abstract: 'Investigating dynamical decoupling pulses and error-mitigated tensor network contractions on 64-qubit simulated quantum processors.',
    department: 'Department of Computer Science & Quantum Computing',
    leadPI: INITIAL_USERS[0],
    coInvestigators: [INITIAL_USERS[3]],
    status: 'ACTIVE',
    startDate: '2023-09-01',
    endDate: '2026-08-31',
    budget: 750000,
    grantId: 'GRT-2024-02',
    grantDetails: INITIAL_GRANTS[1],
    milestones: [
      { id: 'MQ-1', title: 'Mathematical proof of zero-noise extrapolation bounds', dueDate: '2024-03-31', completed: true, description: 'Theoretical analysis across depolarizing channels.' },
      { id: 'MQ-2', title: 'Benchmark execution on GPU-accelerated cluster', dueDate: '2024-11-20', completed: true, description: 'Comparison against standard Qiskit Aer simulation.' },
      { id: 'MQ-3', title: 'Scalable library release on GitHub with open documentation', dueDate: '2025-10-01', completed: false, description: 'Packaging Python/C++ bindings for scientific community.' }
    ]
  },
  {
    id: 'PRJ-2025-03',
    code: 'BIO-GEN-03',
    title: 'CRISPR Gene Editing for Saline Soil Resistance in Cereals',
    abstract: 'Investigating epigenetic and targeted promoter alterations to enhance osmotic tolerance and drought adaptation in staple food grain crops.',
    department: 'Department of Biotechnology',
    leadPI: INITIAL_USERS[1],
    coInvestigators: [INITIAL_USERS[2]],
    status: 'UNDER_REVIEW',
    startDate: '2025-04-01',
    endDate: '2027-03-31',
    budget: 310000,
    grantId: 'GRT-2024-03',
    grantDetails: INITIAL_GRANTS[2],
    milestones: [
      { id: 'MB-1', title: 'Target loci sequence verification via Sanger and NGS', dueDate: '2025-07-31', completed: false, description: 'High-throughput sequencing analysis of candidate stress genes.' },
      { id: 'MB-2', title: 'Greenhouse trial stress simulation', dueDate: '2026-02-28', completed: false, description: 'Salinity gradient evaluation under automated climate control.' }
    ]
  }
];

export const INITIAL_LABS: Laboratory[] = [
  {
    id: 'LAB-01',
    name: 'Advanced Nanotechnology & Surface Characterization Facility',
    code: 'ANSC-304',
    department: 'Nanotechnology & Materials Science',
    building: 'Sir C.V. Raman Science Complex',
    roomNumber: 'Room 304, 3rd Floor',
    supervisor: INITIAL_USERS[1],
    capacity: 20,
    safetyLevel: 'BSL-2',
    status: 'OPERATIONAL',
    contactExtension: 'Ext. 4120'
  },
  {
    id: 'LAB-02',
    name: 'High-Performance Quantum Computing & Bioinformatics Cluster',
    code: 'HPC-101',
    department: 'Computer Science & AI',
    building: 'Alan Turing Computing Tower',
    roomNumber: 'Room 101, Ground Floor',
    supervisor: INITIAL_USERS[0],
    capacity: 35,
    safetyLevel: 'GENERAL_LAB',
    status: 'OPERATIONAL',
    contactExtension: 'Ext. 8831'
  },
  {
    id: 'LAB-03',
    name: 'Molecular Genomics & High-Throughput Proteomics Lab',
    code: 'MGHP-215',
    department: 'Biotechnology & Life Sciences',
    building: 'Rosalind Franklin Life Sciences Wing',
    roomNumber: 'Room 215, 2nd Floor',
    supervisor: INITIAL_USERS[1],
    capacity: 15,
    safetyLevel: 'BSL-3',
    status: 'OPERATIONAL',
    contactExtension: 'Ext. 3904'
  },
  {
    id: 'LAB-04',
    name: 'Autonomous Robotics & Cyber-Physical Systems Lab',
    code: 'RCPS-410',
    department: 'Mechanical & Mechatronics Engineering',
    building: 'Edison Innovation Annex',
    roomNumber: 'Room 410, 4th Floor',
    supervisor: INITIAL_USERS[0],
    capacity: 25,
    safetyLevel: 'GENERAL_LAB',
    status: 'MAINTENANCE',
    contactExtension: 'Ext. 7712'
  }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'EQ-001',
    assetTag: 'UNI-EQ-2022-81',
    name: 'Field Emission Scanning Electron Microscope (FE-SEM)',
    model: 'GeminiSEM 500',
    manufacturer: 'Carl Zeiss Microscopy',
    laboratoryId: 'LAB-01',
    labName: 'Advanced Nanotechnology & Surface Characterization Facility',
    status: 'AVAILABLE',
    hourlyRate: 65,
    requiresTraining: true,
    lastCalibratedDate: '2024-10-15',
    nextServiceDate: '2025-04-15',
    specs: 'Resolution 0.6 nm at 15 kV, In-lens SE/BSE detectors, Oxford EDS system.'
  },
  {
    id: 'EQ-002',
    assetTag: 'UNI-EQ-2023-45',
    name: 'High-Resolution Orbitrap Mass Spectrometer',
    model: 'Orbitrap Exploris 240',
    manufacturer: 'Thermo Fisher Scientific',
    laboratoryId: 'LAB-03',
    labName: 'Molecular Genomics & High-Throughput Proteomics Lab',
    status: 'IN_USE',
    hourlyRate: 85,
    requiresTraining: true,
    lastCalibratedDate: '2024-11-01',
    nextServiceDate: '2025-05-01',
    specs: 'Resolving power up to 240,000 at m/z 200, sub-ppm mass accuracy.'
  },
  {
    id: 'EQ-003',
    assetTag: 'UNI-EQ-2024-12',
    name: 'Confocal Laser Scanning Microscope (CLSM)',
    model: 'TCS SP8 DIVE',
    manufacturer: 'Leica Microsystems',
    laboratoryId: 'LAB-03',
    labName: 'Molecular Genomics & High-Throughput Proteomics Lab',
    status: 'AVAILABLE',
    hourlyRate: 50,
    requiresTraining: true,
    lastCalibratedDate: '2024-12-10',
    nextServiceDate: '2025-06-10',
    specs: 'Multiphoton imaging, 405/488/561/633 nm solid-state excitation lasers.'
  },
  {
    id: 'EQ-004',
    assetTag: 'UNI-EQ-2021-99',
    name: 'NVIDIA DGX H100 GPU Accelerated Compute Node',
    model: 'DGX H100 8x80GB',
    manufacturer: 'NVIDIA Enterprise',
    laboratoryId: 'LAB-02',
    labName: 'High-Performance Quantum Computing & Bioinformatics Cluster',
    status: 'AVAILABLE',
    hourlyRate: 40,
    requiresTraining: false,
    lastCalibratedDate: '2024-09-01',
    nextServiceDate: '2025-09-01',
    specs: '640GB total GPU HBM3 memory, 3.2 Tbps InfiniBand interconnect, 32 PFLOPS FP8 AI.'
  },
  {
    id: 'EQ-005',
    assetTag: 'UNI-EQ-2020-33',
    name: 'X-Ray Powder Diffractometer (XRD)',
    model: 'Empyrean 3rd Gen',
    manufacturer: 'Malvern Panalytical',
    laboratoryId: 'LAB-01',
    labName: 'Advanced Nanotechnology & Surface Characterization Facility',
    status: 'CALIBRATION',
    hourlyRate: 45,
    requiresTraining: true,
    lastCalibratedDate: '2024-08-10',
    nextServiceDate: '2025-02-28',
    specs: 'Cu/Co dual tube, high-temperature Anton Paar chamber (-110°C to 1200°C).'
  },
  {
    id: 'EQ-006',
    assetTag: 'UNI-EQ-2022-19',
    name: 'Industrial 6-Axis Collaborative Robot Arm',
    model: 'UR10e Cobot',
    manufacturer: 'Universal Robots',
    laboratoryId: 'LAB-04',
    labName: 'Autonomous Robotics & Cyber-Physical Systems Lab',
    status: 'UNDER_MAINTENANCE',
    hourlyRate: 35,
    requiresTraining: true,
    lastCalibratedDate: '2024-05-12',
    nextServiceDate: '2025-03-20',
    specs: 'Payload 12.5 kg, reach 1300 mm, force/torque sensor precision 0.05 mm repeatability.'
  }
];

export const INITIAL_BOOKINGS: EquipmentBooking[] = [
  {
    id: 'BK-901',
    equipmentId: 'EQ-001',
    equipmentName: 'Field Emission Scanning Electron Microscope (FE-SEM)',
    laboratoryId: 'LAB-01',
    labName: 'Advanced Nanotechnology & Surface Characterization Facility',
    userId: 'USR-003',
    userName: 'Priya Nair',
    userRole: 'SCHOLAR',
    projectId: 'PRJ-2024-01',
    projectName: 'Graphene-Based Biosensors',
    date: '2025-03-10',
    startTime: '09:00',
    endTime: '12:00',
    purpose: 'Morphological characterization of chemical vapor deposition graphene nanosheets',
    safetyCleared: true,
    status: 'APPROVED',
    remarks: 'Approved by Lab Technician Rajesh Kumar. Sample pre-degassed.',
    createdAt: '2025-03-01T10:30:00'
  },
  {
    id: 'BK-902',
    equipmentId: 'EQ-002',
    equipmentName: 'High-Resolution Orbitrap Mass Spectrometer',
    laboratoryId: 'LAB-03',
    labName: 'Molecular Genomics & High-Throughput Proteomics Lab',
    userId: 'USR-002',
    userName: 'Dr. Elena Sharma',
    userRole: 'PI',
    projectId: 'PRJ-2024-01',
    projectName: 'Graphene-Based Biosensors',
    date: '2025-03-11',
    startTime: '13:00',
    endTime: '17:00',
    purpose: 'Proteomic peptide profiling of antibody-conjugated nanomaterial conjugates',
    safetyCleared: true,
    status: 'PENDING',
    remarks: 'Awaiting technician pre-run calibration confirmation.',
    createdAt: '2025-03-02T14:15:00'
  },
  {
    id: 'BK-903',
    equipmentId: 'EQ-004',
    equipmentName: 'NVIDIA DGX H100 GPU Accelerated Compute Node',
    laboratoryId: 'LAB-02',
    labName: 'High-Performance Quantum Computing & Bioinformatics Cluster',
    userId: 'USR-003',
    userName: 'Priya Nair',
    userRole: 'SCHOLAR',
    projectId: 'PRJ-2025-03',
    projectName: 'CRISPR Gene Editing for Saline Soil Resistance',
    date: '2025-03-12',
    startTime: '10:00',
    endTime: '18:00',
    purpose: 'Molecular dynamics simulation of Cas12 target DNA unwinding kinetics',
    safetyCleared: true,
    status: 'APPROVED',
    remarks: 'Pre-allocated compute slot approved.',
    createdAt: '2025-03-03T09:00:00'
  }
];

export const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'MNT-001',
    equipmentId: 'EQ-005',
    equipmentName: 'X-Ray Powder Diffractometer (XRD)',
    serviceDate: '2025-02-20',
    technicianName: 'Rajesh Kumar',
    issueReported: 'Goniometer angular drift exceeding 0.02 degrees 2-theta during NIST silicon 640d alignment.',
    actionTaken: 'Optics recalibrated, detector slits realigned, fresh silicon reference peak verified within 0.003 degrees.',
    nextScheduledDate: '2025-08-20',
    cost: 1450,
    status: 'RESOLVED'
  },
  {
    id: 'MNT-002',
    equipmentId: 'EQ-006',
    equipmentName: 'Industrial 6-Axis Collaborative Robot Arm',
    serviceDate: '2025-03-01',
    technicianName: 'Rajesh Kumar',
    issueReported: 'Joint 3 servo temperature warning interlock triggering under full payload test.',
    actionTaken: 'Harmonic drive inspected, replacement brushless motor module requested from OEM.',
    nextScheduledDate: '2025-03-25',
    cost: 2800,
    status: 'PENDING_PARTS'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-001',
    code: 'CHM-ACE-500',
    name: 'Acetone, HPLC Grade (99.9%)',
    category: 'CHEMICAL',
    hazardLevel: 'FLAMMABLE',
    labId: 'LAB-01',
    labName: 'Advanced Nanotechnology Lab',
    currentStock: 4,
    minThreshold: 10,
    unit: 'Liters',
    locationShelf: 'Flammable Cabinet A-02',
    supplier: 'Sigma-Aldrich Chemical Co.',
    expiryDate: '2026-11-30',
    unitCost: 45
  },
  {
    id: 'INV-002',
    code: 'CHM-HNO3-65',
    name: 'Nitric Acid, TraceMetal Grade (65%)',
    category: 'CHEMICAL',
    hazardLevel: 'CORROSIVE',
    labId: 'LAB-01',
    labName: 'Advanced Nanotechnology Lab',
    currentStock: 8,
    minThreshold: 5,
    unit: 'Liters',
    locationShelf: 'Corrosives Safety Cabinet C-01',
    supplier: 'Fisher Scientific',
    expiryDate: '2027-04-15',
    unitCost: 88
  },
  {
    id: 'INV-003',
    code: 'BIO-CAS12-100',
    name: 'EnGen Lba Cas12a (Cpf1) Nuclease Recombinant',
    category: 'REAGENT',
    hazardLevel: 'BIOHAZARD',
    labId: 'LAB-03',
    labName: 'Molecular Genomics Lab',
    currentStock: 2,
    minThreshold: 5,
    unit: 'Vials (100 pmol)',
    locationShelf: '-80°C Ultra-Low Freezer Box 4B',
    supplier: 'New England Biolabs (NEB)',
    expiryDate: '2026-06-30',
    unitCost: 320
  },
  {
    id: 'INV-004',
    code: 'GLS-BEAK-250',
    name: 'Borosilicate Glass Griffin Beakers (250 mL)',
    category: 'GLASSWARE',
    hazardLevel: 'NON_HAZARDOUS',
    labId: 'LAB-01',
    labName: 'Advanced Nanotechnology Lab',
    currentStock: 48,
    minThreshold: 20,
    unit: 'Units',
    locationShelf: 'Glassware Rack G-12',
    supplier: 'Corning Pyrex',
    unitCost: 9.5
  },
  {
    id: 'INV-005',
    code: 'PPE-NIT-MD',
    name: 'Powder-Free Nitrile Examination Gloves (Size M)',
    category: 'PPE',
    hazardLevel: 'NON_HAZARDOUS',
    labId: 'LAB-03',
    labName: 'Molecular Genomics Lab',
    currentStock: 12,
    minThreshold: 15,
    unit: 'Boxes (100 pcs)',
    locationShelf: 'PPE Station Entry 01',
    supplier: 'Kimberly-Clark Professional',
    expiryDate: '2028-12-31',
    unitCost: 18
  },
  {
    id: 'INV-006',
    code: 'CHM-LN2-DEW',
    name: 'Liquid Nitrogen High-Purity Cryogenic (LN2)',
    category: 'CONSUMABLE',
    hazardLevel: 'TOXIC',
    labId: 'LAB-01',
    labName: 'Advanced Nanotechnology Lab',
    currentStock: 35,
    minThreshold: 50,
    unit: 'Liters',
    locationShelf: 'Cryo Storage Bay 01',
    supplier: 'Air Liquide Gas Solutions',
    unitCost: 4.2
  }
];

export const INITIAL_REQUISITIONS: StockRequisition[] = [
  {
    id: 'REQ-2025-01',
    requisitionNumber: 'REQ-NT-881',
    requestedBy: 'Priya Nair',
    userRole: 'SCHOLAR',
    labId: 'LAB-01',
    labName: 'Advanced Nanotechnology Lab',
    items: [
      { itemId: 'INV-001', itemName: 'Acetone, HPLC Grade (99.9%)', requestedQty: 12, unit: 'Liters', estimatedCost: 540 },
      { itemId: 'INV-006', itemName: 'Liquid Nitrogen High-Purity Cryogenic (LN2)', requestedQty: 100, unit: 'Liters', estimatedCost: 420 }
    ],
    totalEstimatedCost: 960,
    justification: 'Replenishing critically depleted solvent and cryogen reserves for upcoming SEM sample dehydration cycles.',
    status: 'PENDING_PI_APPROVAL',
    requestedDate: '2025-03-03'
  },
  {
    id: 'REQ-2025-02',
    requisitionNumber: 'REQ-BIO-872',
    requestedBy: 'Dr. Elena Sharma',
    userRole: 'PI',
    labId: 'LAB-03',
    labName: 'Molecular Genomics Lab',
    items: [
      { itemId: 'INV-003', itemName: 'EnGen Lba Cas12a (Cpf1) Nuclease Recombinant', requestedQty: 6, unit: 'Vials (100 pmol)', estimatedCost: 1920 }
    ],
    totalEstimatedCost: 1920,
    justification: 'Critical enzyme replenishment for NIH-funded crop gene editing batch.',
    status: 'APPROVED',
    requestedDate: '2025-02-24',
    approvalDate: '2025-02-26'
  }
];

export const INITIAL_SAFETY_AUDITS: SafetyAudit[] = [
  {
    id: 'AUD-2025-01',
    auditNumber: 'AUD-EHS-091',
    labId: 'LAB-03',
    labName: 'Molecular Genomics & High-Throughput Proteomics Lab',
    auditorName: 'Campus Environmental Health & Safety (EHS) Board',
    auditDate: '2025-02-15',
    score: 96,
    findings: [
      'BSL-3 negative pressure airlocks maintained at -30 Pa specifications.',
      'Emergency eyewash station flush rate verified at 1.5 gpm with clear drainage.',
      'HEPA filter certification validated through January 2026.'
    ],
    eyewashFunctional: true,
    fumeHoodCertified: true,
    fireExtinguisherValid: true,
    chemicalStorageCompliant: true,
    ppeComplianceRate: 98,
    status: 'PASSED'
  },
  {
    id: 'AUD-2025-02',
    auditNumber: 'AUD-EHS-088',
    labId: 'LAB-01',
    labName: 'Advanced Nanotechnology & Surface Characterization Facility',
    auditorName: 'University Chemical Safety Officer',
    auditDate: '2025-01-20',
    score: 84,
    findings: [
      'Acetone inventory dropped below emergency threshold; secondary containment updated.',
      'Fumehood face velocity measured at 105 fpm (compliant).',
      'Need to update physical MSDS ring binder on door rack.'
    ],
    eyewashFunctional: true,
    fumeHoodCertified: true,
    fireExtinguisherValid: true,
    chemicalStorageCompliant: true,
    ppeComplianceRate: 92,
    status: 'ACTION_REQUIRED'
  }
];
