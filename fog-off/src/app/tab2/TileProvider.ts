import { LatLng } from '@ionic-native/google-maps';

export class TileProvider {

  tileMap = new Map();
  tileCoord: Array<number>;
  visited = new Array<LatLng>();
  currentLoc = new LatLng(0, 0);

  constructor() {

  }

  tileProvider(x_: number, y_:number, zoom_: number) {

    var URL: string = "https://api.maptiler.com/maps/darkmatter/256/" + zoom_ +  "/" + x_ + "/" + y_ + ".png?key=eekFiCeDrAQ6v31lORdC"
    
    let x = x_.toString();
    let y = y_.toString();
    let zoom = zoom_.toString();

    let hash = x + y + zoom;

    // Check if requested TileCoord is already requested and created before
    if (this.tileMap.has(hash)) {

      console.log("[TileProvider] " + this.tileMap.get(hash) + this.getTileCoord(this.currentLoc, zoom_))

      return this.tileMap.get(hash)
    };

    console.log(this.tileMap.entries());
    // Check if new TileCoord requested is same as current location TileCoord
    console.log("[TileProvider] get new Tile " + x + " " + y + " " + zoom + " " + this.checkNewTileCoord(x_, y_, zoom_))

    this.tileMap.set(hash, this.checkNewTileCoord(x_, y_, zoom_));

    console.log("[TileProvider] " + this.tileMap.get(hash) + this.getTileCoord(this.currentLoc, zoom_))

    return this.tileMap.get(hash)
  }

  setExplored(loc: LatLng, zoom: number) {

    // Set current location to newly updated LatLng
    this.currentLoc = loc;

    console.log(this.visited.includes(loc), loc, this.visited)

    // Store traveled locations
    if (!this.visited.includes(loc)) {
      this.visited.push(loc)
    }

    // zoom should be 17 if zoom in mapOptions is 16
    zoom += 1;

    // Obtain tile coordinate from real lattitude and longitude
    // Plus one since tileProvider() above always seems to call API URL at zoom = zoom + 1 (for eg: console shows zoom_ = 16 but API calls show 17)
    let x = this.getTileCoord(loc, zoom)[0]
    let y = this.getTileCoord(loc, zoom)[1]

    let hash = x + y + zoom.toString();

    this.tileMap.set(hash, null);
    console.log("[SetExplored] Loc to TileCoord" + x + " " + y);
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
  
  getTileCoord(loc: LatLng, zoom: number) {

    // zoom should be 17 if zoom on mapOptions is 16
    let x = (this.project(loc)[0] * (2 ** (zoom)) / 256).toFixed();
    let y = (this.project(loc)[1] * (2 ** (zoom)) / 256).toFixed();

    return [x, y]

  }

  checkNewTileCoord(x: number, y: number, zoom: number) {

    var URL: string = "https://api.maptiler.com/maps/darkmatter/256/" + zoom +  "/" + x + "/" + y + ".png?key=eekFiCeDrAQ6v31lORdC"
    
    // Get current location TileCoord
    let currentLoc_x = this.getTileCoord(this.currentLoc, zoom - 1)[0]
    let currentLoc_y = this.getTileCoord(this.currentLoc, zoom - 1)[1]

    // Check if current location TileCoord is the same as newly reqeuested TileCoord
    if (currentLoc_x == x.toString() && currentLoc_y == y.toString()) {
      return null
    } else {
      return URL
    }
    
  }
}


  
