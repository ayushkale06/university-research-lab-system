import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { Grant } from '../../../core/models/project.model';

@Component({
  selector: 'app-grants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">Sponsored Grants & Funding Portfolios</h4>
            <span class="badge bg-success">Member 2</span>
          </div>
          <p class="text-muted small mb-0">National agencies, international grants, budget disbursement and utilization tracking</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showAddModal = true">
          <i class="bi bi-wallet2 me-1"></i> Register New Grant
        </button>
      </div>

      <!-- Financial Summary Cards -->
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <div class="card p-3 border-start border-primary border-4">
            <span class="text-muted small fw-bold text-uppercase">Total Sanctioned Grants</span>
            <div class="fs-4 fw-bold text-dark mt-1">\${{ totalBudget() | number }}</div>
            <div class="small text-muted">{{ projectService.grants().length }} approved research projects</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3 border-start border-success border-4">
            <span class="text-muted small fw-bold text-uppercase">Total Disbursed Funds</span>
            <div class="fs-4 fw-bold text-success mt-1">\${{ totalDisbursed() | number }}</div>
            <div class="small text-muted">{{ (totalDisbursed() / totalBudget() * 100) | number:'1.0-1' }}% of total funds received</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3 border-start border-warning border-4">
            <span class="text-muted small fw-bold text-uppercase">Total Utilized & Audited</span>
            <div class="fs-4 fw-bold text-warning mt-1">\${{ totalUtilized() | number }}</div>
            <div class="small text-muted">Remaining Balance: \${{ (totalBudget() - totalUtilized()) | number }}</div>
          </div>
        </div>
      </div>

      <!-- Grants Table -->
      <div class="card shadow-sm border">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Grant Number</th>
                  <th>Project / Proposal Title</th>
                  <th>Funding Agency</th>
                  <th>Total Sanctioned</th>
                  <th>Disbursed</th>
                  <th>Utilization Rate</th>
                  <th>Status</th>
                  <th>Period</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let g of projectService.grants()">
                  <td>
                    <span class="badge bg-light text-primary border font-monospace">{{ g.grantNumber }}</span>
                  </td>
                  <td>
                    <div class="fw-semibold text-dark small" style="max-width: 280px;">{{ g.title }}</div>
                  </td>
                  <td class="small fw-semibold text-secondary">{{ g.fundingAgency }}</td>
                  <td class="fw-bold small">\${{ g.totalBudget | number }}</td>
                  <td class="small text-success">\${{ g.disbursedAmount | number }}</td>
                  <td style="min-width: 140px;">
                    <div class="d-flex justify-content-between small text-muted mb-1" style="font-size: 0.7rem;">
                      <span>\${{ g.utilizedAmount | number }}</span>
                      <span>{{ getPercent(g) }}%</span>
                    </div>
                    <div class="progress" style="height: 6px;">
                      <div class="progress-bar" [class.bg-success]="getPercent(g) < 75" [class.bg-warning]="getPercent(g) >= 75 && getPercent(g) < 90" [class.bg-danger]="getPercent(g) >= 90" [style.width.%]="getPercent(g)"></div>
                    </div>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-success': g.status === 'ACTIVE',
                      'bg-info text-dark': g.status === 'AUDITED',
                      'bg-secondary': g.status === 'CLOSED'
                    }">{{ g.status }}</span>
                  </td>
                  <td class="small text-muted">{{ g.startDate }} to {{ g.endDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Grant Modal -->
    <div *ngIf="showAddModal" class="modal-backdrop fade show"></div>
    <div *ngIf="showAddModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title fs-6 fw-bold">Register New Sponsored Grant</h5>
            <button type="button" class="btn-close btn-close-white" (click)="showAddModal = false"></button>
          </div>
          <div class="modal-body p-4">
            <form (ngSubmit)="saveGrant()">
              <div class="mb-2">
                <label class="form-label small fw-semibold">Grant Identification Number</label>
                <input type="text" [(ngModel)]="newGrant.grantNumber" name="gnum" class="form-control form-control-sm" required placeholder="e.g. NSF-BIO-2025-01">
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Project Title</label>
                <input type="text" [(ngModel)]="newGrant.title" name="title" class="form-control form-control-sm" required>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Funding Agency</label>
                <input type="text" [(ngModel)]="newGrant.fundingAgency" name="agency" class="form-control form-control-sm" required placeholder="e.g. National Science Foundation">
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Total Sanctioned ($)</label>
                  <input type="number" [(ngModel)]="newGrant.totalBudget" name="total" class="form-control form-control-sm" required>
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">Disbursed Amount ($)</label>
                  <input type="number" [(ngModel)]="newGrant.disbursedAmount" name="disb" class="form-control form-control-sm" required>
                </div>
              </div>
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Start Date</label>
                  <input type="date" [(ngModel)]="newGrant.startDate" name="sdate" class="form-control form-control-sm" required>
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">End Date</label>
                  <input type="date" [(ngModel)]="newGrant.endDate" name="edate" class="form-control form-control-sm" required>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm" (click)="showAddModal = false">Cancel</button>
                <button type="submit" class="btn btn-success btn-sm">Save Grant</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class GrantsComponent {
  projectService = inject(ProjectService);

  showAddModal = false;

  newGrant: Partial<Grant> = {
    grantNumber: '',
    title: '',
    fundingAgency: 'National Science Foundation (NSF)',
    totalBudget: 500000,
    disbursedAmount: 250000,
    utilizedAmount: 0,
    startDate: '2025-04-01',
    endDate: '2027-03-31',
    status: 'ACTIVE'
  };

  totalBudget = () => this.projectService.grants().reduce((s, g) => s + g.totalBudget, 0);
  totalDisbursed = () => this.projectService.grants().reduce((s, g) => s + g.disbursedAmount, 0);
  totalUtilized = () => this.projectService.grants().reduce((s, g) => s + g.utilizedAmount, 0);

  getPercent(g: Grant): number {
    return Math.round((g.utilizedAmount / g.totalBudget) * 100);
  }

  saveGrant() {
    if (!this.newGrant.grantNumber || !this.newGrant.title) return;

    const grant: Grant = {
      id: 'GRT-' + Date.now().toString().slice(-4),
      grantNumber: this.newGrant.grantNumber,
      title: this.newGrant.title,
      fundingAgency: this.newGrant.fundingAgency || 'Agency',
      totalBudget: Number(this.newGrant.totalBudget) || 100000,
      disbursedAmount: Number(this.newGrant.disbursedAmount) || 50000,
      utilizedAmount: 0,
      startDate: this.newGrant.startDate || '2025-01-01',
      endDate: this.newGrant.endDate || '2026-12-31',
      status: 'ACTIVE'
    };

    this.projectService.addGrant(grant);
    this.showAddModal = false;
  }
}
