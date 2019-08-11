import { Component, ViewChild } from '@angular/core';
import { mapStyle } from './mapStyle';
import { mapStyleDay } from './mapStyleDay';
import { TileProvider } from './TileProvider';
import { 
	GoogleMap,
	GoogleMaps,
	GoogleMapsEvent,
	GoogleMapOptions,
	LatLng,
	MarkerOptions,
	Marker,
	CameraPosition,
	TileOverlayOptions,
	TileOverlay,
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, Platform } from '@ionic/angular'

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

	map: GoogleMap;

	constructor(
		public googleMaps: GoogleMaps, 
		private geolocation: Geolocation,
		public plt: Platform,
		public nav: NavController) {}

	
	ngAfterViewInit() {

		let tileProvider = new TileProvider();
		var overlay: TileOverlay;
		let loc: LatLng = new LatLng(33.6396965, -84.4304574);
		
		this.plt.ready().then(() => {

			this.initMap();

			this.addMapFunctionality(this.map, overlay, loc, tileProvider);
			
		}).catch((err) => {
			console.log("Platform not initialized for other functions implementation")
		})
	}

	addMapFunctionality(map: GoogleMap, overlay: TileOverlay, loc: LatLng, tileProvider: TileProvider) {

		var currentOverlay: TileOverlay;

		// Init Google Maps
		map.one(GoogleMapsEvent.MAP_READY).then(() => {
				
			console.log("Google Map running")

			this.addOverlayOne(map, tileProvider).then((overlay:TileOverlay) => {
				currentOverlay = overlay;

			}).catch((err) => {
				console.log("[FirstAddOverlay] " + err);

			});

			// Get current location
			this.getLocation().subscribe( res => {

				// Get new location
				loc = new LatLng(res.coords.latitude, res.coords.longitude);
				this.moveCamera(loc);
				// marker.setPosition(loc);

				// Check new position
				tileProvider.setExplored(loc, map.getCameraZoom());

				currentOverlay =  this.updateOverlay(map, currentOverlay, tileProvider);

			}, (err) => {
				console.log("[GetLocation] " + err)
			});

		});	
	}

	project(latLng: LatLng) {

		let TILE_SIZE = 256

        var siny = Math.sin(latLng.lat * Math.PI / 180);

        // Truncating to 0.9999 effectively limits latitude to 89.189. This is
        // about a third of a tile past the edge of the world tile.
        siny = Math.min(Math.max(siny, -0.9999), 0.9999);

        return [
			TILE_SIZE * (0.5 + latLng.lng / 360),
			TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))];
	}

	// MAP FUNCTIONS
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
				zoom: 16,
				tilt: 30
			},
			styles: style,
			controls: {
				zoom: true,
				myLocationButton: true,
				myLocation: true,
				mapToolbar: true,
				indoorPicker: true,
				compass: true,
			},
			gestures: {
				zoom: false
			}
		};
		this.map = this.googleMaps.create('map', mapOptions);
		
	}

	getLocation() {

		return this.geolocation.watchPosition()
	}

	moveCamera(loc: LatLng) {

		let options: CameraPosition<LatLng> = {
			target: loc,
			zoom: 16,
			tilt: 10
		}
		this.map.moveCamera(options)
	}

	createMarker(loc: LatLng, title: string) {

		let MarkerOptions: MarkerOptions = {
			position: loc,
			title: title,
			animation: 'DROP'
		};

		var currentMarker = this.map.addMarker(MarkerOptions);

		return currentMarker;
	}

	// TILES OVERLAY FUNCTIONS

	addOverlayOne(map: GoogleMap ,tileProvider: TileProvider) {

		return map.addTileOverlay(this.getOverlayOptions(tileProvider));

	}

	updateOverlay(map: GoogleMap, currentOverlay: TileOverlay, tileProvider: TileProvider) {

		map.clear();

		var newOverlay : TileOverlay;

		console.log("[UpdateOverlay] Add new Layer");
		this.addOverlayOne(map, tileProvider).then((overlay: TileOverlay) => {
			newOverlay = overlay;
		}).catch((err) => {
			console.log("[UpdateOverlay] " + err)
		});

		return newOverlay;
	}

	getOverlayOptions(tileProvider: TileProvider) {

		let options: TileOverlayOptions = {

			getTile: (x: number, y: number, zoom: number) => {

				let returnStr = tileProvider.tileProvider(x, y, zoom);
				console.log("[ReturnStr] " + returnStr + " " + x + " " + y + " " + zoom);

				return returnStr

				// KEEP FOR FUTURE REFERENCE

				// 	return "https://api.maptiler.com/maps/darkmatter/256/" + zoom +  "/" + x + "/" + y + ".png?key=eekFiCeDrAQ6v31lORdC"
				// return "http://tile.openstreetmap.org/" + zoom + "/" + x + "/" + y + ".png";
				// return "https://www.haceonline.org/wp-content/uploads/2017/08/light-gray-solid-color-background.jpg"
			},
		  
			visible: true,
			zIndex: 0,
			tileSize: 256,
			opacity: 0.4,
		  
			debug: true
		};

		return options
	}
}
