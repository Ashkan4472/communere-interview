import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { LayoutComponent } from "src/app/shared/components/layout/layout.component";
import { MapComponent } from "src/app/shared/components/map/map.component";
import { HomePageComponent } from "./home-page.component";

@NgModule({
  imports: [
    CommonModule,
    LayoutComponent,
    MapComponent,
    ButtonComponent,
  ],
  declarations: [HomePageComponent],
  exports: [],
})
export class HomePageModule { }
