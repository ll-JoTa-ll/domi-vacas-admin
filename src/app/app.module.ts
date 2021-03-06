import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PackageListComponent } from './packages/package-list/package-list.component';
import { PackageFormComponent } from './packages/package-form/package-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    PackageListComponent,
    PackageFormComponent,
    PriceFormComponent,
    IncludeFormComponent,
    ItineraryDetailFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatButtonModule,
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
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularEditorModule,
    MatTooltipModule,
    RouterModule.forRoot([
      { path: '', component: PackageListComponent },
      { path: 'package/form', component: PackageFormComponent }
    ]),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'},
  ],
  entryComponents: [ PriceFormComponent, IncludeFormComponent, ItineraryDetailFormComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
