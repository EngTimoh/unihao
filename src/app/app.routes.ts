import { Routes } from '@angular/router';
import { ListingsComponent } from './app-pages/listings/listings.component';
import { HomeComponent } from './app-pages/home/home.component';
import { AboutComponent } from './app-pages/about/about/about.component';
import { HowItWorksComponent } from './app-pages/how-it-works/how-it-works/how-it-works.component';
import { LoginComponent } from './app-pages/login/login.component';
import { SignupComponent } from './app-pages/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'listings/:id', loadComponent: () => import('./app-pages/listing-details/listing-details.component').then(m => m.ListingDetailsComponent) },
  { path: 'about', component: AboutComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', loadComponent: () => import('./app-pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'settings', loadComponent: () => import('./app-pages/settings/settings.component').then(m => m.SettingsComponent) },
  { path: '**', redirectTo: '' } // wildcard fallback
];
