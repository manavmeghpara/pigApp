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
        for (let i=0; i<this.location.length; i++){
          L.marker([this.location[i].longitude, this.location[i].latitide]).addTo(this.mapService)
          .bindPopup("<b>"+this.location[i].lname+"</b><br />cases reported = "+ this.countLoc(this.location[i].lname).toString()).openPopup();
        }
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

  get(){ return this.location}

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
    let idx = this.location.map(e => e.lname).indexOf(loc.lname)
    this.location = this.location.splice(idx, 1)
    console.log(this.location)
    this.http.put<Location>('https://272.selfip.net/apps/ei7OgQTW2K/collections/location/documents/loclist/',
    {"key":"loclist", "data":this.location}
    ).subscribe((data:Location)=>{
    })
  }

}
