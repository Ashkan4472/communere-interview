import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { CardComponent } from "src/app/shared/components/card/card.component";
import { DropDownComponent } from "src/app/shared/components/inputs/dropdown/drop-down.component";
import { FileInputComponent } from "src/app/shared/components/inputs/file/file-input.component";
import { MapInputComponent } from "src/app/shared/components/inputs/map/map-input.component";
import { TextInputComponent } from "src/app/shared/components/inputs/text/text-input.component";
import { LayoutComponent } from "src/app/shared/components/layout/layout.component";
import { MapComponent } from "src/app/shared/components/map/map.component";
import { SharePageComponent } from "./share-page.component";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    CardComponent,
    LayoutComponent,
    TextInputComponent,
    MapInputComponent,
    MapComponent,
    DropDownComponent,
    FileInputComponent,
  ],
  declarations: [SharePageComponent],
  exports: [SharePageComponent],
})
export class SharePageModule { }
