import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  constructor(private nav:NavController, private modal:ModalController) { }

  ngOnInit() {
  }

  // TODO: Assign closemodal() on HTML side
  closeModal() {
    this.modal.dismiss();
  }

}
