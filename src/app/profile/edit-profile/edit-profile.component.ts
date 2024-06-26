import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  imageurl="/assets/profile-pic.jpg";
  userForm!: FormGroup;
  lastEntry: any;
  router: any;

  constructor(private http: HttpClient, private fb: FormBuilder, public ss:ServiceService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      image:[''],
      first: [''],
      last: [''],
      email: [''],
      number: [''],
      age: [''],
      state: [''],
      country: [''],
      address: [''],
      address1:[''],
      address2:[''],
      tag: ['']
    });

    // Fetch the last entry from the JSON server
    this.http.get<any>('http://localhost:3000/register?_sort=id&_order=desc&_limit=1').subscribe(data => {
      if (data && data.length > 0) {
        const lastEntry = data[0];
        this.userForm.patchValue({
          first: lastEntry.first,
          last: lastEntry.last,
          email: lastEntry.email,
          number: lastEntry.number,
          age: lastEntry.age,
          state: lastEntry.state,
          country: lastEntry.country,
          address: lastEntry.address,
          address1: lastEntry.address1,
          address2: lastEntry.address2,
          tag: lastEntry.tag
        });
      }
    });
  }
  get ageFormControl() {
    return this.userForm.controls;
  }
  addTag(tag: string) {
    const tags = (this.userForm.get('tag')!.value as string[]) || [];
    tags.push(tag);
    this.userForm.get('tag')!.setValue(tags);
  }
  
  removeTag(index: number) {
    const tags = (this.userForm.get('tag')!.value as string[]) || [];
    tags.splice(index, 1);
    this.userForm.get('tag')!.setValue(tags);
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




  onSubmit() {
    debugger;
    console.log(this.userForm.value)
    const obj =this.userForm.value;
    this.http.post('http://localhost:3000/register',obj).subscribe((result:any)=>{
      alert("profile edited")
    })
  }

  
  }


