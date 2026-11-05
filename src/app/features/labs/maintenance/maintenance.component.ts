import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { MaintenanceRecord } from '../../../core/models/laboratory.model';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">Maintenance, Diagnostics & Calibration Logs</h4>
            <span class="badge bg-secondary">Member 3</span>
          </div>
          <p class="text-muted small mb-0">Preventative maintenance scheduling, instrument calibration records, and defect troubleshooting</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showModal = true">
          <i class="bi bi-wrench me-1"></i> Log Maintenance Event
        </button>
      </div>

      <!-- Maintenance Records List -->
      <div class="card shadow-sm border">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Log ID</th>
                  <th>Instrument</th>
                  <th>Technician</th>
                  <th>Inspection Date</th>
                  <th>Issue Diagnostics & Action Taken</th>
                  <th>Service Cost</th>
                  <th>Next Inspection</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let m of labService.maintenanceRecords()">
                  <td>
                    <span class="badge bg-light text-primary border font-monospace">{{ m.id }}</span>
                  </td>
                  <td>
                    <div class="fw-semibold text-dark small">{{ m.equipmentName }}</div>
                  </td>
                  <td class="small">{{ m.technicianName }}</td>
                  <td class="small">{{ m.serviceDate }}</td>
                  <td class="small text-secondary" style="max-width: 320px;">
                    <div class="fw-semibold text-danger">{{ m.issueReported }}</div>
                    <div class="text-muted mt-1"><i class="bi bi-arrow-return-right me-1"></i> {{ m.actionTaken }}</div>
                  </td>
                  <td class="fw-semibold small">\${{ m.cost | number }}</td>
                  <td class="small text-muted">{{ m.nextScheduledDate }}</td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-success': m.status === 'RESOLVED',
                      'bg-warning text-dark': m.status === 'PENDING_PARTS',
                      'bg-info text-dark': m.status === 'SCHEDULED'
                    }">{{ m.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal to Log Maintenance -->
    <div *ngIf="showModal" class="modal-backdrop fade show"></div>
    <div *ngIf="showModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title fs-6 fw-bold">Record Calibration / Maintenance</h5>
            <button type="button" class="btn-close btn-close-white" (click)="showModal = false"></button>
          </div>
          <div class="modal-body p-4">
            <form (ngSubmit)="saveRecord()">
              <div class="mb-2">
                <label class="form-label small fw-semibold">Instrument</label>
                <select [(ngModel)]="newRecord.equipmentId" name="eqId" class="form-select form-select-sm" required>
                  <option *ngFor="let eq of labService.equipment()" [value]="eq.id">{{ eq.name }}</option>
                </select>
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Service Date</label>
                  <input type="date" [(ngModel)]="newRecord.serviceDate" name="sdate" class="form-control form-control-sm" required>
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">Next Scheduled</label>
                  <input type="date" [(ngModel)]="newRecord.nextScheduledDate" name="ndate" class="form-control form-control-sm" required>
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Technician Name</label>
                <input type="text" [(ngModel)]="newRecord.technicianName" name="tech" class="form-control form-control-sm" required>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Issue Diagnostics</label>
                <textarea [(ngModel)]="newRecord.issueReported" name="issue" rows="2" class="form-control form-control-sm" required></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Corrective Action Taken</label>
                <textarea [(ngModel)]="newRecord.actionTaken" name="action" rows="2" class="form-control form-control-sm" required></textarea>
              </div>
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Repair Cost ($)</label>
                  <input type="number" [(ngModel)]="newRecord.cost" name="cost" class="form-control form-control-sm">
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">Status</label>
                  <select [(ngModel)]="newRecord.status" name="status" class="form-select form-select-sm">
                    <option value="RESOLVED">Resolved</option>
                    <option value="PENDING_PARTS">Pending Parts</option>
                    <option value="SCHEDULED">Scheduled</option>
                  </select>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm" (click)="showModal = false">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MaintenanceLogsComponent {
  labService = inject(LaboratoryService);

  showModal = false;

  newRecord: Partial<MaintenanceRecord> = {
    equipmentId: '',
    serviceDate: '2025-03-05',
    nextScheduledDate: '2025-09-05',
    technicianName: 'Rajesh Kumar',
    issueReported: 'Routine quarterly laser optical alignment check',
    actionTaken: 'Optics cleaned with anhydrous isopropanol, focal plane recalibrated.',
    cost: 450,
    status: 'RESOLVED'
  };

  saveRecord() {
    if (!this.newRecord.equipmentId && this.labService.equipment().length > 0) {
      this.newRecord.equipmentId = this.labService.equipment()[0].id;
    }
    const eq = this.labService.getEquipmentById(this.newRecord.equipmentId || '');
    if (!eq) return;

    const record: MaintenanceRecord = {
      id: 'MNT-' + Math.floor(100 + Math.random() * 900),
      equipmentId: eq.id,
      equipmentName: eq.name,
      serviceDate: this.newRecord.serviceDate || '2025-03-05',
      technicianName: this.newRecord.technicianName || 'Rajesh Kumar',
      issueReported: this.newRecord.issueReported || 'Standard check',
      actionTaken: this.newRecord.actionTaken || 'Action completed',
      nextScheduledDate: this.newRecord.nextScheduledDate || '2025-09-05',
      cost: Number(this.newRecord.cost) || 0,
      status: this.newRecord.status || 'RESOLVED'
    };

    this.labService.addMaintenanceRecord(record);
    this.showModal = false;
  }
}
