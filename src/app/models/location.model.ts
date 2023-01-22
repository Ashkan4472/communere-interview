import { LatLngTuple } from "leaflet";
import { LocationType } from "./location-type.enum";
import { v4 as uuid4 } from "uuid";

export class Location {
  readonly id!: string;

  constructor(
    public latLng: LatLngTuple,
    public locType: LocationType,
    public name?: string,
    public logo?: string,
  ) {
    this.id = uuid4()
  }
}
