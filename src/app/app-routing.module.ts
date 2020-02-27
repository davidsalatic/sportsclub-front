import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberGroupsComponent } from './member-groups/member-groups.component';

const routes: Routes = [
  {path: 'members', component: MemberGroupsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
