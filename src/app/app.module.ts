import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './components/footer-navbar/footer/footer.component';
import { NavbarDesktopComponent } from './components/footer-navbar/navbar-desktop/navbar-desktop.component';
import { NavbarPhoneComponent } from './components/footer-navbar/navbar-phone/navbar-phone.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageMapComponent } from './pages/page-map/page-map.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageAccountComponent } from './pages/page-account/page-account.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MapComponent } from './components/map/map.component';
import { ParkingComponent } from './components/parking/parking.component';
import { ParkingModalComponent } from './components/modals/parking-modal/parking-modal.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { UppercaseFirstPipe } from './pipes/uppercase-first.pipe';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RatingBarComponent } from './components/rating-bar/rating-bar.component';
import { OpinionModalComponent } from './components/modals/opinion-modal/opinion-modal.component';
import { CreateOpinionModalComponent } from './components/modals/create-opinion-modal/create-opinion-modal.component';
import { CreateParkingModalComponent } from './components/modals/create-parking-modal/create-parking-modal.component';
import { UpdateParkingModalComponent } from './components/modals/update-parking-modal/update-parking-modal.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ParkingLikedCardComponent } from './components/parking-liked-card/parking-liked-card.component';
import { SubscriptionCardComponent } from './components/subscription-card/subscription-card.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarDesktopComponent,
    NavbarPhoneComponent,
    PageHomeComponent,
    PageMapComponent,
    PageNotFoundComponent,
    PageAccountComponent,
    SignupComponent,
    LoginComponent,
    MapComponent,
    ParkingComponent,
    ParkingModalComponent,
    ServicesListComponent,
    UppercaseFirstPipe,
    SearchBarComponent,
    RatingBarComponent,
    OpinionModalComponent,
    CreateOpinionModalComponent,
    CreateParkingModalComponent,
    UpdateParkingModalComponent,
    UserProfileComponent,
    ParkingLikedCardComponent,
    SubscriptionCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
  ],
  exports: [UppercaseFirstPipe],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
