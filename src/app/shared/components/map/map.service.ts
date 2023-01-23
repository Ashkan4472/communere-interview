import {
  Injectable,
  Injector,
  SimpleChanges,
} from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
import { Location } from 'src/app/models/location.model';
import { MapDetailComponent } from './map-detail/map-detail.component';
import * as L from "leaflet";

@Injectable()
export class MapService {
  map?: L.Map;
  detailEl?: NgElement & WithProperties<MapDetailComponent>;

  constructor(private injector: Injector) {
    // Register custom element for popup element
    const DetailElement = createCustomElement(MapDetailComponent, { injector: this.injector });
    customElements.define('map-detail-popup', DetailElement);
  }

  setMap(newMap: L.Map) {
    this.map = newMap;
  }

  addMarker(location: Location, addPopup = true) {
    if (addPopup) {
      location.marker.bindPopup((_l) => this.createDetailPopup(location))
    }
    location.marker.addTo(this.map!)
  }

  removeMarker(marker: L.Marker) {
    marker.remove();
  }

  detectMarkerChanges(changes: SimpleChanges, disableMarkerOnClick: boolean) {
    const currentLocations = changes['locations'].currentValue as Location[]
    const previousLocations = changes['locations'].previousValue as Location[]

    const removedMarkers = previousLocations?.filter(x => !currentLocations.includes(x)) ?? [];
    const newMarkers = currentLocations?.filter(x => !previousLocations.includes(x)) ?? [];

    for (const m of newMarkers) {
      this.addMarker(m, disableMarkerOnClick);
    }

    for (const m of removedMarkers) {
      this.removeMarker(m.marker);
    }
  }

  createDetailPopup(data: Location): HTMLElement {
    this.detailEl = document.createElement('map-detail-popup') as any;
    this.detailEl!.title = "Location Details";
    this.detailEl!.location = data;
    document.body.appendChild(this.detailEl!);
    return this.detailEl as HTMLElement;
  }

  closeDetailPopup() {
    this.map?.closePopup();
  }
}
