import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BaseInputComponent } from "../base-input.component";

@Component({
  imports: [
    CommonModule,
    FormsModule,
    BaseInputComponent,
  ],
  standalone: true,
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"],
})
export class TextInputComponent {
  @Input() title: string = "Input"
  @Input() id!: string;
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  value: string = "";

  change() {
    this.onChange.emit(this.value);
  }
}
