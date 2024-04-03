import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [

  {path: '', component:HomePageComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'edit-profile',component:EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
