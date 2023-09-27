import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/components/default-layout/default-layout.component';
import { NotFoundComponent } from './layout/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
