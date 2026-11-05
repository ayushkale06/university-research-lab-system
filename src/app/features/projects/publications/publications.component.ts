import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { Publication } from '../../../core/models/project.model';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h4 class="fw-bold text-dark mb-0">University Publications & DOIs Repository</h4>
            <span class="badge bg-secondary">Member 2</span>
          </div>
          <p class="text-muted small mb-0">Peer-reviewed journal papers, citations index, and institutional research output</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showAddModal = true">
          <i class="bi bi-file-earmark-plus me-1"></i> Register New Publication
        </button>
      </div>

      <!-- Publication Metrics Summary -->
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <div class="card p-3 bg-light">
            <span class="text-muted small fw-bold">TOTAL INDEXED PUBLICATIONS</span>
            <div class="fs-4 fw-bold text-dark mt-1">{{ projectService.publications().length }}</div>
            <div class="small text-muted">Across Scopus, Web of Science, Nature & IEEE</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3 bg-light">
            <span class="text-muted small fw-bold">CUMULATIVE CITATIONS</span>
            <div class="fs-4 fw-bold text-primary mt-1">{{ totalCitations() }}</div>
            <div class="small text-muted">Field-Weighted Citation Impact: 2.14</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3 bg-light">
            <span class="text-muted small fw-bold">ACCEPTED / IN PRESS</span>
            <div class="fs-4 fw-bold text-success mt-1">{{ acceptedCount() }} Papers</div>
            <div class="small text-muted">Undergoing final publisher galley proofing</div>
          </div>
        </div>
      </div>

      <!-- Publications List -->
      <div class="card shadow-sm border">
        <div class="card-body p-0">
          <div class="list-group list-group-flush">
            <div *ngFor="let p of projectService.publications()" class="list-group-item p-4">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-2 mb-2">
                <div>
                  <span class="badge" [ngClass]="{
                    'bg-success': p.status === 'PUBLISHED',
                    'bg-primary': p.status === 'ACCEPTED',
                    'bg-warning text-dark': p.status === 'UNDER_REVIEW'
                  }">{{ p.status }}</span>
                  <span class="badge bg-light text-muted border ms-2">Year: {{ p.year }}</span>
                  <h5 class="fw-bold text-dark mt-2 mb-1 fs-6">{{ p.title }}</h5>
                  <div class="small text-secondary mb-1">
                    <i class="bi bi-people me-1"></i> <strong>Authors:</strong> {{ p.authors.join(', ') }}
                  </div>
                  <div class="small text-muted">
                    <i class="bi bi-journal-bookmark me-1"></i> <em>{{ p.journal }}</em>
                  </div>
                </div>

                <div class="text-md-end">
                  <div class="badge bg-primary-subtle text-primary border border-primary-subtle p-2 mb-2">
                    <i class="bi bi-quote"></i> {{ p.citations }} Citations
                  </div>
                  <div>
                    <a [href]="'https://doi.org/' + p.doi" target="_blank" class="btn btn-outline-secondary btn-sm py-1 px-2 font-monospace" style="font-size: 0.75rem;">
                      <i class="bi bi-link-45deg"></i> {{ p.doi }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Publication Modal -->
    <div *ngIf="showAddModal" class="modal-backdrop fade show"></div>
    <div *ngIf="showAddModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fs-6 fw-bold">Register New Publication</h5>
            <button type="button" class="btn-close btn-close-white" (click)="showAddModal = false"></button>
          </div>
          <div class="modal-body p-4">
            <form (ngSubmit)="savePub()">
              <div class="mb-2">
                <label class="form-label small fw-semibold">Article Title</label>
                <input type="text" [(ngModel)]="newPub.title" name="title" class="form-control form-control-sm" required>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Journal / Conference Name</label>
                <input type="text" [(ngModel)]="newPub.journal" name="journal" class="form-control form-control-sm" required>
              </div>
              <div class="mb-2">
                <label class="form-label small fw-semibold">Authors (comma separated)</label>
                <input type="text" [(ngModel)]="authorsInput" name="authors" class="form-control form-control-sm" required placeholder="Dr. Sharma, Priya Nair, et al.">
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label small fw-semibold">Publication Year</label>
                  <input type="number" [(ngModel)]="newPub.year" name="year" class="form-control form-control-sm" required>
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold">Status</label>
                  <select [(ngModel)]="newPub.status" name="status" class="form-select form-select-sm">
                    <option value="PUBLISHED">Published</option>
                    <option value="ACCEPTED">Accepted / In Press</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label small fw-semibold">DOI String</label>
                <input type="text" [(ngModel)]="newPub.doi" name="doi" class="form-control form-control-sm" placeholder="10.1016/j.bios.2025.115891">
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm" (click)="showAddModal = false">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Submit Publication</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PublicationsComponent {
  projectService = inject(ProjectService);

  showAddModal = false;
  authorsInput = 'Dr. Elena Sharma, Priya Nair';

  newPub: Partial<Publication> = {
    title: '',
    journal: 'ACS Applied Materials & Interfaces',
    year: 2025,
    status: 'PUBLISHED',
    doi: '10.1021/acsami.5b02194',
    citations: 0
  };

  totalCitations = () => this.projectService.publications().reduce((s, p) => s + p.citations, 0);
  acceptedCount = () => this.projectService.publications().filter(p => p.status === 'ACCEPTED').length;

  savePub() {
    if (!this.newPub.title || !this.newPub.journal) return;

    const pub: Publication = {
      id: 'PUB-' + Date.now().toString().slice(-4),
      title: this.newPub.title,
      authors: this.authorsInput.split(',').map(a => a.trim()),
      journal: this.newPub.journal,
      year: Number(this.newPub.year) || 2025,
      doi: this.newPub.doi || '10.1000/182',
      status: this.newPub.status || 'PUBLISHED',
      citations: Number(this.newPub.citations) || 0
    };

    this.projectService.addPublication(pub);
    this.showAddModal = false;
  }
}
