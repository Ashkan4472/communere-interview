import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "src/app/models/location.model";
import { ButtonComponent } from "../../button/button.component";
import { CardComponent } from "../../card/card.component";
import { MapService } from "../map.service";

@Component({
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
  ],
  standalone: true,
  templateUrl: "./map-detail.component.html",
  styleUrls: ["./map-detail.component.scss"],
})
export class MapDetailComponent {
  @Input() title: string = "Location Details";
  @Input() location!: Location;

  constructor(
    private mapService: MapService,
    private router: Router,
  ) { }

  editLocation() {
    this.router.navigate(
      ['/share'],
      {
        queryParams: {
          id: this.location.id
        }
      },
    );
  }

  closePopup() {
    this.mapService.closeDetailPopup();
  }
}
