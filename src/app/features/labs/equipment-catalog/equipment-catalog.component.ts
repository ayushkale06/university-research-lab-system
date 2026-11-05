import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { Equipment } from '../../../core/models/laboratory.model';

@Component({
  selector: 'app-equipment-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">High-End Instrumentation & Equipment Catalog</h4>
            <span class="badge bg-secondary">Member 3</span>
          </div>
          <p class="text-muted small mb-0">Shared scientific infrastructure, technical specifications, and live operational status</p>
        </div>
        <a routerLink="/bookings" class="btn btn-primary btn-sm">
          <i class="bi bi-calendar-check me-1"></i> View / Manage Bookings
        </a>
      </div>

      <!-- Search & Filters -->
      <div class="card mb-4">
        <div class="card-body p-3">
          <div class="row g-2 align-items-center">
            <div class="col-12 col-md-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
                <input type="text" [(ngModel)]="searchQuery" class="form-control" placeholder="Search instrument name, model, manufacturer...">
              </div>
            </div>
            <div class="col-12 col-md-3">
              <select [(ngModel)]="statusFilter" class="form-select form-select-sm">
                <option value="ALL">All Operational States</option>
                <option value="AVAILABLE">Available</option>
                <option value="IN_USE">Currently In-Use</option>
                <option value="CALIBRATION">Under Calibration</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
              </select>
            </div>
            <div class="col-12 col-md-3 text-md-end text-muted small">
              Showing <strong>{{ filteredEquipment().length }}</strong> Instruments
            </div>
          </div>
        </div>
      </div>

      <!-- Equipment Cards Grid -->
      <div class="row g-4">
        <div class="col-12 col-lg-6" *ngFor="let eq of filteredEquipment()">
          <div class="card h-100 shadow-sm border">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-start">
              <div>
                <span class="badge bg-light text-secondary border font-monospace me-2">{{ eq.assetTag }}</span>
                <span class="badge" [ngClass]="{
                  'bg-success': eq.status === 'AVAILABLE',
                  'bg-primary': eq.status === 'IN_USE',
                  'bg-warning text-dark': eq.status === 'CALIBRATION',
                  'bg-danger': eq.status === 'UNDER_MAINTENANCE',
                  'bg-dark': eq.status === 'OUT_OF_ORDER'
                }">{{ eq.status }}</span>
                <h5 class="fw-bold text-dark mt-2 mb-1 fs-6">{{ eq.name }}</h5>
                <small class="text-muted"><i class="bi bi-building me-1"></i> {{ eq.labName }}</small>
              </div>
              <div class="text-end">
                <div class="fw-bold text-primary fs-5">\${{ eq.hourlyRate }}<small class="fs-7 text-muted">/hr</small></div>
                <small class="badge bg-light text-secondary border" *ngIf="eq.requiresTraining">Training Req.</small>
              </div>
            </div>

            <div class="card-body">
              <div class="p-2 rounded bg-light mb-3">
                <div class="small fw-semibold text-secondary">
                  <strong>Make & Model:</strong> {{ eq.manufacturer }} • {{ eq.model }}
                </div>
                <p class="small text-muted mb-0 mt-1 font-monospace" style="font-size: 0.775rem;">
                  {{ eq.specs }}
                </p>
              </div>

              <div class="row g-2 text-muted small" style="font-size: 0.75rem;">
                <div class="col-6">
                  <i class="bi bi-calendar-check text-success me-1"></i> Last Calibrated: <strong>{{ eq.lastCalibratedDate }}</strong>
                </div>
                <div class="col-6">
                  <i class="bi bi-wrench text-warning me-1"></i> Next Inspection: <strong>{{ eq.nextServiceDate }}</strong>
                </div>
              </div>
            </div>

            <div class="card-footer bg-white border-top py-2 d-flex justify-content-between align-items-center">
              <span class="small text-muted">Asset Tag: {{ eq.assetTag }}</span>
              <a [routerLink]="['/bookings']" [queryParams]="{ equipId: eq.id }" class="btn btn-primary btn-sm py-1 px-3" [class.disabled]="eq.status === 'UNDER_MAINTENANCE' || eq.status === 'OUT_OF_ORDER'">
                <i class="bi bi-calendar2-plus me-1"></i> Reserve Slot
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EquipmentCatalogComponent {
  labService = inject(LaboratoryService);

  searchQuery = '';
  statusFilter = 'ALL';

  filteredEquipment = () => {
    return this.labService.equipment().filter(eq => {
      const matchStatus = this.statusFilter === 'ALL' || eq.status === this.statusFilter;
      const matchQuery = !this.searchQuery ||
        eq.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        eq.model.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        eq.manufacturer.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        eq.labName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchStatus && matchQuery;
    });
  };
}
