import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { GrantsComponent } from './features/projects/grants/grants.component';
import { PublicationsComponent } from './features/projects/publications/publications.component';
import { LabListComponent } from './features/labs/lab-list/lab-list.component';
import { EquipmentCatalogComponent } from './features/labs/equipment-catalog/equipment-catalog.component';
import { BookingManagementComponent } from './features/labs/bookings/bookings.component';
import { MaintenanceLogsComponent } from './features/labs/maintenance/maintenance.component';
import { InventoryListComponent } from './features/inventory/inventory-list/inventory-list.component';
import { RequisitionsComponent } from './features/inventory/requisitions/requisitions.component';
import { SafetyAuditsComponent } from './features/inventory/safety-audits/safety-audits.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserListComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'grants', component: GrantsComponent },
      { path: 'publications', component: PublicationsComponent },
      { path: 'labs', component: LabListComponent },
      { path: 'equipment', component: EquipmentCatalogComponent },
      { path: 'bookings', component: BookingManagementComponent },
      { path: 'maintenance', component: MaintenanceLogsComponent },
      { path: 'inventory', component: InventoryListComponent },
      { path: 'requisitions', component: RequisitionsComponent },
      { path: 'safety-audits', component: SafetyAuditsComponent }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
