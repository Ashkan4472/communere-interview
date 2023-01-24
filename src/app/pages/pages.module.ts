import { NgModule } from "@angular/core";
import { HomePageModule } from "./home/home-page.module";
import { SharePageModule } from "./share/share-page.module";

@NgModule({
  imports: [
    SharePageModule,
    HomePageModule,
  ],
})
export class PagesModule { }
