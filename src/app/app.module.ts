import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PackageListComponent } from './packages/package-list/package-list.component';
import { PackageFormComponent } from './packages/package-form/package-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from 'primeng/fileupload';
import { PriceFormComponent } from './packages/price-form/price-form.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatTooltipModule} from '@angular/material/tooltip';
import { IncludeFormComponent } from './packages/include-form/include-form.component';
import { ItineraryDetailFormComponent } from './packages/itinerary-detail-form/itinerary-detail-form.component';
import { DialogNotificationComponent } from './notifications/dialog-notification/dialog-notification.component';
import { LoginComponent } from './security/login/login.component';
import { DialogClonePackageComponent } from './packages/dialog-clone-package/dialog-clone-package.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { DmInterceptor } from './shared/dm.interceptor';
import { ReportsComponent } from './reports/reports.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReportsListComponent } from './reports/reports-list/reports-list.component';
import { DialogHotelInfoComponent } from './shared/components/dialog-hotel-info/dialog-hotel-info.component';
import { DialogPassengerInfoComponent } from './shared/components/dialog-passenger-info/dialog-passenger-info.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ChartersComponent } from './charters/charters.component';
import { ChartersListComponent } from './charters/charters-list/charters-list.component';
import { ChartersDetailComponent } from './charters/charters-detail/charters-detail.component';
import { PartnerClubAdministratorComponent } from './partnerClub/partner-club-administrator/partner-club-administrator.component';
import { DialogSendComponent } from './shared/components/dialog-send/dialog-send.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DialogAdvertenciaComponent } from './shared/components/dialog-advertencia/dialog-advertencia.component';
import { DmStarsComponent } from './shared/components/dm-stars/dm-stars.component';
import { DialogTableComponent } from './shared/components/dialog-table/dialog-table.component';
import { ReportsDetailComponent } from './reports/reports-detail/reports-detail.component';
import { DialogInfoComponent } from './shared/components/dialog-info/dialog-info.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { CotizacionDetailComponent } from './vouchers/cotizacion-detail/cotizacion-detail.component';
import { VouchersListComponent } from './vouchers/vouchers-list/vouchers-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reports', component: ReportsListComponent },
  { path: 'reports-detail', component: ReportsDetailComponent },
  { path: 'package/list', component: PackageListComponent },
  { path: 'package/form', component: PackageFormComponent },
  { path: 'charters', component: ChartersListComponent },
  { path: 'charterDetail', component: ChartersDetailComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'voucher-list', component: VouchersListComponent },
  { path: 'voucher-detail', component: CotizacionDetailComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PackageListComponent,
    PackageFormComponent,
    PriceFormComponent,
    IncludeFormComponent,
    ItineraryDetailFormComponent,
    DialogNotificationComponent,
    LoginComponent,
    DialogClonePackageComponent,
    OrderListComponent,
    ReportsComponent,
    ReportsListComponent,
    DialogHotelInfoComponent,
    DialogPassengerInfoComponent,
    ChartersComponent,
    ChartersListComponent,
    DmStarsComponent,
    ChartersDetailComponent,
    PartnerClubAdministratorComponent,
    DialogSendComponent,
    DialogAdvertenciaComponent,
    DialogTableComponent,
    ReportsDetailComponent,
    DialogInfoComponent,
    VouchersComponent,
    CotizacionDetailComponent,
    VouchersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    HttpClientModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSelectModule,
    FileUploadModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularEditorModule,
    MatTooltipModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DmInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    PriceFormComponent,
    IncludeFormComponent,
    ItineraryDetailFormComponent,
    DialogNotificationComponent,
    DialogClonePackageComponent,
    DialogHotelInfoComponent,
    DialogPassengerInfoComponent,
    DialogSendComponent,
    DialogAdvertenciaComponent,
    DialogTableComponent,
    DialogInfoComponent
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
