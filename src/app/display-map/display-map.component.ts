
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from '../pig';
import * as L from 'leaflet';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-display-map',
  templateUrl: './display-map.component.html',
  styleUrls: ['./display-map.component.css']
})
export class DisplayMapComponent implements AfterViewInit, OnInit {
  lsArr : Location[];
  constructor(private ls: LocationService) { 
    this.lsArr = []
  }

  ngOnInit(): void {
    this.ls.get().subscribe((data:any)=>{
      if(data.data !=""){
        this.lsArr = data.data
        for (let i=0; i<this.lsArr.length; i++){
            L.marker([this.lsArr[i].longitude, this.lsArr[i].latitide]).addTo(this.ls.mapService)
            .bindPopup("<b>"+this.lsArr[i].lname+"</b><br />cases reported = "+ this.ls.countLoc(this.lsArr[i].lname).toString()).openPopup();
        }
      }
    });
     
  }

  ngAfterViewInit(): void { 
    this.ls.mapService = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW1lZ2hwYXIiLCJhIjoiY2xiNHFsbXRsMGIwcDNybDB6bmdvbzV5MiJ9.zzkFKeW0pPIQJVlwCux_rQ', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.ls.mapService);


  }

}
