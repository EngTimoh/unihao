import { Routes } from '@angular/router';
import { ListingsComponent } from './app-pages/listings/listings.component';
import { HomeComponent } from './app-pages/home/home.component';
import { AboutComponent } from './app-pages/about/about/about.component';
import { HowItWorksComponent } from './app-pages/how-it-works/how-it-works/how-it-works.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'about', component: AboutComponent},
  { path: 'how-it-works', component: HowItWorksComponent},
  { path: '**', redirectTo: '' } // wildcard fallback
];
