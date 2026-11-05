import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ProjectService } from '../../core/services/project.service';
import { LaboratoryService } from '../../core/services/laboratory.service';
import { InventoryService } from '../../core/services/inventory.service';
import { Grant } from '../../core/models/project.model';
import { EquipmentBooking } from '../../core/models/laboratory.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mb-4">
      <!-- Welcome Header -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 bg-white p-4 rounded-4 shadow-sm border">
        <div class="d-flex align-items-center gap-3">
          <img [src]="authService.currentUser()?.avatarUrl" class="rounded-circle border border-2 border-primary" width="56" height="56" style="object-fit: cover;">
          <div>
            <div class="d-flex align-items-center gap-2">
              <h4 class="fw-bold mb-0 text-dark">Welcome back, {{ authService.currentUser()?.name }}</h4>
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle">{{ authService.currentRole() }}</span>
            </div>
            <p class="text-muted small mb-0 mt-1">
              {{ authService.currentUser()?.designation }} • {{ authService.currentUser()?.department }}
            </p>
          </div>
        </div>

        <div class="d-flex gap-2">
          <a routerLink="/bookings" class="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
            <i class="bi bi-calendar-plus"></i> Reserve Equipment
          </a>
          <a routerLink="/projects" class="btn btn-primary btn-sm d-flex align-items-center gap-1">
            <i class="bi bi-file-earmark-plus"></i> Submit Proposal
          </a>
        </div>
      </div>
    </div>

    <!-- Role-Based Alert Notice -->
    <div class="alert alert-warning border-warning-subtle shadow-sm d-flex align-items-center justify-content-between mb-4" *ngIf="pendingApprovalsCount() > 0 && (authService.hasRole(['ADMIN', 'TECHNICIAN', 'PI']))">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-exclamation-circle-fill text-warning fs-5"></i>
        <div>
          <span class="fw-semibold">Action Required:</span> You have <strong>{{ pendingApprovalsCount() }}</strong> equipment reservation requests awaiting verification & safety approval.
        </div>
      </div>
      <a routerLink="/bookings" class="btn btn-warning btn-sm fw-semibold">Review Requests</a>
    </div>

    <!-- 4 High-Level Metric Stat Cards -->
    <div class="row g-3 mb-4">
      <!-- Card 1: Active Projects & Grants -->
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card h-100 p-3">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="text-muted small fw-bold text-uppercase">Total Grant Funding</span>
            <div class="stat-icon-wrapper bg-primary-subtle text-primary">
              <i class="bi bi-cash-stack"></i>
            </div>
          </div>
          <h3 class="fw-bold text-dark mb-1">\${{ totalGrantFunding() | number }}</h3>
          <div class="small text-muted d-flex align-items-center gap-1">
            <span class="text-success fw-semibold"><i class="bi bi-arrow-up-right"></i> {{ activeProjectsCount() }} Active</span>
            <span>funded research grants</span>
          </div>
        </div>
      </div>

      <!-- Card 2: Instruments & Lab Equipment -->
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card h-100 p-3">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="text-muted small fw-bold text-uppercase">High-End Instruments</span>
            <div class="stat-icon-wrapper bg-info-subtle text-info">
              <i class="bi bi-cpu-fill"></i>
            </div>
          </div>
          <h3 class="fw-bold text-dark mb-1">{{ totalEquipmentCount() }} Units</h3>
          <div class="small text-muted d-flex align-items-center gap-1">
            <span class="text-success fw-semibold">{{ availableEquipmentCount() }} Operational</span>
            <span>across {{ totalLabsCount() }} facilities</span>
          </div>
        </div>
      </div>

      <!-- Card 3: Pending / Active Bookings -->
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card h-100 p-3">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="text-muted small fw-bold text-uppercase">Instrument Bookings</span>
            <div class="stat-icon-wrapper bg-warning-subtle text-warning">
              <i class="bi bi-calendar2-check-fill"></i>
            </div>
          </div>
          <h3 class="fw-bold text-dark mb-1">{{ totalBookingsCount() }} Slots</h3>
          <div class="small text-muted d-flex align-items-center gap-1">
            <span class="badge bg-warning text-dark">{{ pendingApprovalsCount() }} Pending</span>
            <span>reservations</span>
          </div>
        </div>
      </div>

      <!-- Card 4: Inventory & Chemical Safety -->
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card h-100 p-3">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="text-muted small fw-bold text-uppercase">Inventory Status</span>
            <div class="stat-icon-wrapper bg-danger-subtle text-danger">
              <i class="bi bi-radioactive"></i>
            </div>
          </div>
          <h3 class="fw-bold text-dark mb-1">{{ totalInventoryCount() }} Items</h3>
          <div class="small text-muted d-flex align-items-center gap-1">
            <span class="badge bg-danger">{{ lowStockCount() }} Low Stock</span>
            <span>threshold warnings</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Two Column Analytical Section -->
    <div class="row g-4 mb-4">
      <!-- Left Column: Grant Expenditure Progress & Equipment Status -->
      <div class="col-12 col-lg-7">
        <!-- Grant Expenditure Tracking -->
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center py-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-pie-chart-fill text-primary"></i>
              <span>Sponsored Grants & Budget Utilization</span>
            </div>
            <a routerLink="/grants" class="small text-decoration-none fw-semibold">View All Grants</a>
          </div>
          <div class="card-body">
            <div *ngFor="let grant of projectService.grants()" class="mb-3">
              <div class="d-flex justify-content-between small mb-1">
                <span class="fw-semibold text-dark">{{ grant.title }} ({{ grant.grantNumber }})</span>
                <span class="text-muted">\${{ grant.utilizedAmount | number }} / \${{ grant.totalBudget | number }} ({{ getUtilizationPercent(grant) }}%)</span>
              </div>
              <div class="progress" style="height: 8px;">
                <div class="progress-bar" [class.bg-success]="getUtilizationPercent(grant) < 70" [class.bg-warning]="getUtilizationPercent(grant) >= 70 && getUtilizationPercent(grant) < 90" [class.bg-danger]="getUtilizationPercent(grant) >= 90" [style.width.%]="getUtilizationPercent(grant)"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Central Equipment Availability Matrix -->
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center py-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-display text-info"></i>
              <span>High-End Equipment Real-Time Status</span>
            </div>
            <a routerLink="/equipment" class="small text-decoration-none fw-semibold">Catalog</a>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Equipment</th>
                    <th>Facility</th>
                    <th>Status</th>
                    <th>Next Calibration</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let eq of labService.equipment().slice(0, 4)">
                    <td>
                      <div class="fw-semibold text-dark small">{{ eq.name }}</div>
                      <small class="text-muted">{{ eq.model }}</small>
                    </td>
                    <td class="small text-secondary">{{ eq.labName }}</td>
                    <td>
                      <span class="badge" [ngClass]="{
                        'bg-success-subtle text-success border border-success': eq.status === 'AVAILABLE',
                        'bg-primary-subtle text-primary border border-primary': eq.status === 'IN_USE',
                        'bg-warning-subtle text-warning border border-warning': eq.status === 'CALIBRATION',
                        'bg-danger-subtle text-danger border border-danger': eq.status === 'UNDER_MAINTENANCE'
                      }">{{ eq.status }}</span>
                    </td>
                    <td class="small text-muted">{{ eq.nextServiceDate }}</td>
                    <td class="text-end">
                      <a routerLink="/bookings" class="btn btn-outline-primary btn-sm py-1 px-2" style="font-size: 0.75rem;">
                        Book
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Recent Bookings & High Impact Publications -->
      <div class="col-12 col-lg-5">
        <!-- Upcoming Lab Reservations -->
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center py-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-calendar-event text-warning"></i>
              <span>Recent Slot Reservations</span>
            </div>
            <a routerLink="/bookings" class="small text-decoration-none fw-semibold">View All</a>
          </div>
          <div class="card-body p-3">
            <div class="d-flex flex-column gap-3">
              <div *ngFor="let b of labService.bookings().slice(0, 3)" class="p-3 rounded-3 border bg-light">
                <div class="d-flex justify-content-between align-items-start mb-1">
                  <div class="fw-semibold text-dark small">{{ b.equipmentName }}</div>
                  <span class="badge" [ngClass]="{
                    'bg-warning text-dark': b.status === 'PENDING',
                    'bg-success': b.status === 'APPROVED',
                    'bg-danger': b.status === 'REJECTED'
                  }">{{ b.status }}</span>
                </div>
                <div class="small text-muted mb-2">
                  <i class="bi bi-clock me-1"></i> {{ b.date }} | {{ b.startTime }} - {{ b.endTime }}
                </div>
                <div class="d-flex align-items-center justify-content-between text-secondary" style="font-size: 0.75rem;">
                  <span><i class="bi bi-person me-1"></i> {{ b.userName }} ({{ b.userRole }})</span>
                  <span *ngIf="b.safetyCleared" class="text-success"><i class="bi bi-shield-check"></i> Cleared</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- High-Impact Publications -->
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center py-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-journal-bookmark-fill text-danger"></i>
              <span>High-Impact Research Outputs</span>
            </div>
            <a routerLink="/publications" class="small text-decoration-none fw-semibold">All Papers</a>
          </div>
          <div class="card-body p-3">
            <div class="d-flex flex-column gap-3">
              <div *ngFor="let pub of projectService.publications().slice(0, 3)" class="p-2 border-bottom">
                <div class="fw-semibold small text-primary mb-1">{{ pub.title }}</div>
                <div class="text-muted small mb-1">{{ pub.journal }} ({{ pub.year }})</div>
                <div class="d-flex justify-content-between align-items-center" style="font-size: 0.75rem;">
                  <span class="badge bg-secondary-subtle text-secondary">{{ pub.citations }} Citations</span>
                  <span class="text-muted font-monospace">DOI: {{ pub.doi }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  labService = inject(LaboratoryService);
  invService = inject(InventoryService);

  totalGrantFunding = () => this.projectService.grants().reduce((acc: number, g: Grant) => acc + g.totalBudget, 0);
  activeProjectsCount = () => this.projectService.projects().filter(p => p.status === 'ACTIVE').length;
  totalEquipmentCount = () => this.labService.equipment().length;
  availableEquipmentCount = () => this.labService.equipment().filter(e => e.status === 'AVAILABLE').length;
  totalLabsCount = () => this.labService.laboratories().length;
  totalBookingsCount = () => this.labService.bookings().length;
  pendingApprovalsCount = () => this.labService.bookings().filter((b: EquipmentBooking) => b.status === 'PENDING').length;
  totalInventoryCount = () => this.invService.inventory().length;
  lowStockCount = () => this.invService.lowStockAlerts().length;

  getUtilizationPercent(grant: Grant): number {
    return Math.round((grant.utilizedAmount / grant.totalBudget) * 100);
  }
}
