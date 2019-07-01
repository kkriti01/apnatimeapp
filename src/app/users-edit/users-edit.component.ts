import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { LoginService } from '../login.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: LoginService) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      year_of_experience: ['', [Validators.required]],
      preferred_language: ['', [Validators.required]],
      address: ['', [Validators.required]],
      profile_picture: [''],
    });
    this.apiService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();

      formData.append('profile_picture', file);
      formData.append('id', this.editForm.get('id').value);
      console.log(formData.get('id'))
      this.apiService.updateProfile(formData)
      .pipe(first())
      .subscribe(
        data => {
            alert('Profile image updated successfully.');

        },
        error => {
          alert(error);
        });

    }
  }


  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
            alert('User updated successfully.');
            this.router.navigate(['Dasboard']);

        },
        error => {
          alert(error);
        });
  }

}
