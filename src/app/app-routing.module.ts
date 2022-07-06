import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    canActivate: [AuthGuard],
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    canActivate: [AuthGuard],
    path: 'decks',
    loadChildren: () =>
      import('./decks/decks.module').then((m) => m.DecksModule),
  },
  {
    canActivate: [AuthGuard],
    path: 'practices',
    loadChildren: () =>
      import('./practices/practices.module').then((m) => m.PracticesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
