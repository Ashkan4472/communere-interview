import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { SharePageComponent } from './pages/share/share-page.component';

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "share",
    component: SharePageComponent,
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
