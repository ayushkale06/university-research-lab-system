export type HazardLevel = 'NON_HAZARDOUS' | 'FLAMMABLE' | 'CORROSIVE' | 'TOXIC' | 'BIOHAZARD';
export type InventoryCategory = 'CHEMICAL' | 'REAGENT' | 'GLASSWARE' | 'PPE' | 'CONSUMABLE' | 'ELECTRONICS';

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: InventoryCategory;
  hazardLevel: HazardLevel;
  labId: string;
  labName: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  locationShelf: string;
  supplier: string;
  expiryDate?: string;
  unitCost: number;
  msdsUrl?: string;
}

export type RequisitionStatus = 'PENDING_PI_APPROVAL' | 'APPROVED' | 'ORDERED' | 'RECEIVED' | 'REJECTED';

export interface RequisitionItem {
  itemId: string;
  itemName: string;
  requestedQty: number;
  unit: string;
  estimatedCost: number;
}

export interface StockRequisition {
  id: string;
  requisitionNumber: string;
  requestedBy: string;
  userRole: string;
  labId: string;
  labName: string;
  items: RequisitionItem[];
  totalEstimatedCost: number;
  justification: string;
  status: RequisitionStatus;
  requestedDate: string;
  approvalDate?: string;
}

export interface SafetyAudit {
  id: string;
  auditNumber: string;
  labId: string;
  labName: string;
  auditorName: string;
  auditDate: string;
  score: number;
  findings: string[];
  eyewashFunctional: boolean;
  fumeHoodCertified: boolean;
  fireExtinguisherValid: boolean;
  chemicalStorageCompliant: boolean;
  ppeComplianceRate: number;
  status: 'PASSED' | 'ACTION_REQUIRED' | 'CRITICAL';
}
