import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Location } from "src/app/models/location.model";
import { LocationService } from "src/app/services/location.service";

@Component({
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit, OnDestroy {
  locations: Location[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private readonly locationService: LocationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.locationService.locations$.subscribe((locations) => {
        this.locations = locations;
      })
    )
  }

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  navigateShare() {
    this.router.navigate(['/share']);
  }
}
