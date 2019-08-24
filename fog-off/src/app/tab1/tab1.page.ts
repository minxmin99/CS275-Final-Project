import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
// import { AlertPagePage } from '../alert-page/alert-page.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private modalCtr: ModalController, 
    private alert:AlertController
    ) {
      
    }

  async openAvaModal() {
    const avaModal = await this.modalCtr.create({
      component: ModalPagePage
    });

    avaModal.onDidDismiss().then((data) => {
      // Get new characters
    });

    return await avaModal.present();
  }

  username: string = "Player 1"; 

  async openAlert() {
    const nameAlert = await this.alert.create({
      header: "Edit Name", 
      inputs: [
        {
          name: "new_username",
          type: "text",
          placeholder: "Type new username"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "danger",
          handler: () => {
            console.log("Cancal ops");
          }
        }, {
          text: "OK",
          handler: (data) => {

            // TODO: Check new name legitimacy
            if (data.new_username == "") {
              console.log("Error: Empty name input")
            } else {
              console.log("New name")
              console.log(data.new_username)
              this.username = data.new_username;
            }
          }
        }
      ]
    });
    await nameAlert.present();
  }
}
