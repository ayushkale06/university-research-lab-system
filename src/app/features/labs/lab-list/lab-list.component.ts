import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LaboratoryService } from '../../../core/services/laboratory.service';

@Component({
  selector: 'app-lab-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">University Research Facilities & Laboratories</h4>
            <span class="badge bg-secondary">Member 3</span>
          </div>
          <p class="text-muted small mb-0">Central instrumentation facilities, biological safety containment, and cleanrooms</p>
        </div>
        <a routerLink="/equipment" class="btn btn-primary btn-sm">
          <i class="bi bi-cpu me-1"></i> Browse Equipment Catalog
        </a>
      </div>

      <!-- Facility Cards Grid -->
      <div class="row g-4">
        <div class="col-12 col-md-6" *ngFor="let lab of labService.laboratories()">
          <div class="card h-100 shadow-sm border">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-start">
              <div>
                <span class="badge bg-light text-primary border font-monospace me-2">{{ lab.code }}</span>
                <span class="badge" [ngClass]="{
                  'bg-success': lab.status === 'OPERATIONAL',
                  'bg-warning text-dark': lab.status === 'MAINTENANCE',
                  'bg-danger': lab.status === 'RESTRICTED'
                }">{{ lab.status }}</span>
                <h5 class="fw-bold text-dark mt-2 mb-1 fs-6">{{ lab.name }}</h5>
                <small class="text-muted"><i class="bi bi-geo-alt me-1"></i> {{ lab.building }}, {{ lab.roomNumber }}</small>
              </div>
              <span class="badge" [ngClass]="{
                'bg-danger-subtle text-danger border border-danger': lab.safetyLevel === 'BSL-3',
                'bg-warning-subtle text-warning border border-warning': lab.safetyLevel === 'BSL-2',
                'bg-info-subtle text-info border border-info': lab.safetyLevel === 'BSL-1',
                'bg-secondary-subtle text-secondary border': lab.safetyLevel === 'GENERAL_LAB'
              }">{{ lab.safetyLevel }}</span>
            </div>

            <div class="card-body">
              <div class="row g-2 mb-3 text-secondary small">
                <div class="col-6">
                  <div class="p-2 rounded bg-light">
                    <span class="text-muted" style="font-size: 0.7rem;">DEPARTMENT</span>
                    <div class="fw-semibold text-dark text-truncate">{{ lab.department }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 rounded bg-light">
                    <span class="text-muted" style="font-size: 0.7rem;">SEATING / BENCH CAPACITY</span>
                    <div class="fw-semibold text-dark">{{ lab.capacity }} Research Workstations</div>
                  </div>
                </div>
              </div>

              <!-- Lab Supervisor -->
              <div class="d-flex align-items-center justify-content-between p-2 rounded border bg-light">
                <div class="d-flex align-items-center gap-2">
                  <img [src]="lab.supervisor.avatarUrl" class="rounded-circle" width="32" height="32" style="object-fit: cover;">
                  <div>
                    <div class="fw-semibold small text-dark">{{ lab.supervisor.name }}</div>
                    <small class="text-muted" style="font-size: 0.7rem;">Facility Director / Supervisor</small>
                  </div>
                </div>
                <span class="small text-muted font-monospace">{{ lab.contactExtension }}</span>
              </div>
            </div>

            <div class="card-footer bg-white border-top py-2 d-flex justify-content-between align-items-center">
              <small class="text-muted">
                <i class="bi bi-tools me-1"></i> {{ getInstrumentsInLab(lab.id).length }} Instruments Installed
              </small>
              <a routerLink="/equipment" class="btn btn-outline-primary btn-sm py-1 px-3">
                View Instruments
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LabListComponent {
  labService = inject(LaboratoryService);

  getInstrumentsInLab(labId: string) {
    return this.labService.equipment().filter(e => e.laboratoryId === labId);
  }
}
