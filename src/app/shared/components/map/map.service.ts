import {
  Injectable,
  Injector,
} from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
import { Map } from "leaflet";
import { Location } from 'src/app/models/location.model';
import { MapDetailComponent } from './map-detail/map-detail.component';

@Injectable()
export class MapService {
  map?: Map;
  detailEl?: NgElement & WithProperties<MapDetailComponent>;

  constructor(private injector: Injector) {
    // Register custom element for popup element
    const DetailElement = createCustomElement(MapDetailComponent, { injector: this.injector });
    customElements.define('map-detail-popup', DetailElement);
  }

  setMap(newMap: Map) {
    this.map = newMap;
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
