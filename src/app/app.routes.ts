import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DigimonList } from './pages/digimon-list/digimon-list';
import { DigimonDetail } from './pages/digimon-detail/digimon-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'digimon', component: DigimonList },
  { path: 'digimon/:id', component: DigimonDetail },
  { path: '**', redirectTo: 'home' },
];