import { Component } from '@angular/core';
import { IonButton, IonSelect, IonList, IonSelectOption, IonLabel, IonItem, IonProgressBar, IonInput, IonCol, IonRow, IonCard, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import the CommonModule

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonList,CommonModule, IonSelect, IonSelectOption, IonLabel, IonItem, IonProgressBar, IonButton, FormsModule, IonInput, IonCol, IonRow, IonCard, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {
  url: string = '';
  format: string = '';
  public buffer = 0.06;
  public progress = 0;

  constructor() {}

  async download() {
    if (!this.url) {
      console.error('Video URL is required');
      return;
    }

    try {
      const response = await axios.post('https://functionestudo.azurewebsites.net', null, {
        params: { videoUrl: this.url, format: this.format },
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total) / 100;
          }
        }
      });

      const fileName = this.format === 'audio' ? 'audio.mp3' : 'video.mp4';
      saveAs(response.data, fileName);
      console.log("Download complete");
    } catch (error) {
      console.error('Error downloading video', error);
    }
  }
}
