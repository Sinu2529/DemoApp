import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userarray: any;
  imageurl: any;

  constructor(private http:HttpClient){
    this.getAllUser();
  }

  ngOnInit(){
    this.fetchImage();

  }
   
  fetchImage() {
    // Adjust the URL according to your server configuration
    const apiUrl = 'http://localhost:3000/register'; // Endpoint to fetch image data
    this.http.get(apiUrl, { responseType: 'text' }).subscribe(
      (response: any) => {
        // Assuming the server responds with base64 encoded image data
        this.imageurl = response.image;
      },
      error => {
        console.error('Error fetching image:', error);
      }
    );
  }

  onSelectFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.imageurl=event.target.result;
        console.log(e.target.files)
      }
    }

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


