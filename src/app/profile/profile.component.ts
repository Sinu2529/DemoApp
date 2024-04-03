import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userarray: any;

  constructor(private http:HttpClient){
    this.getAllUser();
  }

  getAllUser(){
    this.http.get("http://localhost:3000/register").subscribe((res:any)=>{
      this.userarray =res;
    })
  }

  handleImageError(event: any) {
    // Log or handle the error as needed
    console.error('Error loading image:', event);
  }
  




}


