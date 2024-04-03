import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
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
    state:new FormControl(''),
    country:new FormControl(''),
    address:new FormControl(''),
    address1:new FormControl(''),
    address2:new FormControl(''),
    tags:new FormControl('')
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
    onCancel() {
      this.router.navigate(['/']);
    }

    onSelectFile(e:any){
      if(e.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event:any)=>{
          this.imageurl=event.target.result;
        }
      }

    }

    onOptionSelected(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.selectedOption = target.value;
  
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [{name: 'cricket'}, {name: 'football'}, {name: 'hockey'}];
  announcer = inject(LiveAnnouncer);
  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();
  //   if (value) {
  //     this.tags.push({name: value});
  //   }
  //   event.chipInput!.clear();
  // }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const newTags = value.split(/[,\s]+/); // Split the input value by comma or space
      newTags.forEach(tag => {
        tag = tag.trim();
        if (tag) {
          this.tags.push({ name: tag });
        }
        const tags = {
          ...this.userForm.value,
          tags: this.tags
        };
      });
    }
  
    event.chipInput!.clear();
  }
  
  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
    }
  }
  
}
  
 




