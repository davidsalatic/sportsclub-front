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
import { HttpClientModule } from '@angular/common/http';
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
import { AddTrainingSessionDialogComponent } from './components/dialogs/add-training-session-dialog/add-training-session-dialog.component';
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
import { MyAttendancesComponent } from './components/my-attendances/my-attendances.component';

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
    AddTrainingSessionDialogComponent,
    AttendancesComponent,
    UngroupedUsersComponent,
    HomeComponent,
    StaffComponent,
    AddStaffMemberFormComponent,
    EditStaffMemberFormComponent,
    ProfileComponent,
    EditProfileFormComponent,
    EditPasswordDialogComponent,
    MyAttendancesComponent
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
    MatCardModule
  ],
  providers: [MemberGroupService,AppUserService,MembershipService,PaymentService,
    TrainingSessionService,AttendanceService,AuthService,RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
