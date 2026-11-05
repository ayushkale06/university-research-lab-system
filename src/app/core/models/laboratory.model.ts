import { User } from './user.model';

export type LabStatus = 'OPERATIONAL' | 'MAINTENANCE' | 'RESTRICTED';
export type SafetyLevel = 'BSL-1' | 'BSL-2' | 'BSL-3' | 'GENERAL_LAB';

export interface Laboratory {
  id: string;
  name: string;
  code: string;
  department: string;
  building: string;
  roomNumber: string;
  supervisor: User;
  capacity: number;
  safetyLevel: SafetyLevel;
  status: LabStatus;
  contactExtension: string;
}

export type EquipmentStatus = 'AVAILABLE' | 'IN_USE' | 'CALIBRATION' | 'UNDER_MAINTENANCE' | 'OUT_OF_ORDER';

export interface Equipment {
  id: string;
  assetTag: string;
  name: string;
  model: string;
  manufacturer: string;
  laboratoryId: string;
  labName: string;
  status: EquipmentStatus;
  hourlyRate: number;
  requiresTraining: boolean;
  lastCalibratedDate: string;
  nextServiceDate: string;
  specs: string;
}

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

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  equipmentName: string;
  serviceDate: string;
  technicianName: string;
  issueReported: string;
  actionTaken: string;
  nextScheduledDate: string;
  cost: number;
  status: 'RESOLVED' | 'PENDING_PARTS' | 'SCHEDULED';
}
