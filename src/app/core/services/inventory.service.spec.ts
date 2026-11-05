import { TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should identify low stock items below threshold', () => {
    const alerts = service.lowStockAlerts();
    expect(alerts.length).toBeGreaterThan(0);
    alerts.forEach(item => {
      expect(item.currentStock).toBeLessThanOrEqual(item.minThreshold);
    });
  });

  it('should accurately adjust stock levels on deduction', () => {
    const item = service.inventory()[0];
    const initialStock = item.currentStock;
    service.adjustStock(item.id, -1);
    const updated = service.inventory().find(i => i.id === item.id);
    expect(updated?.currentStock).toBe(initialStock - 1);
  });

  it('should not allow stock levels to drop below zero', () => {
    const item = service.inventory()[0];
    service.adjustStock(item.id, -99999);
    const updated = service.inventory().find(i => i.id === item.id);
    expect(updated?.currentStock).toBe(0);
  });
});
