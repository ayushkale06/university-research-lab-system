import { Injectable, signal, computed } from '@angular/core';
import { ResearchProject, Grant, Publication, Milestone } from '../models/project.model';
import { INITIAL_PROJECTS, INITIAL_GRANTS, INITIAL_PUBLICATIONS } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly PROJECTS_KEY = 'urlms_projects';
  private readonly GRANTS_KEY = 'urlms_grants';
  private readonly PUBS_KEY = 'urlms_publications';

  private projectsSignal = signal<ResearchProject[]>(this.loadProjects());
  private grantsSignal = signal<Grant[]>(this.loadGrants());
  private pubsSignal = signal<Publication[]>(this.loadPublications());

  public projects = computed(() => this.projectsSignal());
  public grants = computed(() => this.grantsSignal());
  public publications = computed(() => this.pubsSignal());

  constructor() {}

  private loadProjects(): ResearchProject[] {
    const data = localStorage.getItem(this.PROJECTS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
    return [...INITIAL_PROJECTS];
  }

  private loadGrants(): Grant[] {
    const data = localStorage.getItem(this.GRANTS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.GRANTS_KEY, JSON.stringify(INITIAL_GRANTS));
    return [...INITIAL_GRANTS];
  }

  private loadPublications(): Publication[] {
    const data = localStorage.getItem(this.PUBS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(this.PUBS_KEY, JSON.stringify(INITIAL_PUBLICATIONS));
    return [...INITIAL_PUBLICATIONS];
  }

  public getProjectById(id: string): ResearchProject | undefined {
    return this.projectsSignal().find(p => p.id === id);
  }

  public addProject(project: ResearchProject): void {
    const updated = [project, ...this.projectsSignal()];
    this.projectsSignal.set(updated);
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(updated));
  }

  public updateProject(project: ResearchProject): void {
    const updated = this.projectsSignal().map(p => p.id === project.id ? project : p);
    this.projectsSignal.set(updated);
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(updated));
  }

  public deleteProject(id: string): void {
    const updated = this.projectsSignal().filter(p => p.id !== id);
    this.projectsSignal.set(updated);
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(updated));
  }

  public toggleMilestone(projectId: string, milestoneId: string): void {
    const project = this.getProjectById(projectId);
    if (!project) return;

    const updatedMilestones = project.milestones.map(m => {
      if (m.id === milestoneId) {
        return { ...m, completed: !m.completed };
      }
      return m;
    });

    const updatedProject = { ...project, milestones: updatedMilestones };
    this.updateProject(updatedProject);
  }

  public addGrant(grant: Grant): void {
    const updated = [grant, ...this.grantsSignal()];
    this.grantsSignal.set(updated);
    localStorage.setItem(this.GRANTS_KEY, JSON.stringify(updated));
  }

  public addPublication(pub: Publication): void {
    const updated = [pub, ...this.pubsSignal()];
    this.pubsSignal.set(updated);
    localStorage.setItem(this.PUBS_KEY, JSON.stringify(updated));
  }
}
