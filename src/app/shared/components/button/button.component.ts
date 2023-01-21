import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: "app-button",
  styleUrls: ["./button.component.scss"],
  templateUrl: "./button.component.html",
})
export class ButtonComponent {
  @Input() title: string = "Button";
  @Input() type: "primary" | "secondary" = "primary"
  @Output() click: EventEmitter<void> = new EventEmitter()

  onClick() {
    return this.click.emit();
  }
}
