import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MemberGroupsComponent } from './components/member-groups/member-groups.component';
import { MemberGroupService } from './services/member-group-service';
import {AppUserService} from './services/app-user-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import { AddMemberGroupDialogComponent } from './components/dialogs/add-member-group-dialog/add-member-group-dialog.component';
import { AppUsersComponent } from './components/app-users/app-users.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MembershipsComponent } from './components/memberships/memberships.component';
import { EditAppUserFormComponent } from './components/forms/edit-app-user-form/edit-app-user-form.component';
import { AddAppUserFormComponent } from './components/forms/add-app-user-form/add-app-user-form.component';
import { MembershipService } from './services/membership-service';
import { AppUsersInMembershipComponent } from './components/app-users-in-membership/app-users-in-membership.component';
import { PaymentsForMembershipByAppUserComponent } from './components/payments-for-membership-by-app-user/payments-for-membership-by-app-user.component';
import { PaymentService } from './services/payment-service';
import { ChangeMembershipPriceDialogComponent } from './components/dialogs/change-membership-price-dialog/change-membership-price-dialog.component';
import { AddPaymentComponent } from './components/forms/add-payment/add-payment.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { TrainingSessionService } from './services/training-session-service';
import { SessionsGroupComponent } from './components/sessions-group/sessions-group.component';
import { AttendancesComponent } from './components/attendances/attendances.component';
import { MatCheckboxModule} from "@angular/material/checkbox";
import { AttendanceService } from './services/attendance-service';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { UngroupedUsersComponent } from './components/ungrouped-users/ungrouped-users.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './services/auth-service';
import { RoleService } from './services/role-service';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { AddStaffMemberFormComponent } from './components/forms/add-staff-member-form/add-staff-member-form.component';
import { EditStaffMemberFormComponent } from './components/forms/edit-staff-member-form/edit-staff-member-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileFormComponent } from './components/forms/edit-profile-form/edit-profile-form.component';
import { EditPasswordDialogComponent } from './components/dialogs/edit-password-dialog/edit-password-dialog.component';
import { TermsComponent } from './components/terms/terms.component';
import { TermService } from './services/term-service';
import { AddTermFormComponent } from './components/forms/add-term-form/add-term-form.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AutoGenerateSessionsDialogComponent } from './components/dialogs/auto-generate-sessions-dialog/auto-generate-sessions-dialog.component';
import { PeriodService } from './services/period-service';
import { FileService } from './services/file-service';
import { UserAttendanceComponent } from './components/user-attendance/user-attendance.component';
import { UserPaymentsComponent } from './components/user-payments/user-payments.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HttpInterceptorService } from './interceptor/http-interceptor.service';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { CompetitionService } from './services/competition-service';
import { AddCompetitionFormComponent } from './components/forms/add-competition-form/add-competition-form.component';
import { ApplyCompetitionFormComponent } from './components/forms/apply-competition-form/apply-competition-form.component';
import { EditCompetitionFormComponent } from './components/forms/edit-competition-form/edit-competition-form.component';
import { CompetitionApplicationService } from './services/competition-application-service';
import { AppliedUsersCompetitionComponent } from './components/applied-users-competition/applied-users-competition.component';
import { PostService } from './services/post-service';
import { MessageboardComponent } from './components/messageboard/messageboard.component';
import { AddPostDialogComponent } from './components/dialogs/add-post-dialog/add-post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberGroupsComponent,
    AddMemberGroupDialogComponent,
    AppUsersComponent,
    AddAppUserFormComponent,
    EditAppUserFormComponent,
    MembershipsComponent,
    AppUsersInMembershipComponent,
    PaymentsForMembershipByAppUserComponent,
    ChangeMembershipPriceDialogComponent,
    AddPaymentComponent,
    SessionsComponent,
    SessionsGroupComponent,
    AttendancesComponent,
    UngroupedUsersComponent,
    HomeComponent,
    StaffComponent,
    AddStaffMemberFormComponent,
    EditStaffMemberFormComponent,
    ProfileComponent,
    EditProfileFormComponent,
    EditPasswordDialogComponent,
    TermsComponent,
    AddTermFormComponent,
    AutoGenerateSessionsDialogComponent,
    UserAttendanceComponent,
    UserPaymentsComponent,
    RegistrationComponent,
    LoginComponent,
    CompetitionsComponent,
    AddCompetitionFormComponent,
    ApplyCompetitionFormComponent,
    EditCompetitionFormComponent,
    AppliedUsersCompetitionComponent,
    MessageboardComponent,
    AddPostDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatRadioModule,
    MatCardModule,
    NgxMaterialTimepickerModule
  ],
  providers: [MemberGroupService,AppUserService,MembershipService,PaymentService,
    TrainingSessionService,AttendanceService,AuthService,RoleService,TermService,CompetitionService,PeriodService
    ,FileService, CompetitionApplicationService,PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
