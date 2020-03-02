import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberGroupsComponent } from './components/member-groups/member-groups.component';
import { AppUsersComponent } from './components/app-users/app-users.component';
import { AddAppUserFormComponent } from './components/add-app-user-form/add-app-user-form.component';
import { EditAppUserFormComponent } from './components/edit-app-user-form/edit-app-user-form.component';

const routes: Routes = [
  {path: 'members', component: MemberGroupsComponent},
  {path: 'members/:id', component: AppUsersComponent},
  {path: 'add-member/:id', component: AddAppUserFormComponent},
  {path: 'edit-member/:id', component: EditAppUserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
