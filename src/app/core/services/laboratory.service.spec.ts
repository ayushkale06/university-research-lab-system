import { TestBed } from '@angular/core/testing';
import { LaboratoryService } from './laboratory.service';
import { EquipmentBooking } from '../models/laboratory.model';

describe('LaboratoryService', () => {
  let service: LaboratoryService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoryService);
  });

  it('should initialize with default laboratories and equipment', () => {
    expect(service.laboratories().length).toBeGreaterThan(0);
    expect(service.equipment().length).toBeGreaterThan(0);
  });

  it('should detect booking slot conflict for overlapping times', () => {
    const existing = service.bookings()[0];
    const isConflict = service.checkBookingConflict(
      existing.equipmentId,
      existing.date,
      existing.startTime,
      existing.endTime
    );
    expect(isConflict).toBe(true);
  });

  it('should permit non-conflicting booking requests', () => {
    const booking: EquipmentBooking = {
      id: 'BK-TEST-100',
      equipmentId: 'EQ-001',
      equipmentName: 'Test FE-SEM',
      laboratoryId: 'LAB-01',
      labName: 'Nano Lab',
      userId: 'USR-003',
      userName: 'Priya Nair',
      userRole: 'SCHOLAR',
      date: '2026-12-25',
      startTime: '10:00',
      endTime: '12:00',
      purpose: 'Verification test run',
      safetyCleared: true,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    const res = service.createBooking(booking);
    expect(res.success).toBe(true);
    expect(service.bookings().some(b => b.id === 'BK-TEST-100')).toBe(true);
  });

  it('should update booking status when approved by technician', () => {
    const booking = service.bookings()[0];
    service.updateBookingStatus(booking.id, 'APPROVED', 'Technician approved');
    const updated = service.bookings().find(b => b.id === booking.id);
    expect(updated?.status).toBe('APPROVED');
    expect(updated?.remarks).toBe('Technician approved');
  });
});
