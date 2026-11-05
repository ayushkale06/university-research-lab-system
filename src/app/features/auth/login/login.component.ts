import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-dark py-5 px-3" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
      <div class="card shadow-lg border-0 rounded-4 overflow-hidden" style="max-width: 900px; width: 100%;">
        <div class="row g-0">
          <!-- Left Banner -->
          <div class="col-lg-5 p-5 text-white d-flex flex-column justify-content-between" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);">
            <div>
              <div class="d-flex align-items-center gap-2 mb-3">
                <span class="badge bg-white text-primary p-2 rounded-3 fs-5">
                  <i class="bi bi-mortarboard-fill"></i>
                </span>
                <span class="fs-4 fw-bold">UniResearch</span>
              </div>
              <h3 class="fw-bold lh-sm mb-3">Central Research & Lab Management System</h3>
              <p class="text-white-50 small mb-4">
                Enterprise front-end suite powering project proposals, multi-million grant tracking, equipment reservations, and BSL-3 laboratory chemical safety compliance.
              </p>
            </div>

            <div class="pt-4 border-top border-white-50">
              <div class="small fw-semibold mb-2">Designed for Academic Excellence:</div>
              <ul class="list-unstyled small mb-0 text-white-75">
                <li class="mb-1"><i class="bi bi-check2-circle me-1 text-warning"></i> Role-Based Permissions (PI, Scholar, Tech)</li>
                <li class="mb-1"><i class="bi bi-check2-circle me-1 text-warning"></i> Conflict-Free Equipment Scheduler</li>
                <li class="mb-1"><i class="bi bi-check2-circle me-1 text-warning"></i> HazMat & EHS Audit Protocol</li>
              </ul>
            </div>
          </div>

          <!-- Right Login Form -->
          <div class="col-lg-7 p-4 p-md-5 bg-white">
            <div class="mb-4">
              <h4 class="fw-bold text-dark mb-1">Institutional Sign In</h4>
              <p class="text-muted small">Access your research workspace with official university credentials</p>
            </div>

            <div *ngIf="errorMessage" class="alert alert-danger py-2 small d-flex align-items-center gap-2">
              <i class="bi bi-exclamation-octagon-fill"></i>
              <span>{{ errorMessage }}</span>
            </div>

            <form (ngSubmit)="onLogin()">
              <div class="mb-3">
                <label class="form-label small fw-semibold text-secondary">University Email</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0"><i class="bi bi-envelope text-muted"></i></span>
                  <input type="email" [(ngModel)]="email" name="email" class="form-control border-start-0" placeholder="name@university.edu" required>
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label small fw-semibold text-secondary">Password</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0"><i class="bi bi-lock text-muted"></i></span>
                  <input type="password" [(ngModel)]="password" name="password" class="form-control border-start-0" placeholder="••••••••" required>
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold shadow-sm mb-4">
                <i class="bi bi-box-arrow-in-right me-1"></i> Sign In to Portal
              </button>
            </form>

            <!-- Quick Demo Personas -->
            <div class="pt-3 border-top">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="small fw-bold text-muted text-uppercase" style="font-size: 0.7rem;">Demo Personas (1-Click Login for Viva)</span>
                <span class="badge bg-light text-secondary border">Fast Access</span>
              </div>
              <div class="row g-2">
                <div class="col-6">
                  <button type="button" class="btn btn-outline-danger btn-sm w-100 text-start p-2" (click)="quickLogin('ADMIN')">
                    <div class="fw-bold small"><i class="bi bi-shield-fill-check me-1"></i> Admin</div>
                    <div class="text-muted" style="font-size: 0.7rem;">Dean Dr. Vance</div>
                  </button>
                </div>
                <div class="col-6">
                  <button type="button" class="btn btn-outline-primary btn-sm w-100 text-start p-2" (click)="quickLogin('PI')">
                    <div class="fw-bold small"><i class="bi bi-award-fill me-1"></i> Principal Inv.</div>
                    <div class="text-muted" style="font-size: 0.7rem;">Dr. Elena Sharma</div>
                  </button>
                </div>
                <div class="col-6">
                  <button type="button" class="btn btn-outline-success btn-sm w-100 text-start p-2" (click)="quickLogin('SCHOLAR')">
                    <div class="fw-bold small"><i class="bi bi-mortarboard-fill me-1"></i> PhD Scholar</div>
                    <div class="text-muted" style="font-size: 0.7rem;">Priya Nair</div>
                  </button>
                </div>
                <div class="col-6">
                  <button type="button" class="btn btn-outline-warning btn-sm w-100 text-start p-2 text-dark" (click)="quickLogin('TECHNICIAN')">
                    <div class="fw-bold small"><i class="bi bi-tools me-1"></i> Lab Tech</div>
                    <div class="text-muted" style="font-size: 0.7rem;">Rajesh Kumar</div>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = 'dean.research@university.edu';
  password = 'password123';
  errorMessage = '';

  onLogin() {
    this.errorMessage = '';
    const success = this.authService.login(this.email);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid credentials. Please use one of the demo accounts below.';
    }
  }

  quickLogin(role: UserRole) {
    this.authService.switchRole(role);
    this.router.navigate(['/dashboard']);
  }
}
