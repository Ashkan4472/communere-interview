import { LocationType } from "./location-type.enum";
import { v4 as uuid4 } from "uuid";
import * as L from "leaflet";

export class Location {
  private _id!: string;
  marker: L.Marker;

  constructor(
    public latLng: L.LatLngTuple = [0, 0],
    public locType: LocationType = LocationType.BUSINESS,
    public name: string = "",
    public logo: string = "",
  ) {
    this._id = uuid4()
    this.marker = L.marker(latLng, { interactive: true });
  }

  get id() {
    return this._id;
  }

  toJsonString(): string {
    return JSON.stringify({
      latLng: this.latLng,
      locType: this.locType,
      name: this.name,
      logo: this.logo,
    });
  }

  static fromJsonString(value: string): Location {
    try {
      const { id, latLng, locType, name, logo } = JSON.parse(value)
      const newLocation = new Location(latLng, locType, name, logo);
      newLocation._id = id;
      return newLocation;
    } catch (error) {
      console.log("Error from making Location object.", error);
      throw error;
    }
  }
}
