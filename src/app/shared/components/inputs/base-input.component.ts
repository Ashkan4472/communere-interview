import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: "app-base-input",
  templateUrl: "./base-input.component.html",
  styleUrls: ["./base-input.component.scss"]
})
export class BaseInputComponent {
  @Input() title: string = "Title"
  @Input() id!: string;
}
