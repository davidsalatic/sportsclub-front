import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberGroupsComponent } from './components/member-groups/member-groups.component';
import { AppUsersComponent } from './components/app-users/app-users.component';
import { MembershipsComponent } from './components/memberships/memberships.component';
import { EditAppUserFormComponent } from './components/forms/edit-app-user-form/edit-app-user-form.component';
import { AddAppUserFormComponent } from './components/forms/add-app-user-form/add-app-user-form.component';
import { AppUsersInMembershipComponent } from './components/app-users-in-membership/app-users-in-membership.component';
import { PaymentsForMembershipByAppUserComponent } from './components/payments-for-membership-by-app-user/payments-for-membership-by-app-user.component';
import { AddPaymentComponent } from './components/forms/add-payment/add-payment.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { SessionsGroupComponent } from './components/sessions-group/sessions-group.component';
import { AttendancesComponent } from './components/attendances/attendances.component';
import { UngroupedUsersComponent } from './components/ungrouped-users/ungrouped-users.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'members', component: MemberGroupsComponent},
  {path: 'members/:id', component: AppUsersComponent},
  {path: 'members/users/ungrouped',component:UngroupedUsersComponent},
  {path: 'members/group/:id/add', component: AddAppUserFormComponent},
  {path: 'members/user/:id/edit', component: EditAppUserFormComponent},
  {path: 'memberships', component:MembershipsComponent},
  {path: 'memberships/:id',component:AppUsersInMembershipComponent},
  {path: 'payments/membership/:membershipId/user/:appUserId',component:PaymentsForMembershipByAppUserComponent},
  {path: 'payments/membership/:membershipId/user/:appUserId/add',component:AddPaymentComponent},
  {path: 'sessions',component:SessionsComponent},
  {path: 'sessions/group/:groupId',component:SessionsGroupComponent},
  {path: 'sessions/:id/group/:groupId/attendances',component:AttendancesComponent},
  {path:'login', component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
