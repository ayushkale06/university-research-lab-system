import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { InventoryService } from '../../../core/services/inventory.service';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3 py-2 border-bottom border-secondary shadow-sm" style="background-color: #0f172a !important;">
      <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center gap-2 fw-bold text-white fs-5" routerLink="/dashboard">
          <span class="badge bg-primary p-2 rounded-3">
            <i class="bi bi-mortarboard-fill fs-5"></i>
          </span>
          <div>
            <div class="lh-1">UniResearch <span class="text-primary fw-normal">URLMS</span></div>
            <small class="text-secondary fw-normal" style="font-size: 0.65rem; letter-spacing: 0.05em;">LABORATORY & RESEARCH SUITE</small>
          </div>
        </a>

        <!-- Controls & User Menu -->
        <div class="d-flex align-items-center gap-3 ms-auto">
          <!-- Live Alerts Indicator -->
          <div class="dropdown">
            <button class="btn btn-outline-secondary text-light btn-sm position-relative rounded-pill px-3 py-1" type="button" id="alertDrop" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-bell-fill text-warning me-1"></i> Alerts
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" *ngIf="totalAlerts() > 0">
                {{ totalAlerts() }}
              </span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2" aria-labelledby="alertDrop" style="min-width: 280px;">
              <li class="dropdown-header fw-bold text-uppercase fs-7 text-muted">System Notifications</li>
              <li *ngIf="pendingBookingsCount() > 0">
                <a class="dropdown-item py-2 rounded d-flex align-items-center gap-2" routerLink="/bookings">
                  <i class="bi bi-clock-history text-primary fs-5"></i>
                  <div>
                    <div class="fw-semibold small">{{ pendingBookingsCount() }} Pending Bookings</div>
                    <small class="text-muted">Awaiting technician approval</small>
                  </div>
                </a>
              </li>
              <li *ngIf="lowStockCount() > 0">
                <a class="dropdown-item py-2 rounded d-flex align-items-center gap-2" routerLink="/inventory">
                  <i class="bi bi-exclamation-triangle-fill text-danger fs-5"></i>
                  <div>
                    <div class="fw-semibold small">{{ lowStockCount() }} Low Stock Items</div>
                    <small class="text-muted">Below emergency threshold</small>
                  </div>
                </a>
              </li>
              <li *ngIf="totalAlerts() === 0" class="text-center py-2 text-muted small">
                <i class="bi bi-check-circle text-success me-1"></i> All systems optimal
              </li>
            </ul>
          </div>

          <!-- Quick Role Switcher for Viva Demo -->
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-sm btn-outline-info dropdown-toggle rounded-pill px-3" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-badge-fill me-1"></i> Role: <strong>{{ authService.currentRole() }}</strong>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2" style="min-width: 250px;">
              <li class="dropdown-header fw-bold text-uppercase fs-7 text-muted">Switch Role (Live Viva Demo)</li>
              <li>
                <button class="dropdown-item py-2 rounded d-flex align-items-center gap-2" [class.active]="authService.currentRole() === 'ADMIN'" (click)="onRoleSwitch('ADMIN')">
                  <span class="badge bg-danger">ADMIN</span>
                  <div>
                    <div class="fw-semibold small">Dr. Arthur Vance</div>
                    <small class="text-muted">Dean of Research</small>
                  </div>
                </button>
              </li>
              <li>
                <button class="dropdown-item py-2 rounded d-flex align-items-center gap-2" [class.active]="authService.currentRole() === 'PI'" (click)="onRoleSwitch('PI')">
                  <span class="badge bg-primary">PI</span>
                  <div>
                    <div class="fw-semibold small">Dr. Elena Sharma</div>
                    <small class="text-muted">Principal Investigator</small>
                  </div>
                </button>
              </li>
              <li>
                <button class="dropdown-item py-2 rounded d-flex align-items-center gap-2" [class.active]="authService.currentRole() === 'SCHOLAR'" (click)="onRoleSwitch('SCHOLAR')">
                  <span class="badge bg-success">SCHOLAR</span>
                  <div>
                    <div class="fw-semibold small">Priya Nair</div>
                    <small class="text-muted">Research Fellow</small>
                  </div>
                </button>
              </li>
              <li>
                <button class="dropdown-item py-2 rounded d-flex align-items-center gap-2" [class.active]="authService.currentRole() === 'TECHNICIAN'" (click)="onRoleSwitch('TECHNICIAN')">
                  <span class="badge bg-warning text-dark">TECHNICIAN</span>
                  <div>
                    <div class="fw-semibold small">Rajesh Kumar</div>
                    <small class="text-muted">Lab Technical Officer</small>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          <!-- User Avatar & Profile Dropdown -->
          <div class="dropdown" *ngIf="authService.currentUser() as user">
            <button class="btn btn-link text-white p-0 d-flex align-items-center gap-2 text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img [src]="user.avatarUrl" [alt]="user.name" class="rounded-circle border border-primary" width="34" height="34" style="object-fit: cover;">
              <span class="d-none d-md-inline small fw-medium">{{ user.name }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2">
              <li class="px-2 py-1">
                <div class="fw-semibold small">{{ user.name }}</div>
                <div class="text-muted small" style="font-size: 0.75rem;">{{ user.email }}</div>
                <div class="mt-1"><span class="badge bg-secondary">{{ user.department }}</span></div>
              </li>
              <li><hr class="dropdown-divider my-2"></li>
              <li>
                <button class="dropdown-item text-danger py-2 rounded d-flex align-items-center gap-2" (click)="authService.logout()">
                  <i class="bi bi-box-arrow-right"></i> Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  authService = inject(AuthService);
  labService = inject(LaboratoryService);
  invService = inject(InventoryService);
  private router = inject(Router);

  lowStockCount = () => this.invService.lowStockAlerts().length;
  pendingBookingsCount = () => this.labService.bookings().filter(b => b.status === 'PENDING').length;
  totalAlerts = () => this.lowStockCount() + this.pendingBookingsCount();

  onRoleSwitch(role: UserRole) {
    this.authService.switchRole(role);
  }
}
