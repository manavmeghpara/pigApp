import { Injectable } from '@angular/core';
import { Location } from './pig';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  location: Location[]
  constructor() {
    this.location = [
      {lname: "Metrotown",
        longitude : 49.2276,
        latitide : -123.0076
      },
      {lname: "Surrey",
      longitude : 49.1867,
      latitide : -122.8490
    },
    {lname: "SFU",
    longitude : 49.2793,
    latitide : -122.9200
  }
    ]
  }

  get(){ return this.location}

  addLoc(loc: Location){
    this.location.push(loc)
  }

}
