import { Routes } from '@angular/router';

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('../views/home/home-routing.module')
    .then(m => m.HomeRoutingModule)
  }
]