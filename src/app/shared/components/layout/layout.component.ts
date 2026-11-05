import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="d-flex flex-column min-vh-100 bg-light">
      <app-navbar></app-navbar>
      <div class="container-fluid flex-grow-1 p-0">
        <div class="row g-0 flex-nowrap min-vh-100">
          <div class="col-auto col-md-3 col-xl-2 px-0 d-none d-md-block">
            <app-sidebar></app-sidebar>
          </div>
          <main class="col ps-md-2 pt-3 pe-md-3 pb-5 overflow-auto">
            <div class="container-fluid px-3 px-lg-4">
              <router-outlet></router-outlet>
            </div>
          </main>
        </div>
      </div>
    </div>
  `
})
export class LayoutComponent {}
