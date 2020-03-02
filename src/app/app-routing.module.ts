import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberGroupsComponent } from './components/member-groups/member-groups.component';
import { AppUsersComponent } from './components/app-users/app-users.component';
import { MembershipsComponent } from './components/memberships/memberships.component';
import { EditAppUserFormComponent } from './components/forms/edit-app-user-form/edit-app-user-form.component';
import { AddAppUserFormComponent } from './components/forms/add-app-user-form/add-app-user-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/members', pathMatch:'full'},
  {path: 'members', component: MemberGroupsComponent},
  {path: 'members/:id', component: AppUsersComponent},
  {path: 'add-member/:id', component: AddAppUserFormComponent},
  {path: 'edit-member/:id', component: EditAppUserFormComponent},
  {path: 'memberships', component:MembershipsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
