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
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { AddStaffMemberFormComponent } from './components/forms/add-staff-member-form/add-staff-member-form.component';
import { EditStaffMemberFormComponent } from './components/forms/edit-staff-member-form/edit-staff-member-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileFormComponent } from './components/forms/edit-profile-form/edit-profile-form.component';
import { TermsComponent } from './components/terms/terms.component';
import { AddTermFormComponent } from './components/forms/add-term-form/add-term-form.component';
import { UserAttendanceComponent } from './components/user-attendance/user-attendance.component';
import { UserPaymentsComponent } from './components/user-payments/user-payments.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { AddCompetitionFormComponent } from './components/forms/add-competition-form/add-competition-form.component';
import { ApplyCompetitionFormComponent } from './components/forms/apply-competition-form/apply-competition-form.component';
import { EditCompetitionFormComponent } from './components/forms/edit-competition-form/edit-competition-form.component';
import { AppliedUsersCompetitionComponent } from './components/applied-users-competition/applied-users-competition.component';
import { MessageboardComponent } from './components/messageboard/messageboard.component';
import { PostComponent } from './components/post/post.component';
import { InfoComponent } from './components/info/info.component';
import { EditPaymentFormComponent } from './components/forms/edit-payment-form/edit-payment-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home',component:HomeComponent},
  {path: 'members', component: MemberGroupsComponent},
  {path: 'members/:id', component: AppUsersComponent},
  {path: 'members/users/ungrouped',component:UngroupedUsersComponent},
  {path: 'members/group/:id/add', component: AddAppUserFormComponent},
  {path: 'members/user/:id/edit', component: EditAppUserFormComponent},
  {path: 'memberships', component:MembershipsComponent},
  {path: 'memberships/:id',component:AppUsersInMembershipComponent},
  {path: 'payments/membership/:membershipId/user/:appUserId',component:PaymentsForMembershipByAppUserComponent},
  {path: 'payments/membership/:membershipId/user/:appUserId/add',component:AddPaymentComponent},
  {path: 'payments/:id',component:EditPaymentFormComponent},
  {path: 'payments/member/:appUserId',component:UserPaymentsComponent},
  {path: 'sessions',component:SessionsComponent},
  {path: 'sessions/group/:groupId/period/:periodId',component:SessionsGroupComponent},
  {path: 'sessions/:id/attendances',component:AttendancesComponent},
  {path: 'staff',component:StaffComponent},
  {path: 'staff/add',component:AddStaffMemberFormComponent},
  {path: 'staff/:id/edit',component:EditStaffMemberFormComponent},
  {path: 'profile',component:ProfileComponent},
  {path: 'profile/edit',component:EditProfileFormComponent},
  {path: 'attendances/member/:appUserId',component:UserAttendanceComponent},
  {path: 'terms/group/:groupId',component:TermsComponent},
  {path: 'terms/group/:groupId/add',component:AddTermFormComponent},
  {path: 'register/:token',component:RegistrationComponent},
  {path: 'login',component:LoginComponent},
  {path: 'competitions',component:CompetitionsComponent},
  {path: 'competitions/add',component:AddCompetitionFormComponent},
  {path: 'competitions/:id/apply',component:ApplyCompetitionFormComponent},
  {path: 'competitions/:id/edit',component:EditCompetitionFormComponent},
  {path: 'competitions/:id/applications', component:AppliedUsersCompetitionComponent},
  {path: 'posts', component:MessageboardComponent},
  {path: 'posts/:id/comments',component:PostComponent},
  {path: 'info',component:InfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
