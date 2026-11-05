import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../../core/services/inventory.service';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { InventoryItem, HazardLevel, InventoryCategory } from '../../../core/models/inventory.model';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">Chemicals, Reagents & Consumables Inventory</h4>
            <span class="badge bg-secondary">Member 4</span>
          </div>
          <p class="text-muted small mb-0">Hazardous substance tracking, safety storage containment, and stock threshold monitoring</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showAddModal = true">
          <i class="bi bi-plus-circle me-1"></i> Add Inventory Item
        </button>
      </div>

      <!-- Critical Threshold Alert Banner -->
      <div class="alert alert-danger border-danger-subtle shadow-sm d-flex align-items-center justify-content-between mb-4" *ngIf="invService.lowStockAlerts().length > 0">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-exclamation-triangle-fill fs-4 text-danger"></i>
          <div>
            <strong>Critical Supply Alert:</strong> {{ invService.lowStockAlerts().length }} item(s) are below the mandatory minimum reorder threshold!
          </div>
        </div>
        <span class="badge bg-danger">Requisition Advised</span>
      </div>

      <!-- Search & Filters -->
      <div class="card mb-4">
        <div class="card-body p-3">
          <div class="row g-2 align-items-center">
            <div class="col-12 col-md-5">
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
                <input type="text" [(ngModel)]="searchQuery" class="form-control" placeholder="Search chemical name, code, shelf location...">
              </div>
            </div>
            <div class="col-12 col-md-3">
              <select [(ngModel)]="categoryFilter" class="form-select form-select-sm">
                <option value="ALL">All Categories</option>
                <option value="CHEMICAL">Chemicals</option>
                <option value="REAGENT">Biological Reagents</option>
                <option value="GLASSWARE">Glassware</option>
                <option value="PPE">Safety & PPE</option>
                <option value="CONSUMABLE">General Consumables</option>
              </select>
            </div>
            <div class="col-12 col-md-4 text-md-end text-muted small">
              Showing <strong>{{ filteredInventory().length }}</strong> Catalog Items
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Table -->
      <div class="card shadow-sm border">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Code</th>
                  <th>Item Name & Supplier</th>
                  <th>Category</th>
                  <th>Hazard Class</th>
                  <th>Stock Level</th>
                  <th>Shelf Location</th>
                  <th>Unit Cost</th>
                  <th class="text-end">Quick Adjust</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of filteredInventory()">
                  <td>
                    <span class="badge bg-light text-primary border font-monospace">{{ item.code }}</span>
                  </td>
                  <td>
                    <div class="fw-semibold text-dark small">{{ item.name }}</div>
                    <small class="text-muted">{{ item.supplier }}</small>
                  </td>
                  <td>
                    <span class="badge bg-secondary-subtle text-secondary">{{ item.category }}</span>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-danger': item.hazardLevel === 'FLAMMABLE' || item.hazardLevel === 'TOXIC',
                      'bg-warning text-dark': item.hazardLevel === 'CORROSIVE',
                      'bg-info text-dark': item.hazardLevel === 'BIOHAZARD',
                      'bg-secondary': item.hazardLevel === 'NON_HAZARDOUS'
                    }">
                      <i class="bi bi-exclamation-diamond me-1" *ngIf="item.hazardLevel !== 'NON_HAZARDOUS'"></i>
                      {{ item.hazardLevel }}
                    </span>
                  </td>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <span class="fw-bold" [class.text-danger]="item.currentStock <= item.minThreshold">
                        {{ item.currentStock }} {{ item.unit }}
                      </span>
                      <span *ngIf="item.currentStock <= item.minThreshold" class="badge bg-danger-subtle text-danger" style="font-size: 0.65rem;">
                        LOW (Min: {{ item.minThreshold }})
                      </span>
                    </div>
                  </td>
                  <td class="small text-muted font-monospace">{{ item.locationShelf }}</td>
                  <td class="small fw-semibold">\${{ item.unitCost }}</td>
                  <td class="text-end">
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-danger py-0 px-2" (click)="adjustStock(item.id, -1)" title="Deduct 1 unit (used)">
                        <i class="bi bi-dash"></i>
                      </button>
                      <button class="btn btn-outline-success py-0 px-2" (click)="adjustStock(item.id, 1)" title="Add 1 unit (received)">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Item Modal -->
    <div *ngIf="showAddModal" class="modal-backdrop fade show"></div>
    <div *ngIf="showAddModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title fs-6 fw-bold">Register Inventory / Chemical Compound</h5>
            <button type="button" class="btn-close btn-close-white" (click)="showAddModal = false"></button>
          </div>
          <div class="modal-body p-4">
            <form (ngSubmit)="saveItem()">
              <div class="row g-2 mb-2">
                <div class="col-8">
                  <label class="form-label small fw-semibold">Item Name & Purity</label>
                  <input type="text" [(ngModel)]="newItem.name" name="name" class="form-control form-control-sm" required placeholder="e.g. Isopropanol, ACS Reagent (≥99.5%)">
                </div>
                <div class="col-4">
                  <label class="form-label small fw-semibold">Item Code</label>
                  <input type="text" [(ngModel)]="newItem.code" name="code" class="form-control form-control-sm" required placeholder="CHM-IPA-100">
                </div>
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Category</label>
                  <select [(ngModel)]="newItem.category" name="cat" class="form-select form-select-sm">
                    <option value="CHEMICAL">Chemical</option>
                    <option value="REAGENT">Biological Reagent</option>
                    <option value="GLASSWARE">Glassware</option>
                    <option value="PPE">Safety & PPE</option>
                    <option value="CONSUMABLE">General Consumable</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">Hazard Class</label>
                  <select [(ngModel)]="newItem.hazardLevel" name="haz" class="form-select form-select-sm">
                    <option value="NON_HAZARDOUS">Non-Hazardous</option>
                    <option value="FLAMMABLE">Flammable</option>
                    <option value="CORROSIVE">Corrosive</option>
                    <option value="TOXIC">Toxic</option>
                    <option value="BIOHAZARD">Biohazard</option>
                  </select>
                </div>
              </div>
              <div class="row g-2 mb-2">
                <div class="col-4">
                  <label class="form-label small fw-semibold">Initial Quantity</label>
                  <input type="number" [(ngModel)]="newItem.currentStock" name="stock" class="form-control form-control-sm" required>
                </div>
                <div class="col-4">
                  <label class="form-label small fw-semibold">Min. Alert Threshold</label>
                  <input type="number" [(ngModel)]="newItem.minThreshold" name="min" class="form-control form-control-sm" required>
                </div>
                <div class="col-4">
                  <label class="form-label small fw-semibold">Unit</label>
                  <input type="text" [(ngModel)]="newItem.unit" name="unit" class="form-control form-control-sm" required placeholder="Liters, Vials, Units">
                </div>
              </div>
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Shelf / Cabinet Location</label>
                  <input type="text" [(ngModel)]="newItem.locationShelf" name="shelf" class="form-control form-control-sm" required placeholder="Cabinet C-04, Shelf 2">
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">Supplier</label>
                  <input type="text" [(ngModel)]="newItem.supplier" name="supp" class="form-control form-control-sm" required placeholder="Sigma-Aldrich">
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm" (click)="showAddModal = false">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Add Item</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InventoryListComponent {
  invService = inject(InventoryService);
  labService = inject(LaboratoryService);

  searchQuery = '';
  categoryFilter = 'ALL';
  showAddModal = false;

  newItem: Partial<InventoryItem> = {
    name: '',
    code: '',
    category: 'CHEMICAL',
    hazardLevel: 'FLAMMABLE',
    currentStock: 10,
    minThreshold: 5,
    unit: 'Liters',
    locationShelf: 'Cabinet F-01',
    supplier: 'Sigma-Aldrich Chemical',
    unitCost: 55
  };

  filteredInventory = () => {
    return this.invService.inventory().filter(item => {
      const matchCat = this.categoryFilter === 'ALL' || item.category === this.categoryFilter;
      const matchQuery = !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.locationShelf.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  };

  adjustStock(id: string, delta: number) {
    this.invService.adjustStock(id, delta);
  }

  saveItem() {
    if (!this.newItem.name || !this.newItem.code) return;

    const item: InventoryItem = {
      id: 'INV-' + Math.floor(100 + Math.random() * 900),
      code: this.newItem.code,
      name: this.newItem.name,
      category: (this.newItem.category as InventoryCategory) || 'CHEMICAL',
      hazardLevel: (this.newItem.hazardLevel as HazardLevel) || 'NON_HAZARDOUS',
      labId: 'LAB-01',
      labName: 'Central Advanced Lab',
      currentStock: Number(this.newItem.currentStock) || 1,
      minThreshold: Number(this.newItem.minThreshold) || 5,
      unit: this.newItem.unit || 'Units',
      locationShelf: this.newItem.locationShelf || 'Shelf A',
      supplier: this.newItem.supplier || 'Standard Supplier',
      unitCost: Number(this.newItem.unitCost) || 25
    };

    this.invService.addItem(item);
    this.showAddModal = false;
  }
}
