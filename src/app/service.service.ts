import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  imageurl:string='/assets/profile-pic.jpg';

  showDailog= false;
  router: any;

  constructor(private http:HttpClient) { }

  onSelectFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.imageurl=event.target.result;
      }
    }

  }
  onCancel() {
    this.router.navigate(['/']);
  }
}
