import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MapCustomService } from 'src/app/map-custom.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;
  modeInput = 'start';

  wayPoints: WayPoints = {
    start: null,
    end: null,
  };
  constructor(
    private mapCustomService: MapCustomService,
    private renderer2: Renderer2
  ) {}
  ngOnInit(): void {
    this.mapCustomService.buildMap().then(({ geocoder, map }) => {
      console.log('data');
      this.renderer2.appendChild(
        this.asGeoCoder.nativeElement,
        geocoder.onAdd(map)
      );
    });
    this.mapCustomService.cbAddress.subscribe((getPoint) => {
      console.log('getPoint', getPoint);
      if (this.modeInput === 'start') {
        this.wayPoints.start = getPoint;
      }

      if (this.modeInput === 'end') {
        this.wayPoints.end = getPoint;
      }
    });
  }

  drawRoute() {
    const coords = [this.wayPoints.start.center, this.wayPoints.end.center];
    this.mapCustomService.loadCoords(coords);
  }

  changeMode(mode: string) {
    this.modeInput = mode;
  }

}

export class WayPoints {
  start: any;
  end: any;
}
