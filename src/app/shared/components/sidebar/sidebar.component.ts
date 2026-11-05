import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="d-flex flex-column p-3 text-white bg-dark shadow-sm h-100" style="background-color: #1e293b !important; min-height: calc(100vh - 60px);">
      <!-- Role Badge Summary -->
      <div class="p-2 mb-3 rounded-3" style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255,255,255,0.1);">
        <div class="d-flex align-items-center gap-2">
          <div class="rounded-circle p-1 bg-primary text-white d-flex align-items-center justify-content-center" style="width: 28px; height: 28px;">
            <i class="bi bi-shield-lock-fill small"></i>
          </div>
          <div>
            <div class="text-secondary small fw-bold" style="font-size: 0.65rem;">ACTIVE ACCESS LEVEL</div>
            <div class="fw-bold text-white small">{{ authService.currentRole() }} CONSOLE</div>
          </div>
        </div>
      </div>

      <nav class="flex-grow-1 overflow-auto">
        <!-- GENERAL OVERVIEW -->
        <div class="sidebar-heading">Core Administration</div>
        <ul class="nav nav-pills flex-column mb-2 gap-1">
          <li class="nav-item">
            <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="sidebar-link">
              <i class="bi bi-speedometer2 text-info"></i>
              <span>Dashboard Overview</span>
            </a>
          </li>
          <li class="nav-item" *ngIf="authService.hasRole(['ADMIN', 'PI'])">
            <a routerLink="/users" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-people-fill text-warning"></i>
              <span>Faculty & Scholars</span>
            </a>
          </li>
        </ul>

        <!-- MODULE 2: RESEARCH & GRANTS (MEMBER 2) -->
        <div class="sidebar-heading d-flex justify-content-between align-items-center">
          <span>Research & Grants</span>
          <span class="badge bg-secondary" style="font-size: 0.6rem;">MOD 2</span>
        </div>
        <ul class="nav nav-pills flex-column mb-2 gap-1">
          <li class="nav-item">
            <a routerLink="/projects" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-folder2-open text-primary"></i>
              <span>Research Projects</span>
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/grants" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-cash-coin text-success"></i>
              <span>Grants & Funding</span>
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/publications" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-journal-richtext text-danger"></i>
              <span>Publications & DOIs</span>
            </a>
          </li>
        </ul>

        <!-- MODULE 3: LABS & EQUIPMENT (MEMBER 3) -->
        <div class="sidebar-heading d-flex justify-content-between align-items-center">
          <span>Lab & Equipment</span>
          <span class="badge bg-secondary" style="font-size: 0.6rem;">MOD 3</span>
        </div>
        <ul class="nav nav-pills flex-column mb-2 gap-1">
          <li class="nav-item">
            <a routerLink="/labs" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-building text-info"></i>
              <span>Research Labs</span>
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/equipment" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-cpu text-primary"></i>
              <span>Equipment Catalog</span>
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/bookings" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-calendar2-range text-warning"></i>
              <span>Slot Bookings</span>
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/maintenance" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-tools text-danger"></i>
              <span>Maintenance & Calibration</span>
            </a>
          </li>
        </ul>

        <!-- MODULE 4: INVENTORY & COMPLIANCE (MEMBER 4) -->
        <div class="sidebar-heading d-flex justify-content-between align-items-center">
          <span>Inventory & Safety</span>
          <span class="badge bg-secondary" style="font-size: 0.6rem;">MOD 4</span>
        </div>
        <ul class="nav nav-pills flex-column mb-2 gap-1">
          <li class="nav-item">
            <a routerLink="/inventory" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-boxes text-success"></i>
              <span>Chemicals & Stock</span>
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/requisitions" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-cart-check text-info"></i>
              <span>Stock Requisitions</span>
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/safety-audits" routerLinkActive="active" class="sidebar-link">
              <i class="bi bi-shield-check text-warning"></i>
              <span>EHS Safety Audits</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Institutional Footer Note -->
      <div class="pt-3 border-top border-secondary text-secondary small" style="font-size: 0.7rem;">
        <div class="fw-semibold text-light">University Portal v2.4</div>
        <div>Angular Enterprise Edition</div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  authService = inject(AuthService);
}
