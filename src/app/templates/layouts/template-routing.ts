import { Routes } from '@angular/router';
import {  MainComponent } from './main/main.component';
import { MAIN_LAYOUT_ROUTES } from '../../routers/main-layout-routes';

export const TEMPLATE_ROUTES: Routes = [
  {
    path: '',
    component: MainComponent,
    children: MAIN_LAYOUT_ROUTES,
  }
];

