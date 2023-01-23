import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CardComponent } from "../../card/card.component";
import { BaseInputComponent } from "../base-input.component";

@Component({
  imports: [
    CommonModule,
    BaseInputComponent,
    CardComponent,
  ],
  standalone: true,
  selector: "app-file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.scss"],
})
export class FileInputComponent {
  @Input() id!: string;
  @Input() title: string = "Logo:";
  @Input() uploadActive: boolean = true;

  @Input() value: string | undefined = undefined;
  @Output() valueChange = new EventEmitter<string>();

  handleUpload(event: any) {
    const file = event.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.value = reader.result?.toString();
      this.valueChange.emit(this.value);
    };
  }
}
