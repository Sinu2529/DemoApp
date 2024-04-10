import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[ServiceService]
})
export class RegisterComponent {
  selectedOption: string| null = null;
  imageurl="/assets/profile-pic.jpg";

  userForm: FormGroup = new FormGroup({
    image:new FormControl(''),
    first:new FormControl('',[Validators.required,Validators.maxLength(20)]),
    last:new FormControl('',[Validators.required,Validators.maxLength(20)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    number:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*$")]),
    age:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    country:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    address1:new FormControl('',[Validators.required]),
    address2:new FormControl('',[Validators.required]),
    tag: new FormControl(['Angular', 'JavaScript', 'HTML', 'CSS'])
  })
  router: any;

  get first(){
    return this.userForm.get('first')
  }
  get last(){
    return this.userForm.get('last')
  }
  get email(){
    return this.userForm.get('email')
  }
  get number(){
    return this.userForm.get('number')
  }
  get age(){
    return this.userForm.get('age')
  }
  get state(){
    return this.userForm.get('state')
  }
  get country(){
    return this.userForm.get('country')
  }
  get address(){
    return this.userForm.get('address')
  }
  get address1(){
    return this.userForm.get('address1')
  }
  get address2(){
    return this.userForm.get('address2')
  }
  get tag(){
    return this.userForm.get('tags')
  }

  constructor(private http:HttpClient, private ss:ServiceService,private route:Router){

  }
  onSaveUser(){
    debugger;
    console.log(this.userForm.value)
    const obj =this.userForm.value;
    this.http.post('http://localhost:3000/register',obj).subscribe((result:any)=>{
      alert("usercreated")
    })
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

    onOptionSelected(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.selectedOption = target.value;
  
  }

  get ageFormControl() {
    return this.userForm.controls;
  }
}


