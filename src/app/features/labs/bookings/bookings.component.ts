import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProjectService } from '../../../core/services/project.service';
import { EquipmentBooking, BookingStatus } from '../../../core/models/laboratory.model';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">Equipment Reservations & Slot Scheduling</h4>
            <span class="badge bg-secondary">Member 3</span>
          </div>
          <p class="text-muted small mb-0">Automated scheduling, conflict-free slot booking, and technician safety clearances</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="openBookingModal()">
          <i class="bi bi-calendar-plus me-1"></i> New Reservation
        </button>
      </div>

      <!-- Quick Metrics Summary -->
      <div class="row g-3 mb-4">
        <div class="col-md-3">
          <div class="card p-3 bg-light">
            <span class="text-muted small fw-bold">TOTAL RESERVATIONS</span>
            <div class="fs-4 fw-bold text-dark mt-1">{{ labService.bookings().length }}</div>
            <div class="small text-muted">Across all university instruments</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card p-3 bg-light">
            <span class="text-muted small fw-bold">PENDING APPROVAL</span>
            <div class="fs-4 fw-bold text-warning mt-1">{{ pendingCount() }}</div>
            <div class="small text-muted">Awaiting technician clearance</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card p-3 bg-light">
            <span class="text-muted small fw-bold">CONFIRMED / APPROVED</span>
            <div class="fs-4 fw-bold text-success mt-1">{{ approvedCount() }}</div>
            <div class="small text-muted">Ready for experimental run</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card p-3 bg-light">
            <span class="text-muted small fw-bold">MY RESERVATIONS</span>
            <div class="fs-4 fw-bold text-primary mt-1">{{ myBookings().length }}</div>
            <div class="small text-muted">Booked by {{ authService.currentUser()?.name }}</div>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <ul class="nav nav-pills mb-3 gap-2">
        <li class="nav-item">
          <button class="btn btn-sm" [class.btn-primary]="activeTab === 'ALL'" [class.btn-outline-secondary]="activeTab !== 'ALL'" (click)="activeTab = 'ALL'">
            All University Bookings ({{ labService.bookings().length }})
          </button>
        </li>
        <li class="nav-item">
          <button class="btn btn-sm" [class.btn-primary]="activeTab === 'PENDING'" [class.btn-outline-secondary]="activeTab !== 'PENDING'" (click)="activeTab = 'PENDING'">
            Pending Approvals ({{ pendingCount() }})
          </button>
        </li>
        <li class="nav-item">
          <button class="btn btn-sm" [class.btn-primary]="activeTab === 'MY'" [class.btn-outline-secondary]="activeTab !== 'MY'" (click)="activeTab = 'MY'">
            My Bookings ({{ myBookings().length }})
          </button>
        </li>
      </ul>

      <!-- Bookings Table -->
      <div class="card shadow-sm border">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Booking ID</th>
                  <th>Instrument & Facility</th>
                  <th>Researcher</th>
                  <th>Date & Time Slot</th>
                  <th>Research Purpose</th>
                  <th>Safety Clearance</th>
                  <th>Status</th>
                  <th class="text-end" *ngIf="canApprove()">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let b of displayedBookings()">
                  <td>
                    <span class="badge bg-light text-primary border font-monospace">{{ b.id }}</span>
                  </td>
                  <td>
                    <div class="fw-semibold text-dark small">{{ b.equipmentName }}</div>
                    <small class="text-muted">{{ b.labName }}</small>
                  </td>
                  <td>
                    <div class="fw-semibold small">{{ b.userName }}</div>
                    <span class="badge bg-light text-secondary border" style="font-size: 0.65rem;">{{ b.userRole }}</span>
                  </td>
                  <td>
                    <div class="fw-semibold small text-dark">{{ b.date }}</div>
                    <small class="text-muted"><i class="bi bi-clock me-1"></i> {{ b.startTime }} - {{ b.endTime }}</small>
                  </td>
                  <td class="small text-secondary" style="max-width: 200px;">
                    <div class="text-truncate" [title]="b.purpose">{{ b.purpose }}</div>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="b.safetyCleared ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'">
                      <i class="bi" [ngClass]="b.safetyCleared ? 'bi-shield-check' : 'bi-shield-x'"></i>
                      {{ b.safetyCleared ? 'Verified' : 'Pending Safety' }}
                    </span>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-warning text-dark': b.status === 'PENDING',
                      'bg-success': b.status === 'APPROVED',
                      'bg-danger': b.status === 'REJECTED',
                      'bg-info text-dark': b.status === 'COMPLETED',
                      'bg-secondary': b.status === 'CANCELLED'
                    }">{{ b.status }}</span>
                  </td>
                  <td class="text-end" *ngIf="canApprove()">
                    <div class="btn-group btn-group-sm" *ngIf="b.status === 'PENDING'">
                      <button class="btn btn-outline-success" (click)="setStatus(b.id, 'APPROVED')" title="Approve booking">
                        <i class="bi bi-check-lg"></i>
                      </button>
                      <button class="btn btn-outline-danger" (click)="setStatus(b.id, 'REJECTED')" title="Reject booking">
                        <i class="bi bi-x-lg"></i>
                      </button>
                    </div>
                    <span *ngIf="b.status !== 'PENDING'" class="text-muted small">Processed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div *ngIf="showBookingModal" class="modal-backdrop fade show"></div>
    <div *ngIf="showBookingModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fs-6 fw-bold">Reserve High-End Instrument Slot</h5>
            <button type="button" class="btn-close btn-close-white" (click)="showBookingModal = false"></button>
          </div>
          <div class="modal-body p-4">
            <div *ngIf="conflictError" class="alert alert-danger py-2 small d-flex align-items-center gap-2">
              <i class="bi bi-exclamation-triangle-fill"></i>
              <span>{{ conflictError }}</span>
            </div>

            <form (ngSubmit)="submitBooking()">
              <div class="mb-3">
                <label class="form-label small fw-semibold">Select Instrument</label>
                <select [(ngModel)]="newBooking.equipmentId" name="eqId" class="form-select form-select-sm" required (change)="onEquipmentSelected()">
                  <option *ngFor="let eq of labService.equipment()" [value]="eq.id">
                    {{ eq.name }} ({{ eq.labName }}) - \${{ eq.hourlyRate }}/hr
                  </option>
                </select>
              </div>

              <div class="row g-2 mb-3">
                <div class="col-md-4">
                  <label class="form-label small fw-semibold">Reservation Date</label>
                  <input type="date" [(ngModel)]="newBooking.date" name="date" class="form-control form-control-sm" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label small fw-semibold">Start Time</label>
                  <input type="time" [(ngModel)]="newBooking.startTime" name="stime" class="form-control form-control-sm" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label small fw-semibold">End Time</label>
                  <input type="time" [(ngModel)]="newBooking.endTime" name="etime" class="form-control form-control-sm" required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label small fw-semibold">Linked Research Project (Optional)</label>
                <select [(ngModel)]="newBooking.projectId" name="projId" class="form-select form-select-sm">
                  <option value="">None / Independent Investigation</option>
                  <option *ngFor="let p of projectService.projects()" [value]="p.id">
                    {{ p.code }}: {{ p.title }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label small fw-semibold">Purpose & Sample Preparation Details</label>
                <textarea [(ngModel)]="newBooking.purpose" name="purpose" rows="2" class="form-control form-control-sm" required placeholder="Specify sample composition, laser/beam wavelength, or computing workload..."></textarea>
              </div>

              <div class="p-3 bg-light rounded border mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" [(ngModel)]="newBooking.safetyCleared" name="safety" id="safetyCheck" required>
                  <label class="form-check-label small fw-semibold text-dark" for="safetyCheck">
                    I certify that my samples conform to laboratory biosafety level protocols (EHS-MSDS cleared) and I have completed orientation on this instrument.
                  </label>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm" (click)="showBookingModal = false">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm" [disabled]="!newBooking.safetyCleared">Submit Reservation</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookingManagementComponent implements OnInit {
  labService = inject(LaboratoryService);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  route = inject(ActivatedRoute);

  activeTab: 'ALL' | 'PENDING' | 'MY' = 'ALL';
  showBookingModal = false;
  conflictError = '';

  newBooking: Partial<EquipmentBooking> = {
    equipmentId: '',
    date: '2025-03-15',
    startTime: '10:00',
    endTime: '12:00',
    purpose: '',
    safetyCleared: false
  };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['equipId']) {
        this.newBooking.equipmentId = params['equipId'];
        this.openBookingModal();
      }
    });
  }

  pendingCount = () => this.labService.bookings().filter(b => b.status === 'PENDING').length;
  approvedCount = () => this.labService.bookings().filter(b => b.status === 'APPROVED').length;
  myBookings = () => this.labService.bookings().filter(b => b.userId === this.authService.currentUser()?.id);

  canApprove = () => this.authService.hasRole(['ADMIN', 'TECHNICIAN', 'PI']);

  displayedBookings() {
    if (this.activeTab === 'PENDING') {
      return this.labService.bookings().filter(b => b.status === 'PENDING');
    }
    if (this.activeTab === 'MY') {
      return this.myBookings();
    }
    return this.labService.bookings();
  }

  openBookingModal() {
    if (!this.newBooking.equipmentId && this.labService.equipment().length > 0) {
      this.newBooking.equipmentId = this.labService.equipment()[0].id;
    }
    this.conflictError = '';
    this.showBookingModal = true;
  }

  onEquipmentSelected() {}

  setStatus(id: string, status: BookingStatus) {
    this.labService.updateBookingStatus(id, status);
  }

  submitBooking() {
    this.conflictError = '';
    if (!this.newBooking.equipmentId || !this.newBooking.date || !this.newBooking.startTime || !this.newBooking.endTime || !this.newBooking.purpose) {
      this.conflictError = 'Please complete all required fields.';
      return;
    }

    const eq = this.labService.getEquipmentById(this.newBooking.equipmentId);
    if (!eq) return;

    const current = this.authService.currentUser()!;
    const booking: EquipmentBooking = {
      id: 'BK-' + Math.floor(100 + Math.random() * 900),
      equipmentId: eq.id,
      equipmentName: eq.name,
      laboratoryId: eq.laboratoryId,
      labName: eq.labName,
      userId: current.id,
      userName: current.name,
      userRole: current.role,
      projectId: this.newBooking.projectId,
      date: this.newBooking.date,
      startTime: this.newBooking.startTime,
      endTime: this.newBooking.endTime,
      purpose: this.newBooking.purpose,
      safetyCleared: !!this.newBooking.safetyCleared,
      status: current.role === 'TECHNICIAN' || current.role === 'ADMIN' ? 'APPROVED' : 'PENDING',
      createdAt: new Date().toISOString()
    };

    const res = this.labService.createBooking(booking);
    if (res.success) {
      this.showBookingModal = false;
      this.newBooking = { equipmentId: eq.id, date: '2025-03-15', startTime: '10:00', endTime: '12:00', purpose: '', safetyCleared: false };
    } else {
      this.conflictError = res.message;
    }
  }
}
