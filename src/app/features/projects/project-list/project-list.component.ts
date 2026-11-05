import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { AuthService } from '../../../core/services/auth.service';
import { ResearchProject, ProjectStatus } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">University Research Projects</h4>
            <span class="badge bg-secondary">Module 2</span>
          </div>
          <p class="text-muted small mb-0">Manage proposals, active research lifecycles, team allocation, and milestones</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showCreateModal = true">
          <i class="bi bi-plus-circle me-1"></i> Submit Research Proposal
        </button>
      </div>

      <!-- Filters & Stats bar -->
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-8">
          <div class="card">
            <div class="card-body p-3">
              <div class="row g-2">
                <div class="col-12 col-sm-7">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
                    <input type="text" [(ngModel)]="searchQuery" class="form-control" placeholder="Search project title, code, or department...">
                  </div>
                </div>
                <div class="col-12 col-sm-5">
                  <select [(ngModel)]="statusFilter" class="form-select form-select-sm">
                    <option value="ALL">All Statuses</option>
                    <option value="ACTIVE">Active Projects</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="card bg-primary text-white h-100 p-3">
            <div class="small text-white-50 fw-semibold text-uppercase">Cumulative Sanctioned Grants</div>
            <div class="fs-4 fw-bold mt-1">\${{ totalBudget() | number }}</div>
            <div class="small text-white-75 mt-auto">Across {{ projectService.projects().length }} funded investigations</div>
          </div>
        </div>
      </div>

      <!-- Project Cards Grid -->
      <div class="row g-3">
        <div class="col-12 col-lg-6" *ngFor="let p of filteredProjects()">
          <div class="card h-100 shadow-sm border">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-start">
              <div>
                <span class="badge bg-light text-primary border me-2 font-monospace">{{ p.code }}</span>
                <span class="badge" [ngClass]="{
                  'bg-success': p.status === 'ACTIVE',
                  'bg-warning text-dark': p.status === 'UNDER_REVIEW',
                  'bg-info text-dark': p.status === 'COMPLETED'
                }">{{ p.status }}</span>
                <h5 class="fw-bold text-dark mt-2 mb-1 fs-6">{{ p.title }}</h5>
                <small class="text-muted"><i class="bi bi-building me-1"></i> {{ p.department }}</small>
              </div>
            </div>

            <div class="card-body py-3">
              <p class="text-secondary small mb-3 text-truncate-3" style="min-height: 48px;">
                {{ p.abstract }}
              </p>

              <!-- Lead PI & Budget -->
              <div class="d-flex justify-content-between align-items-center p-2 rounded bg-light mb-3">
                <div class="d-flex align-items-center gap-2">
                  <img [src]="p.leadPI.avatarUrl" class="rounded-circle" width="30" height="30" style="object-fit: cover;">
                  <div>
                    <div class="fw-semibold small lh-1">{{ p.leadPI.name }}</div>
                    <small class="text-muted" style="font-size: 0.7rem;">Lead Principal Investigator</small>
                  </div>
                </div>
                <div class="text-end">
                  <div class="fw-bold text-success small">\${{ p.budget | number }}</div>
                  <small class="text-muted" style="font-size: 0.7rem;">Sanctioned Budget</small>
                </div>
              </div>

              <!-- Milestones Progress Tracker -->
              <div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="small fw-semibold text-secondary">Milestone Deliverables</span>
                  <span class="small text-muted">{{ getCompletedMilestonesCount(p) }} / {{ p.milestones.length }} Done</span>
                </div>
                <div class="progress mb-2" style="height: 6px;">
                  <div class="progress-bar bg-success" [style.width.%]="getMilestoneProgress(p)"></div>
                </div>

                <div class="list-group list-group-flush border-top border-bottom my-2">
                  <div *ngFor="let m of p.milestones" class="list-group-item px-0 py-1 d-flex align-items-center justify-content-between small">
                    <div class="form-check mb-0">
                      <input class="form-check-input" type="checkbox" [checked]="m.completed" (change)="projectService.toggleMilestone(p.id, m.id)" [id]="'chk-' + m.id">
                      <label class="form-check-label text-dark" [class.text-decoration-line-through]="m.completed" [for]="'chk-' + m.id">
                        {{ m.title }}
                      </label>
                    </div>
                    <span class="badge bg-light text-muted border" style="font-size: 0.65rem;">{{ m.dueDate }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer bg-white border-top py-2 d-flex justify-content-between align-items-center">
              <small class="text-muted"><i class="bi bi-calendar-event me-1"></i> Period: {{ p.startDate }} to {{ p.endDate }}</small>
              <button class="btn btn-outline-primary btn-sm py-1 px-3" (click)="selectProject(p)">
                <i class="bi bi-eye me-1"></i> View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div *ngIf="selectedProj" class="modal-backdrop fade show"></div>
    <div *ngIf="selectedProj" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-dark text-white">
            <div>
              <span class="badge bg-primary mb-1">{{ selectedProj.code }}</span>
              <h5 class="modal-title fs-6 fw-bold">{{ selectedProj.title }}</h5>
            </div>
            <button type="button" class="btn-close btn-close-white" (click)="selectedProj = null"></button>
          </div>
          <div class="modal-body p-4">
            <h6 class="fw-bold text-dark">Executive Summary</h6>
            <p class="text-secondary small">{{ selectedProj.abstract }}</p>

            <div class="row g-3 my-2">
              <div class="col-md-6">
                <div class="p-3 bg-light rounded border">
                  <span class="text-muted small fw-bold">LEAD PRINCIPAL INVESTIGATOR</span>
                  <div class="fw-bold text-dark mt-1">{{ selectedProj.leadPI.name }}</div>
                  <div class="small text-muted">{{ selectedProj.leadPI.department }}</div>
                  <div class="small text-muted">{{ selectedProj.leadPI.email }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="p-3 bg-light rounded border">
                  <span class="text-muted small fw-bold">FINANCIAL & SCHEDULE SUMMARY</span>
                  <div class="fw-bold text-success fs-5 mt-1">\${{ selectedProj.budget | number }}</div>
                  <div class="small text-muted">Timeline: {{ selectedProj.startDate }} — {{ selectedProj.endDate }}</div>
                  <div class="small text-primary fw-semibold" *ngIf="selectedProj.grantDetails">Sponsored by: {{ selectedProj.grantDetails.fundingAgency }}</div>
                </div>
              </div>
            </div>

            <h6 class="fw-bold text-dark mt-3 mb-2">Milestone Schedule</h6>
            <div class="table-responsive">
              <table class="table table-sm table-bordered">
                <thead class="table-light">
                  <tr>
                    <th>Milestone Task</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let m of selectedProj.milestones">
                    <td class="small">{{ m.title }}</td>
                    <td class="small">{{ m.dueDate }}</td>
                    <td>
                      <span class="badge" [ngClass]="m.completed ? 'bg-success' : 'bg-secondary'">
                        {{ m.completed ? 'Completed' : 'Pending' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer bg-light py-2">
            <button type="button" class="btn btn-secondary btn-sm" (click)="selectedProj = null">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Proposal Modal -->
    <div *ngIf="showCreateModal" class="modal-backdrop fade show"></div>
    <div *ngIf="showCreateModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fs-6 fw-bold">Submit New Research Proposal</h5>
            <button type="button" class="btn-close btn-close-white" (click)="showCreateModal = false"></button>
          </div>
          <div class="modal-body p-4">
            <form (ngSubmit)="saveProposal()">
              <div class="row g-2 mb-3">
                <div class="col-8">
                  <label class="form-label small fw-semibold">Project Title</label>
                  <input type="text" [(ngModel)]="newProj.title" name="title" class="form-control form-control-sm" required placeholder="e.g. Next-Gen Nanoparticle Drug Delivery">
                </div>
                <div class="col-4">
                  <label class="form-label small fw-semibold">Project Code</label>
                  <input type="text" [(ngModel)]="newProj.code" name="code" class="form-control form-control-sm" required placeholder="e.g. NANO-2025-09">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label small fw-semibold">Department</label>
                <input type="text" [(ngModel)]="newProj.department" name="dept" class="form-control form-control-sm" required>
              </div>
              <div class="mb-3">
                <label class="form-label small fw-semibold">Abstract / Scope of Investigation</label>
                <textarea [(ngModel)]="newProj.abstract" name="abstract" rows="3" class="form-control form-control-sm" required></textarea>
              </div>
              <div class="row g-2 mb-3">
                <div class="col-4">
                  <label class="form-label small fw-semibold">Requested Budget ($)</label>
                  <input type="number" [(ngModel)]="newProj.budget" name="budget" class="form-control form-control-sm" required>
                </div>
                <div class="col-4">
                  <label class="form-label small fw-semibold">Start Date</label>
                  <input type="date" [(ngModel)]="newProj.startDate" name="startDate" class="form-control form-control-sm" required>
                </div>
                <div class="col-4">
                  <label class="form-label small fw-semibold">End Date</label>
                  <input type="date" [(ngModel)]="newProj.endDate" name="endDate" class="form-control form-control-sm" required>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm" (click)="showCreateModal = false">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Submit Proposal</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectListComponent {
  projectService = inject(ProjectService);
  authService = inject(AuthService);

  searchQuery = '';
  statusFilter = 'ALL';
  showCreateModal = false;
  selectedProj: ResearchProject | null = null;

  newProj: Partial<ResearchProject> = {
    title: '',
    code: '',
    department: 'Department of Nanotechnology & Materials',
    abstract: '',
    budget: 250000,
    startDate: '2025-06-01',
    endDate: '2027-05-31'
  };

  totalBudget = () => this.projectService.projects().reduce((sum, p) => sum + p.budget, 0);

  filteredProjects = () => {
    return this.projectService.projects().filter(p => {
      const matchStatus = this.statusFilter === 'ALL' || p.status === this.statusFilter;
      const matchQuery = !this.searchQuery ||
        p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.department.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchStatus && matchQuery;
    });
  };

  getCompletedMilestonesCount(p: ResearchProject): number {
    return p.milestones.filter(m => m.completed).length;
  }

  getMilestoneProgress(p: ResearchProject): number {
    if (!p.milestones.length) return 0;
    return Math.round((this.getCompletedMilestonesCount(p) / p.milestones.length) * 100);
  }

  selectProject(p: ResearchProject) {
    this.selectedProj = p;
  }

  saveProposal() {
    if (!this.newProj.title || !this.newProj.code) return;

    const current = this.authService.currentUser()!;
    const proj: ResearchProject = {
      id: 'PRJ-' + Date.now().toString().slice(-4),
      code: this.newProj.code,
      title: this.newProj.title,
      abstract: this.newProj.abstract || 'Project proposal pending review.',
      department: this.newProj.department || 'Science Faculty',
      leadPI: current,
      coInvestigators: [],
      status: 'UNDER_REVIEW',
      startDate: this.newProj.startDate || '2025-06-01',
      endDate: this.newProj.endDate || '2027-05-31',
      budget: Number(this.newProj.budget) || 200000,
      milestones: [
        { id: 'M-INIT', title: 'Preliminary literature review and protocol standardization', dueDate: '2025-08-30', completed: false, description: 'Initial protocol setup' },
        { id: 'M-MID', title: 'Mid-term experimental validation report', dueDate: '2026-03-31', completed: false, description: 'Intermediate review' }
      ]
    };

    this.projectService.addProject(proj);
    this.showCreateModal = false;
  }
}
