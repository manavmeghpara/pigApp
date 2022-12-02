
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
  private map: any;
  constructor(private ls: LocationService) { 
    this.lsArr = []
  }

  ngOnInit(): void {
    this.lsArr = this.ls.get()

    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW1lZ2hwYXIiLCJhIjoiY2xiNHFsbXRsMGIwcDNybDB6bmdvbzV5MiJ9.zzkFKeW0pPIQJVlwCux_rQ', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    for (let i=0; i<this.lsArr.length; i++){
      L.marker([this.lsArr[i].longitude, this.lsArr[i].latitide]).addTo(this.map)
      .bindPopup("<b>"+this.lsArr[i].lname+"</b><br />cases reported.").openPopup();
    }
 

    L.marker([49.1867, -122.8490]).addTo(this.map)
    .bindPopup("<b>SFU Surrey</b><br />cases reported.").openPopup();
  }

  ngAfterViewInit(): void { 


  }

}
