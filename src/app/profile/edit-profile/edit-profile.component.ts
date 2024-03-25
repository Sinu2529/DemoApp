import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  imageurl:string='/assets/profile-pic.jpg';

  user: any;
  userForm: any;
  constructor(private http:HttpClient){

  }
  onEdit(name:string){
    this.http.get("http://localhost:3000/register"+name).subscribe((res:any)=>{
      this.userForm = new FormGroup({
        first:new FormControl(res.name),
        last:new FormControl(res.last),
        email:new FormControl(res.email),
        number:new FormControl(res.number),
        age:new FormControl(res.age),
        state:new FormControl(res.state),
        country:new FormControl(res.country),
        address:new FormControl(res.adress),
        tag:new FormControl(res.tag),
      })
    
    })
  }

}
