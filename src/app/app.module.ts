import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentDetailsListComponent } from './payment-details-list/payment-details-list.component';
import { PaymentDetailService } from './shared/payment-detail.service';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './shared/user.service';
import { InsideComponent } from './inside/inside.component';
import { AuthInterceptor } from './auth/auth.intercepter';
import { NgImageSliderModule } from 'ng-image-slider';
// import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { SearchNumberPipe } from './SearchNumber.pipe';
import { DatePipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalcontentComponent } from './modalcontent/modalcontent.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
// MDB Angular Pro
import { ButtonsModule, IconsModule, WavesModule } from 'angular-bootstrap-md'



@NgModule({
  declarations: [
    AppComponent,
    PaymentDetailsComponent,
    PaymentDetailComponent,
    PaymentDetailsListComponent,
    PaymentComponent,
    HomeComponent,
    ContactComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    InsideComponent,
    ModalcontentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgImageSliderModule,
    CarouselModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // SearchNumberPipe
    ModalModule.forRoot(),
    NgbModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    ButtonsModule,
     IconsModule,
      WavesModule
    
  ],
  providers: [PaymentDetailService,UserService,DatePipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [ ModalcontentComponent ]
})
export class AppModule { }
