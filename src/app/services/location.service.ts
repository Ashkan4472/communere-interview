import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LOC_IDS, LOC_ID_PREFIX } from "../constants/keys/localstorage.keys";
import { Location } from "../models/location.model";

@Injectable({ providedIn: 'root' })
export class LocationService {
  private locationSubject: BehaviorSubject<Location[]>;
  locations$: Observable<Location[]>;

  constructor() {
    const locations = this.getLocationsFromLocalStorage()
    this.locationSubject = new BehaviorSubject(locations);
    this.locations$ = this.locationSubject.asObservable();
  }

  addLocation(newLocation: Location) {
    const newLocations = [...this.locationSubject.value, newLocation];
    this.locationSubject.next(newLocations)
    this.addLocationToLocalStorage(newLocation);
  }

  updateLocation(location: Location) {
    this.updateLocationInSubject(location);
    this.updateLocationInLocalStorage(location);
  }

  removeLocation(id: string) {
    // Although remove is not asked in interview but
    // it is a good habit to make services as complete as you can.
    this.removeLocationInSubject(id);
    this.removeLocationInLocalStorage(id);
  }


  private getLocationsFromLocalStorage(): Location[] {
    const locIdsStr = localStorage.getItem(LOC_IDS);
    if (!locIdsStr) {
      return [];
    }

    let locIds: string[];
    // Check if can parse saved location ids
    try {
      locIds = JSON.parse(locIdsStr);
    } catch (error) {
      console.error(error);
      return [];
    }


    const locations: Location[] = [];
    for (const locId of locIds) {
      // ignore any location that cannot be parsed
      try {
        const locStr = localStorage.getItem(`${LOC_ID_PREFIX}${locId}`)
        if (locStr) {
          locations.push(JSON.parse(locStr))
        }
      } catch (error) {
        console.error(error);
      }
    }

    return locations;
  }

  private addLocationToLocalStorage(newLocation: Location) {
    const locIdsStr = localStorage.getItem(LOC_IDS) || "[]";

    let locIds: string[];
    // Check if can parse saved location ids
    try {
      locIds = JSON.parse(locIdsStr);
    } catch (error) {
      console.error(error);
      locIds = [];
    }
    locIds.push(newLocation.id);

    const locStr = JSON.stringify(newLocation);
    localStorage.setItem(`${LOC_ID_PREFIX}${newLocation.id}`, locStr);
  }

  private updateLocationInSubject(newLocation: Location) {
    const locations = this.locationSubject.value;
    const index = locations.findIndex((x) => x.id === newLocation.id)
    if (index === -1) {
      // No location found with that id so create it
      this.addLocation(newLocation);
    }
    locations[index] = newLocation
    this.locationSubject.next(locations);
  }

  private updateLocationInLocalStorage(newLocation: Location) {
    const itemKey = `${LOC_ID_PREFIX}${newLocation.id}`;

    const locsStr = localStorage.getItem(itemKey);
    if (!locsStr) {
      // No location found with that id so create it
      this.addLocationToLocalStorage(newLocation);
      return;
    }

    localStorage.setItem(itemKey, JSON.stringify(newLocation))

  }

  private removeLocationInSubject(id: string) {
    const locations = this.locationSubject.value;
    const index = locations.findIndex((x) => x.id === id);
    if (index !== -1) {
      locations.splice(index)
      this.locationSubject.next(locations);
    }
  }

  private removeLocationInLocalStorage(id: string) {
    const locIdsStr = localStorage.getItem(LOC_IDS);

    if (!locIdsStr) {
      return;
    }

    let locIds: string[];
    // Check if can parse saved location ids
    try {
      locIds = JSON.parse(locIdsStr);
    } catch (error) {
      console.error(error);
      return;
    }
    const index = locIds.findIndex((x) => x === id)
    if (index !== -1) {
      locIds = locIds.splice(index)
      localStorage.setItem(LOC_IDS, JSON.stringify(locIds))
    }
    localStorage.removeItem(`${LOC_ID_PREFIX}${id}`);
  }

}
