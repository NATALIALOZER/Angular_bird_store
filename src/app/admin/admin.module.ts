import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./shared/services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./shared/services/auth.guard";



@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    DashboardComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {
            path: '', redirectTo: '/admin/login', pathMatch: 'full'
          },
          {
            path: 'login', component: LoginComponent
          },
          {
            path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
          },
          {
            path: 'create', component: CreateComponent, canActivate: [AuthGuard]
          },
          {
            path: 'product/:id/edit', component: EditComponent, canActivate: [AuthGuard]
          }
        ]
      }
    ])
  ],
  exports:[
    RouterModule
  ],
  providers: [AuthGuard]
})
export class AdminModule { }
