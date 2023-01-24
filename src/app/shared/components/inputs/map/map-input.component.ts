import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MapComponent } from "../../map/map.component";
import { BaseInputComponent } from "../base-input.component";
import * as L from "leaflet";
import { Location } from "src/app/models/location.model";

@Component({
  imports: [
    CommonModule,
    FormsModule,
    BaseInputComponent,
    MapComponent,
  ],
  standalone: true,
  selector: "app-map-input",
  templateUrl: "./map-input.component.html",
  styleUrls: ["./map-input.component.scss"],
})
export class MapInputComponent implements OnInit {
  @Input() value?: L.LatLngTuple;
  @Output() valueChange = new EventEmitter<L.LatLngTuple>()

  @Input() title: string = "Location on Map: "
  @Input() id!: string;

  mockLocation?: Location;

  ngOnInit(): void {
    this.mockLocation = new Location(this.value)
  }

  onValueChange(event: L.LatLng) {
    this.value = [event.lat, event.lng];
    this.valueChange.emit(this.value);
    this.mockLocation = new Location(this.value);
  }
}
