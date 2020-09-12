import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerClubAdministratorComponent } from './partnerClub/partner-club-administrator/partner-club-administrator.component';


const routes: Routes = [
  { path: 'partner-admin', component: PartnerClubAdministratorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
