import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { tileLayer, latLng, MapOptions, Map, LeafletMouseEvent, LatLng } from "leaflet";
import { Location } from "src/app/models/location.model";
import { CardComponent } from "../card/card.component";
import { BaseInputComponent } from "../inputs/base-input.component";
import { MapService } from "./map.service";

@Component({
  imports: [
    CommonModule,
    LeafletModule,
    BaseInputComponent,
    CardComponent,
  ],
  standalone: true,
  selector: "app-map",
  providers: [MapService],
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit, OnChanges {
  @Input() locations: Location[] = [];
  @Input() disableMarkerOnClick: boolean = true;
  @Input() useAspectRatio: boolean = false;
  @Output() mapClicked = new EventEmitter<LatLng>();

  options!: MapOptions;
  preservedLocation?: Location

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.options = {
      layers: [
        tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 },
        ),
      ],
      zoom: this.disableMarkerOnClick ? 9 : 3,
      center: this.locations.length > 0 ? this.locations[0].latLng : latLng(46.879966, -121.726909),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mapService.detectMarkerChanges(changes, this.disableMarkerOnClick)
  }

  onMapClicked(event: LeafletMouseEvent) {
    if (!this.disableMarkerOnClick) {
      this.mapClicked!.emit(event.latlng)
    }
  }

  onMapReady(readyMap: Map) {
    this.mapService.setMap(readyMap);

    // Set Markers
    for (const location of this.locations) {
      this.mapService.addMarker(location)
    }
  }
}
