import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  //Character Paths
  red_adv = "assets/adventurers/Red_Adv.png";
  purple_adv = "assets/adventurers/Purple_Adv.png";
  blue_adv = "assets/adventurers/Blue_Adv.png";
  green_adv = "assets/adventurers/Green_Adv.png";

  
  newAva: string = "1";
  constructor(private nav:NavController, private modalCtrl:ModalController) { }

  ngOnInit() {
    
  }

  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this.newAva = idAttr.nodeValue;
    console.log("Character select ID " + this.newAva)

    this.dismissAvaModal();
  }

  dismissAvaModal() {
    this.modalCtrl.dismiss();
  }

  //Sends back the char path, and returns to the main page to update changes
  dismissRed() {
    this.modalCtrl.dismiss(this.red_adv);
  }

  dismissPurple() {
    this.modalCtrl.dismiss(this.purple_adv);
  }

  dismissBlue() {
    this.modalCtrl.dismiss(this.blue_adv);
  }

  dismissGreen() {
    this.modalCtrl.dismiss(this.green_adv);
  }

  backClick() {
    this.modalCtrl.dismiss(null);
  }

}
