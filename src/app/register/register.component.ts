import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  imageurl:string='/assets/profile-pic.jpg';

  userForm: FormGroup = new FormGroup({
    first:new FormControl(''),
    last:new FormControl(''),
    email:new FormControl(''),
    number:new FormControl(''),
    age:new FormControl(''),
    state:new FormControl(''),
    country:new FormControl(''),
    address:new FormControl(''),
    tag:new FormControl(''),
  })

  constructor(private http:HttpClient, public ss:ServiceService){

  }
  onSaveUser(){
    debugger;
    console.log(this.userForm.value)
    const obj =this.userForm.value;
    this.http.post('http://localhost:3000/register',obj).subscribe((result:any)=>{
      alert("usercreated")
    })
    }
  }




