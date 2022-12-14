import { Injectable} from '@angular/core';
import { Location } from './pig';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  location: Location[]
  mapService : any;
  constructor(private http: HttpClient) {
    this.location = [] 
    this.http.get('https://272.selfip.net/apps/ei7OgQTW2K/collections/location/documents/loclist/')
    .subscribe((data:any)=>{
      if(data.data !=""){
        this.location = data.data

        console.log(data)
        
      }
    })

  }

  countLoc(locName: string) : number{
    let count = 0
    for (const loc of this.location){
      if (loc.lname == locName)
        count++;
    }
    return count
  }

  get(){ 
    return this.http.get('https://272.selfip.net/apps/ei7OgQTW2K/collections/location/documents/loclist/')
  }

  addLoc(loc: Location){
    this.location.push(loc)
    L.marker([loc.longitude, loc.latitide]).addTo(this.mapService)
    .bindPopup("<b>"+loc.lname+"</b><br />cases reported.").openPopup();

    this.http.put<Location>('https://272.selfip.net/apps/ei7OgQTW2K/collections/location/documents/loclist/',
    {"key":"loclist", "data":this.location}
    ).subscribe((data:Location)=>{
    })
  }

  delLoc(loc: Location){
    let seenLoc = false;
    this.location = this.location.filter((a) => {
        if (seenLoc) {
            return true;
        }
        seenLoc = a.lname == loc.lname;
        return !seenLoc;
    });

    console.log(this.location)
    this.http.put<Location>('https://272.selfip.net/apps/ei7OgQTW2K/collections/location/documents/loclist/',
    {"key":"loclist", "data":this.location}
    ).subscribe((data:Location)=>{
    })
  }

}
