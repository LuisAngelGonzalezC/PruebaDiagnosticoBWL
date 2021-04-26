import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './pages/layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './pages/layouts/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  { path: '', component: AuthLayoutComponent, children: [
    { path: '', component: LoginComponent, canActivate: [GuestGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [GuestGuard]}
  ]},
  { path: 'dashboard', component: DashboardLayoutComponent, children: [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] }
  ]},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
