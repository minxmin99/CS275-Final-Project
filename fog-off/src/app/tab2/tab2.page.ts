import { Component, ViewChild } from '@angular/core';
import { mapStyle } from './mapStyle';
import { mapStyleDay } from './mapStyleDay';

import { 
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng,
  MarkerOptions,
  Marker,
  CameraPosition
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, Platform } from '@ionic/angular'
import { element } from 'protractor';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  map:GoogleMap;
  

  constructor(
    public googleMaps: GoogleMaps, 
    private geolocation: Geolocation,
    public plt: Platform,
    public nav: NavController) {}

  

  ngAfterViewInit() {

    let loc: LatLng;

    this.plt.ready().then(() => {

      this.initMap();

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        
        console.log("Google Map running")
        this.getLocation().then( res => {
          loc = new LatLng(res.coords.latitude, res.coords.longitude);
          this.moveCamera(loc)

          this.createMarker(loc, loc.toString()).then((marker: Marker) => {
            marker.showInfoWindow();
          }).catch(err => {
            console.log("Marker" + err)
          })
        }).catch( err => {
          console.log("getLocation" + err)
        })

      })
    })
  }

  isNight(){
    //Returns true if the time is between
    //7pm to 5am
    let time = new Date().getHours();
    return (time > 5 && time < 19) ? false : true;
  }

  initMap() {

    let style = [];

    if (this.isNight()) {
      style = mapStyle;
    } else {
      style = mapStyleDay;
    }

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 33.6396965,
          lng: -84.4304574,
        },
        zoom: 18,
        tilt: 30
      },
      styles: style
    };
    this.map = this.googleMaps.create('map', mapOptions);
    
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                  
              });
          });

      });
  }

  getLocation() {

    // TODO: Use geolocation.watchPosition() for constant update
    return this.geolocation.getCurrentPosition();
  }

  moveCamera(loc: LatLng) {

    let options: CameraPosition<LatLng> = {
      target: loc,
      zoom: 18,
      tilt: 10
    }
    this.map.moveCamera(options)
  }

  createMarker(loc: LatLng, title: string) {

    let MarkerOptions: MarkerOptions = {
      position: loc,
      title: title
    };

    return this.map.addMarker(MarkerOptions);
  }
}
