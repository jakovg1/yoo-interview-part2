import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DetailsComponent } from './details/details.component';
import { DETAILS_TITLE, MAIN_TITLE } from './constants';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent, title: MAIN_TITLE },
  { path: 'details/:id', component: DetailsComponent, title: DETAILS_TITLE },
];
