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
    const oldElement = customElements.get('map-detail-popup');
    if (!oldElement) {
      const DetailElement = createCustomElement(MapDetailComponent, { injector: this.injector });
      customElements.define('map-detail-popup', DetailElement);
    }
  }

  setMap(newMap: L.Map) {
    this.map = newMap;
  }

  addMarker(location: Location, addPopup = true) {
    if (addPopup) {
      location.marker?.bindPopup((_l) => this.createDetailPopup(location))
    }
    location.marker?.addTo(this.map!)
  }

  removeMarker(marker?: L.Marker) {
    marker?.remove();
  }

  detectMarkerChanges(changes: SimpleChanges, disableMarkerOnClick: boolean) {
    if (changes['locations'].isFirstChange()) {
      return;
    }
    const currentLocations = changes['locations'].currentValue as Location[]
    const previousLocations = changes['locations'].previousValue as (Location[] | undefined);

    const removedLocations = previousLocations?.filter(x => !currentLocations.includes(x)) ?? [];
    const newLocations = currentLocations?.filter(x => !previousLocations?.includes(x)) ?? [];

    for (const l of newLocations) {
      this.addMarker(l, disableMarkerOnClick);
    }

    for (const l of removedLocations) {
      this.removeMarker(l.marker);
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
