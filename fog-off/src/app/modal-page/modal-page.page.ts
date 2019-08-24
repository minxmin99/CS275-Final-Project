import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  
  newAva: string = "New Ava";
  constructor(private nav:NavController, private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  dismissAvaModal() {
    this.modalCtrl.dismiss(this.newAva);
  }

}
