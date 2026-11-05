import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../../core/services/inventory.service';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { SafetyAudit } from '../../../core/models/inventory.model';

@Component({
  selector: 'app-safety-audits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">EHS Laboratory Safety & Compliance Audits</h4>
            <span class="badge bg-secondary">Member 4</span>
          </div>
          <p class="text-muted small mb-0">Biosafety level monitoring, OSHA compliance, chemical fume hood and eyewash inspections</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showModal = true">
          <i class="bi bi-clipboard-check me-1"></i> Log Safety Audit
        </button>
      </div>

      <!-- Audit History Cards -->
      <div class="row g-4">
        <div class="col-12 col-lg-6" *ngFor="let a of invService.safetyAudits()">
          <div class="card h-100 shadow-sm border">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-start">
              <div>
                <span class="badge bg-light text-primary border font-monospace me-2">{{ a.auditNumber }}</span>
                <span class="badge" [ngClass]="{
                  'bg-success': a.status === 'PASSED',
                  'bg-warning text-dark': a.status === 'ACTION_REQUIRED',
                  'bg-danger': a.status === 'CRITICAL'
                }">{{ a.status }}</span>
                <h5 class="fw-bold text-dark mt-2 mb-1 fs-6">{{ a.labName }}</h5>
                <small class="text-muted"><i class="bi bi-calendar-check me-1"></i> Audit Date: {{ a.auditDate }}</small>
              </div>
              <div class="text-end">
                <div class="fw-bold fs-4" [ngClass]="{
                  'text-success': a.score >= 90,
                  'text-warning': a.score >= 75 && a.score < 90,
                  'text-danger': a.score < 75
                }">{{ a.score }}%</div>
                <small class="text-muted" style="font-size: 0.7rem;">Compliance Score</small>
              </div>
            </div>

            <div class="card-body">
              <div class="small fw-semibold text-secondary mb-2">Checklist Verification Items:</div>
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="p-2 rounded bg-light d-flex align-items-center gap-2 small">
                    <i class="bi" [ngClass]="a.eyewashFunctional ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'"></i>
                    <span>Eyewash / Shower</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 rounded bg-light d-flex align-items-center gap-2 small">
                    <i class="bi" [ngClass]="a.fumeHoodCertified ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'"></i>
                    <span>Fumehood Face Velocity</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 rounded bg-light d-flex align-items-center gap-2 small">
                    <i class="bi" [ngClass]="a.fireExtinguisherValid ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'"></i>
                    <span>Fire Extinguishers</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 rounded bg-light d-flex align-items-center gap-2 small">
                    <i class="bi" [ngClass]="a.chemicalStorageCompliant ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'"></i>
                    <span>Chemical Secondary</span>
                  </div>
                </div>
              </div>

              <!-- PPE Rate -->
              <div class="mb-3">
                <div class="d-flex justify-content-between small mb-1">
                  <span class="text-secondary fw-semibold">Mandatory PPE Protocol Compliance</span>
                  <span class="fw-bold">{{ a.ppeComplianceRate }}%</span>
                </div>
                <div class="progress" style="height: 6px;">
                  <div class="progress-bar bg-success" [style.width.%]="a.ppeComplianceRate"></div>
                </div>
              </div>

              <!-- Findings list -->
              <div class="p-2 rounded bg-light border">
                <div class="small fw-semibold text-dark mb-1"><i class="bi bi-card-checklist me-1"></i> Inspector Findings:</div>
                <ul class="mb-0 ps-3 small text-secondary">
                  <li *ngFor="let f of a.findings">{{ f }}</li>
                </ul>
              </div>
            </div>

            <div class="card-footer bg-white border-top py-2 d-flex justify-content-between align-items-center">
              <small class="text-muted"><i class="bi bi-person-badge me-1"></i> Auditor: {{ a.auditorName }}</small>
              <span class="badge bg-light text-muted border">Institutional EHS Registry</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Log Audit Modal -->
    <div *ngIf="showModal" class="modal-backdrop fade show"></div>
    <div *ngIf="showModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title fs-6 fw-bold">Log Laboratory Safety & Compliance Audit</h5>
            <button type="button" class="btn-close btn-close-white" (click)="showModal = false"></button>
          </div>
          <div class="modal-body p-4">
            <form (ngSubmit)="saveAudit()">
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Target Laboratory</label>
                  <select [(ngModel)]="selectedLabId" name="lab" class="form-select form-select-sm" required>
                    <option *ngFor="let l of labService.laboratories()" [value]="l.id">{{ l.name }}</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">Inspection Date</label>
                  <input type="date" [(ngModel)]="newAudit.auditDate" name="adate" class="form-control form-control-sm" required>
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Inspector / Auditor Name</label>
                <input type="text" [(ngModel)]="newAudit.auditorName" name="auditor" class="form-control form-control-sm" required>
              </div>

              <div class="p-3 bg-light rounded border mb-3">
                <div class="fw-semibold small text-dark mb-2">Safety Verification Checklist</div>
                <div class="row g-2">
                  <div class="col-6">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" [(ngModel)]="newAudit.eyewashFunctional" name="eye" id="chkEye">
                      <label class="form-check-label small" for="chkEye">Eyewash Station Tested & Clear</label>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" [(ngModel)]="newAudit.fumeHoodCertified" name="fume" id="chkFume">
                      <label class="form-check-label small" for="chkFume">Fume Hood Airflow Certified</label>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" [(ngModel)]="newAudit.fireExtinguisherValid" name="fire" id="chkFire">
                      <label class="form-check-label small" for="chkFire">Fire Extinguisher Tag Inspected</label>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" [(ngModel)]="newAudit.chemicalStorageCompliant" name="chem" id="chkChem">
                      <label class="form-check-label small" for="chkChem">Chemical Segregation & Secondary Trays</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Total Audit Score (0 - 100)</label>
                  <input type="number" [(ngModel)]="newAudit.score" name="score" class="form-control form-control-sm" required min="0" max="100">
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">PPE Compliance Rate (%)</label>
                  <input type="number" [(ngModel)]="newAudit.ppeComplianceRate" name="ppe" class="form-control form-control-sm" required min="0" max="100">
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label small fw-semibold">Audit Findings (one per line)</label>
                <textarea [(ngModel)]="findingsText" name="find" rows="2" class="form-control form-control-sm" required></textarea>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm" (click)="showModal = false">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Record Safety Audit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SafetyAuditsComponent {
  invService = inject(InventoryService);
  labService = inject(LaboratoryService);

  showModal = false;
  selectedLabId = 'LAB-01';
  findingsText = 'All airlocks verified within pressure tolerance.\nFlammable safety storage verified.';

  newAudit: Partial<SafetyAudit> = {
    auditDate: '2025-03-05',
    auditorName: 'Campus EHS Inspection Officer',
    score: 95,
    eyewashFunctional: true,
    fumeHoodCertified: true,
    fireExtinguisherValid: true,
    chemicalStorageCompliant: true,
    ppeComplianceRate: 96,
    status: 'PASSED'
  };

  saveAudit() {
    const lab = this.labService.getLabById(this.selectedLabId);
    if (!lab) return;

    const findings = this.findingsText.split('\n').filter(f => f.trim().length > 0);
    const score = Number(this.newAudit.score) || 85;

    const audit: SafetyAudit = {
      id: 'AUD-' + Date.now().toString().slice(-4),
      auditNumber: 'AUD-EHS-' + Math.floor(100 + Math.random() * 900),
      labId: lab.id,
      labName: lab.name,
      auditorName: this.newAudit.auditorName || 'Campus EHS Board',
      auditDate: this.newAudit.auditDate || '2025-03-05',
      score: score,
      findings: findings.length ? findings : ['All safety clearances confirmed.'],
      eyewashFunctional: !!this.newAudit.eyewashFunctional,
      fumeHoodCertified: !!this.newAudit.fumeHoodCertified,
      fireExtinguisherValid: !!this.newAudit.fireExtinguisherValid,
      chemicalStorageCompliant: !!this.newAudit.chemicalStorageCompliant,
      ppeComplianceRate: Number(this.newAudit.ppeComplianceRate) || 95,
      status: score >= 90 ? 'PASSED' : (score >= 75 ? 'ACTION_REQUIRED' : 'CRITICAL')
    };

    this.invService.addSafetyAudit(audit);
    this.showModal = false;
  }
}
