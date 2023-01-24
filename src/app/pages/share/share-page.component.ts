import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LocationType } from "src/app/models/location-type.enum";
import { Location } from "src/app/models/location.model";
import { LocationService } from "src/app/services/location.service";

@Component({
  templateUrl: "./share-page.component.html",
  styleUrls: ["./share-page.component.scss"]
})
export class SharePageComponent implements OnInit {
  location = new Location();
  dropDownOptions = Object.values(LocationType).filter(value => typeof value === 'string');

  constructor(
    private readonly locationService: LocationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        const location = this.locationService.fetchLocation(params['id'])
        if (location) {
          this.location = location;
        }
      }
    })
  }

  updateLocType(value: string) {
    this.location.locType = value as LocationType;
  }

  submit() {
    this.locationService.updateOrCreateLocation(this.location);
    this.navigateHome()
  }

  navigateHome() {
    this.router.navigate(["/home"])
  }
}
