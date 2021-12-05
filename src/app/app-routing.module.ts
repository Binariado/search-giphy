import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TEMPLATE_ROUTES } from './templates/layouts/template-routing';
import { Page404Component } from './views/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    children: TEMPLATE_ROUTES
  },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
