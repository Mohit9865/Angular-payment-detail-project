import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { InsideComponent } from './inside/inside.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'inside', component: InsideComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'contact', component: ContactComponent }
    ],canActivate : [AuthGuard]
  },

  { path: '', redirectTo: '/user/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
