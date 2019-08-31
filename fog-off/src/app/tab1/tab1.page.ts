import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { async } from 'q';
import { OverlayEventDetail } from '@ionic/core';
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
    
  imageSrc = "assets/adventurers/Blue_Adv.png";

  testoutput: string = "yessir";
  async openAvaModal() {
    const avaModal = await this.modalCtr.create({
      component: ModalPagePage,
      componentProps: {
        red_adv: "assets/adventurers/Red_Adv.png",
        purple_adv: "assets/adventurers/Purple_Adv.png",
        blue_adv: "assets/adventurers/Blue_Adv.png",
        green_adv: "assets/adventurers/Green_Adv.png",
      }

    });
    
    avaModal.onDidDismiss().then((detail: OverlayEventDetail) => {
      // Get new characters
      if ((detail.data).includes("assets/adventurers/")){
        this.imageSrc = detail.data;
      } else { //prevents any changes when pressing back button
        this.imageSrc = this.imageSrc;
      }
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
