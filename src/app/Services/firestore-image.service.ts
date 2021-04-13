import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreImageService {
  title = 'cloudsSorage';
  // selectedFile?: File;
  fb: any;
  downloadURL: Observable<string> | undefined;
  myImageName?: string;
  pathImageFirestore?: string;

  constructor(
    private storage: AngularFireStorage,
  ) { }

  public uploadImage(event: any): string{
    const n = Date.now();
    this.myImageName = String(n);
    const file = event.target.files[0];
    const filePath = `${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            return this.myImageName;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
        return this.myImageName;
      });
    return this.myImageName;
  }

  public getImage(refImage: string): Observable<any> {
    const filePath = `${refImage}`;
    const fileRef = this.storage.ref(filePath);
    console.log(fileRef);
    return fileRef.getDownloadURL();
  }

  public deleteImage(refImage?: string): void {
    const filePath = `${refImage}`;
    const fileRef = this.storage.ref(filePath);
    fileRef.delete();
  }
}
