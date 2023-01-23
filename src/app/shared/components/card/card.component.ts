import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent {
  @Input() title: string = "title";
  @Input() titleSize: "large" | "small" | "default" = "default";
  @Input() titleWeight: "bold" | "regular" = "bold";
  @Input() titlePosition: "center" | "left" = "left";
  @Input() type: "primary" | "success" | "dark-blue" = "primary"
}
