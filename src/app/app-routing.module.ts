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

const routes: Routes = [
  {path: '', redirectTo: '/members', pathMatch:'full'},
  {path: 'members', component: MemberGroupsComponent},
  {path: 'members/:id', component: AppUsersComponent},
  {path: 'add-member/:id', component: AddAppUserFormComponent},
  {path: 'edit-member/:id', component: EditAppUserFormComponent},
  {path: 'memberships', component:MembershipsComponent},
  {path: 'memberships/:id',component:AppUsersInMembershipComponent},
  {path: 'payments/membership/:membershipId/user/:appUserId',component:PaymentsForMembershipByAppUserComponent},
  {path: 'payments/membership/:membershipId/user/:appUserId/add',component:AddPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
