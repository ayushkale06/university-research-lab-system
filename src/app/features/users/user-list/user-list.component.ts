import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User, UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <h4 class="fw-bold text-dark mb-0">Faculty & Research Scholars Directory</h4>
          <p class="text-muted small mb-0">Role-based access management and institutional researcher registry</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showAddModal = true">
          <i class="bi bi-person-plus-fill me-1"></i> Register New Researcher
        </button>
      </div>

      <!-- Filters & Search -->
      <div class="card mb-3">
        <div class="card-body p-3">
          <div class="row g-2 align-items-center">
            <div class="col-12 col-md-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
                <input type="text" [(ngModel)]="searchQuery" class="form-control" placeholder="Search by name, email, or department...">
              </div>
            </div>
            <div class="col-12 col-md-3">
              <select [(ngModel)]="selectedRole" class="form-select form-select-sm">
                <option value="ALL">All Roles</option>
                <option value="ADMIN">Administrator</option>
                <option value="PI">Principal Investigator</option>
                <option value="SCHOLAR">Research Scholar</option>
                <option value="TECHNICIAN">Lab Technician</option>
              </select>
            </div>
            <div class="col-12 col-md-3 text-md-end text-muted small">
              Showing <strong>{{ filteredUsers().length }}</strong> members
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="card">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Researcher</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let u of filteredUsers()">
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <img [src]="u.avatarUrl" class="rounded-circle border" width="38" height="38" style="object-fit: cover;">
                      <div>
                        <div class="fw-semibold text-dark small">{{ u.name }}</div>
                        <small class="text-muted">{{ u.email }}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-danger': u.role === 'ADMIN',
                      'bg-primary': u.role === 'PI',
                      'bg-success': u.role === 'SCHOLAR',
                      'bg-warning text-dark': u.role === 'TECHNICIAN'
                    }">{{ u.role }}</span>
                  </td>
                  <td class="small text-secondary">{{ u.department }}</td>
                  <td class="small">{{ u.designation }}</td>
                  <td class="small text-muted">{{ u.phone || 'N/A' }}</td>
                  <td>
                    <span class="badge bg-success-subtle text-success">Active</span>
                  </td>
                  <td class="text-end">
                    <button class="btn btn-outline-secondary btn-sm py-1 px-2 me-1" (click)="authService.switchRole(u.role)" title="Impersonate role for demo">
                      <i class="bi bi-box-arrow-in-right"></i> Demo
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Register Modal Backdrop -->
    <div *ngIf="showAddModal" class="modal-backdrop fade show"></div>
    <div *ngIf="showAddModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fs-6 fw-bold">Register New Researcher</h5>
            <button type="button" class="btn-close btn-close-white" (click)="showAddModal = false"></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="saveUser()">
              <div class="mb-2">
                <label class="form-label small fw-semibold">Full Name</label>
                <input type="text" [(ngModel)]="newUser.name" name="name" class="form-control form-control-sm" required>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Email</label>
                <input type="email" [(ngModel)]="newUser.email" name="email" class="form-control form-control-sm" required>
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Role</label>
                  <select [(ngModel)]="newUser.role" name="role" class="form-select form-select-sm">
                    <option value="PI">Principal Investigator</option>
                    <option value="SCHOLAR">Research Scholar</option>
                    <option value="TECHNICIAN">Lab Technician</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">Department</label>
                  <input type="text" [(ngModel)]="newUser.department" name="dept" class="form-control form-control-sm" required>
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Designation</label>
                <input type="text" [(ngModel)]="newUser.designation" name="desig" class="form-control form-control-sm" required>
              </div>
              <div class="mb-3">
                <label class="form-label small fw-semibold">Phone Extension</label>
                <input type="text" [(ngModel)]="newUser.phone" name="phone" class="form-control form-control-sm">
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm" (click)="showAddModal = false">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserListComponent {
  authService = inject(AuthService);

  searchQuery = '';
  selectedRole = 'ALL';
  showAddModal = false;

  newUser: Partial<User> = {
    role: 'SCHOLAR',
    department: 'Biotechnology & Life Sciences',
    designation: 'Research Fellow',
    isActive: true
  };

  filteredUsers = () => {
    return this.authService.users().filter(u => {
      const matchRole = this.selectedRole === 'ALL' || u.role === this.selectedRole;
      const matchQuery = !this.searchQuery || 
        u.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        u.department.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchRole && matchQuery;
    });
  };

  saveUser() {
    if (!this.newUser.name || !this.newUser.email) return;

    const user: User = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: this.newUser.name,
      email: this.newUser.email,
      role: (this.newUser.role as UserRole) || 'SCHOLAR',
      department: this.newUser.department || 'General Science',
      designation: this.newUser.designation || 'Researcher',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      phone: this.newUser.phone || '+1 (555) 000-0000',
      isActive: true
    };

    this.authService.addUser(user);
    this.showAddModal = false;
    this.newUser = { role: 'SCHOLAR', department: '', designation: '', isActive: true };
  }
}
