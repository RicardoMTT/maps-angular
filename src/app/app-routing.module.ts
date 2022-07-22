import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfinitiveScrollDominicodeComponent } from './components/infinitive-scroll-dominicode/infinitive-scroll-dominicode.component';
import { MapComponent } from './components/map/map.component';
import { SanitizerComponent } from './components/sanitizer/sanitizer.component';

const routes: Routes = [
  {
    path: '',
    component: InfinitiveScrollDominicodeComponent,
  },
  {
    path: 'sanitize',
    component: SanitizerComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
