import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({selector: 'app-tab3',
templateUrl: 'tab3.page.html',
styleUrls: ['tab3.page.scss']
})
export class NewsFeedPage {
  items = [];

  constructor() {
    for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
 
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html'
})
export class Tab3Page {
  galleryType = 'regular';
  constructor(public navCtrl: NavController) { }
}