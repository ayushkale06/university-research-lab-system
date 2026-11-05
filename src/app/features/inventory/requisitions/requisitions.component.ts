import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../../core/services/inventory.service';
import { AuthService } from '../../../core/services/auth.service';
import { StockRequisition, RequisitionStatus } from '../../../core/models/inventory.model';

@Component({
  selector: 'app-requisitions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">Consumables & Reagent Purchase Requisitions</h4>
            <span class="badge bg-secondary">Member 4</span>
          </div>
          <p class="text-muted small mb-0">Multi-tier procurement workflow, financial justification, and stock replenishment</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showCreateModal = true">
          <i class="bi bi-cart-plus me-1"></i> New Stock Requisition
        </button>
      </div>

      <!-- Requisition Cards / Table -->
      <div class="card shadow-sm border">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Req. Number</th>
                  <th>Requested By</th>
                  <th>Laboratory</th>
                  <th>Requested Supplies</th>
                  <th>Total Est. Cost</th>
                  <th>Justification</th>
                  <th>Status</th>
                  <th class="text-end" *ngIf="canApprove()">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let req of invService.requisitions()">
                  <td>
                    <span class="badge bg-light text-primary border font-monospace">{{ req.requisitionNumber }}</span>
                    <div class="text-muted small" style="font-size: 0.65rem;">{{ req.requestedDate }}</div>
                  </td>
                  <td>
                    <div class="fw-semibold small text-dark">{{ req.requestedBy }}</div>
                    <small class="badge bg-light text-secondary border">{{ req.userRole }}</small>
                  </td>
                  <td class="small text-secondary">{{ req.labName }}</td>
                  <td class="small" style="max-width: 260px;">
                    <div *ngFor="let item of req.items" class="text-truncate">
                      • {{ item.itemName }} (<strong>{{ item.requestedQty }} {{ item.unit }}</strong>)
                    </div>
                  </td>
                  <td class="fw-bold small text-success">\${{ req.totalEstimatedCost | number }}</td>
                  <td class="small text-muted" style="max-width: 220px;">
                    <div class="text-truncate" [title]="req.justification">{{ req.justification }}</div>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-warning text-dark': req.status === 'PENDING_PI_APPROVAL',
                      'bg-success': req.status === 'APPROVED',
                      'bg-info text-dark': req.status === 'ORDERED',
                      'bg-secondary': req.status === 'RECEIVED',
                      'bg-danger': req.status === 'REJECTED'
                    }">{{ req.status }}</span>
                  </td>
                  <td class="text-end" *ngIf="canApprove()">
                    <div class="btn-group btn-group-sm" *ngIf="req.status === 'PENDING_PI_APPROVAL'">
                      <button class="btn btn-outline-success" (click)="setStatus(req.id, 'APPROVED')" title="Approve procurement">
                        <i class="bi bi-check-lg"></i>
                      </button>
                      <button class="btn btn-outline-danger" (click)="setStatus(req.id, 'REJECTED')" title="Reject procurement">
                        <i class="bi bi-x-lg"></i>
                      </button>
                    </div>
                    <span *ngIf="req.status !== 'PENDING_PI_APPROVAL'" class="text-muted small">Processed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Requisition Modal -->
    <div *ngIf="showCreateModal" class="modal-backdrop fade show"></div>
    <div *ngIf="showCreateModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fs-6 fw-bold">Submit Purchase Requisition</h5>
            <button type="button" class="btn-close btn-close-white" (click)="showCreateModal = false"></button>
          </div>
          <div class="modal-body p-4">
            <form (ngSubmit)="saveRequisition()">
              <div class="mb-3">
                <label class="form-label small fw-semibold">Select Low-Stock / Target Inventory Item</label>
                <select [(ngModel)]="selectedItemId" name="itemId" class="form-select form-select-sm" required (change)="onItemSelected()">
                  <option *ngFor="let item of invService.inventory()" [value]="item.id">
                    {{ item.name }} (Current: {{ item.currentStock }} {{ item.unit }}) - \${{ item.unitCost }}/unit
                  </option>
                </select>
              </div>

              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Requested Quantity</label>
                  <input type="number" [(ngModel)]="reqQty" name="qty" class="form-control form-control-sm" required min="1">
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">Calculated Total Cost ($)</label>
                  <input type="text" [value]="'$' + (reqQty * getUnitCost())" class="form-control form-control-sm bg-light" readonly>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label small fw-semibold">Research Justification / Grant Allocation</label>
                <textarea [(ngModel)]="reqJustification" name="just" rows="3" class="form-control form-control-sm" required placeholder="Specify why this replenishment is urgent for project continuity..."></textarea>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm" (click)="showCreateModal = false">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Submit for Approval</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RequisitionsComponent {
  invService = inject(InventoryService);
  authService = inject(AuthService);

  showCreateModal = false;
  selectedItemId = '';
  reqQty = 5;
  reqJustification = 'Urgent stock replenishment to support active experiments.';

  canApprove = () => this.authService.hasRole(['ADMIN', 'PI']);

  onItemSelected() {}

  getUnitCost(): number {
    const item = this.invService.inventory().find(i => i.id === this.selectedItemId);
    return item ? item.unitCost : 50;
  }

  setStatus(id: string, status: RequisitionStatus) {
    this.invService.updateRequisitionStatus(id, status);
  }

  saveRequisition() {
    if (!this.selectedItemId) {
      if (this.invService.inventory().length > 0) {
        this.selectedItemId = this.invService.inventory()[0].id;
      } else {
        return;
      }
    }

    const item = this.invService.inventory().find(i => i.id === this.selectedItemId);
    if (!item) return;

    const current = this.authService.currentUser()!;
    const total = this.reqQty * item.unitCost;

    const req: StockRequisition = {
      id: 'REQ-' + Date.now().toString().slice(-4),
      requisitionNumber: 'REQ-MAT-' + Math.floor(100 + Math.random() * 900),
      requestedBy: current.name,
      userRole: current.role,
      labId: item.labId,
      labName: item.labName,
      items: [
        {
          itemId: item.id,
          itemName: item.name,
          requestedQty: Number(this.reqQty),
          unit: item.unit,
          estimatedCost: total
        }
      ],
      totalEstimatedCost: total,
      justification: this.reqJustification,
      status: current.role === 'ADMIN' || current.role === 'PI' ? 'APPROVED' : 'PENDING_PI_APPROVAL',
      requestedDate: new Date().toISOString().split('T')[0]
    };

    this.invService.addRequisition(req);
    this.showCreateModal = false;
  }
}
