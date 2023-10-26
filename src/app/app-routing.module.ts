import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageMapComponent } from './pages/page-map/page-map.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageAccountComponent } from './pages/page-account/page-account.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ParkingComponent } from './components/parking/parking.component';
import { OpinionComponent } from './components/opinion/opinion.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageHomeComponent },
  { path: 'map', component: PageMapComponent },
  { path: 'map/parking/:id', component: ParkingComponent },
  { path: 'map/parking/:id/opinion', component: OpinionComponent },
  { path: 'account', component: PageAccountComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
