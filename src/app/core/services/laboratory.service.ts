import { Injectable, signal, computed } from '@angular/core';
import { Laboratory, Equipment, EquipmentBooking, MaintenanceRecord, BookingStatus } from '../models/laboratory.model';
import { INITIAL_LABS, INITIAL_EQUIPMENT, INITIAL_BOOKINGS, INITIAL_MAINTENANCE } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {
  private readonly LABS_KEY = 'urlms_labs';
  private readonly EQUIP_KEY = 'urlms_equipment';
  private readonly BOOKINGS_KEY = 'urlms_bookings';
  private readonly MAINT_KEY = 'urlms_maintenance';

  private labsSignal = signal<Laboratory[]>(this.loadLabs());
  private equipSignal = signal<Equipment[]>(this.loadEquipment());
  private bookingsSignal = signal<EquipmentBooking[]>(this.loadBookings());
  private maintSignal = signal<MaintenanceRecord[]>(this.loadMaintenance());

  public laboratories = computed(() => this.labsSignal());
  public equipment = computed(() => this.equipSignal());
  public bookings = computed(() => this.bookingsSignal());
  public maintenanceRecords = computed(() => this.maintSignal());

  constructor() {}

  private loadLabs(): Laboratory[] {
    const data = localStorage.getItem(this.LABS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.LABS_KEY, JSON.stringify(INITIAL_LABS));
    return [...INITIAL_LABS];
  }

  private loadEquipment(): Equipment[] {
    const data = localStorage.getItem(this.EQUIP_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.EQUIP_KEY, JSON.stringify(INITIAL_EQUIPMENT));
    return [...INITIAL_EQUIPMENT];
  }

  private loadBookings(): EquipmentBooking[] {
    const data = localStorage.getItem(this.BOOKINGS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
    return [...INITIAL_BOOKINGS];
  }

  private loadMaintenance(): MaintenanceRecord[] {
    const data = localStorage.getItem(this.MAINT_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.MAINT_KEY, JSON.stringify(INITIAL_MAINTENANCE));
    return [...INITIAL_MAINTENANCE];
  }

  public getLabById(id: string): Laboratory | undefined {
    return this.labsSignal().find(l => l.id === id);
  }

  public getEquipmentById(id: string): Equipment | undefined {
    return this.equipSignal().find(e => e.id === id);
  }

  public checkBookingConflict(equipmentId: string, date: string, startTime: string, endTime: string): boolean {
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

  public createBooking(booking: EquipmentBooking): { success: boolean; message: string } {
    if (this.checkBookingConflict(booking.equipmentId, booking.date, booking.startTime, booking.endTime)) {
      return { success: false, message: 'Equipment is already reserved during this time slot.' };
    }
    const updated = [booking, ...this.bookingsSignal()];
    this.bookingsSignal.set(updated);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(updated));
    return { success: true, message: 'Booking request submitted successfully!' };
  }

  public updateBookingStatus(bookingId: string, status: BookingStatus, remarks?: string): void {
    const updated = this.bookingsSignal().map(b => {
      if (b.id === bookingId) {
        return { ...b, status, remarks: remarks || b.remarks };
      }
      return b;
    });
    this.bookingsSignal.set(updated);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(updated));
  }

  public addMaintenanceRecord(record: MaintenanceRecord): void {
    const updated = [record, ...this.maintSignal()];
    this.maintSignal.set(updated);
    localStorage.setItem(this.MAINT_KEY, JSON.stringify(updated));
  }

  public updateEquipmentStatus(equipmentId: string, status: Equipment['status']): void {
    const updated = this.equipSignal().map(e => e.id === equipmentId ? { ...e, status } : e);
    this.equipSignal.set(updated);
    localStorage.setItem(this.EQUIP_KEY, JSON.stringify(updated));
  }
}
