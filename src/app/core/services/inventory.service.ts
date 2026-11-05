import { Injectable, signal, computed } from '@angular/core';
import { InventoryItem, StockRequisition, SafetyAudit, RequisitionStatus } from '../models/inventory.model';
import { INITIAL_INVENTORY, INITIAL_REQUISITIONS, INITIAL_SAFETY_AUDITS } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly INV_KEY = 'urlms_inventory';
  private readonly REQ_KEY = 'urlms_requisitions';
  private readonly AUDIT_KEY = 'urlms_audits';

  private invSignal = signal<InventoryItem[]>(this.loadInventory());
  private reqSignal = signal<StockRequisition[]>(this.loadRequisitions());
  private auditSignal = signal<SafetyAudit[]>(this.loadAudits());

  public inventory = computed(() => this.invSignal());
  public requisitions = computed(() => this.reqSignal());
  public safetyAudits = computed(() => this.auditSignal());

  // Alerts for low stock items
  public lowStockAlerts = computed(() => 
    this.invSignal().filter(item => item.currentStock <= item.minThreshold)
  );

  constructor() {}

  private loadInventory(): InventoryItem[] {
    const data = localStorage.getItem(this.INV_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.INV_KEY, JSON.stringify(INITIAL_INVENTORY));
    return [...INITIAL_INVENTORY];
  }

  private loadRequisitions(): StockRequisition[] {
    const data = localStorage.getItem(this.REQ_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.REQ_KEY, JSON.stringify(INITIAL_REQUISITIONS));
    return [...INITIAL_REQUISITIONS];
  }

  private loadAudits(): SafetyAudit[] {
    const data = localStorage.getItem(this.AUDIT_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.AUDIT_KEY, JSON.stringify(INITIAL_SAFETY_AUDITS));
    return [...INITIAL_SAFETY_AUDITS];
  }

  public adjustStock(itemId: string, changeQty: number): boolean {
    const item = this.invSignal().find(i => i.id === itemId);
    if (!item) return false;

    const newStock = Math.max(0, item.currentStock + changeQty);
    const updated = this.invSignal().map(i => i.id === itemId ? { ...i, currentStock: newStock } : i);
    this.invSignal.set(updated);
    localStorage.setItem(this.INV_KEY, JSON.stringify(updated));
    return true;
  }

  public addItem(item: InventoryItem): void {
    const updated = [item, ...this.invSignal()];
    this.invSignal.set(updated);
    localStorage.setItem(this.INV_KEY, JSON.stringify(updated));
  }

  public addRequisition(req: StockRequisition): void {
    const updated = [req, ...this.reqSignal()];
    this.reqSignal.set(updated);
    localStorage.setItem(this.REQ_KEY, JSON.stringify(updated));
  }

  public updateRequisitionStatus(id: string, status: RequisitionStatus): void {
    const updated = this.reqSignal().map(r => {
      if (r.id === id) {
        return {
          ...r,
          status,
          approvalDate: status === 'APPROVED' ? new Date().toISOString().split('T')[0] : r.approvalDate
        };
      }
      return r;
    });
    this.reqSignal.set(updated);
    localStorage.setItem(this.REQ_KEY, JSON.stringify(updated));
  }

  public addSafetyAudit(audit: SafetyAudit): void {
    const updated = [audit, ...this.auditSignal()];
    this.auditSignal.set(updated);
    localStorage.setItem(this.AUDIT_KEY, JSON.stringify(updated));
  }
}
