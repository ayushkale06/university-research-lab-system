import { User } from './user.model';

export type ProjectStatus = 'PROPOSED' | 'APPROVED' | 'ACTIVE' | 'UNDER_REVIEW' | 'COMPLETED';

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  description: string;
}

export interface Grant {
  id: string;
  grantNumber: string;
  title: string;
  fundingAgency: string;
  totalBudget: number;
  disbursedAmount: number;
  utilizedAmount: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'AUDITED' | 'CLOSED';
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  status: 'PUBLISHED' | 'ACCEPTED' | 'UNDER_REVIEW';
  linkedProjectId?: string;
  citations: number;
}

export interface ResearchProject {
  id: string;
  code: string;
  title: string;
  abstract: string;
  department: string;
  leadPI: User;
  coInvestigators: User[];
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  milestones: Milestone[];
  grantId?: string;
  grantDetails?: Grant;
}
