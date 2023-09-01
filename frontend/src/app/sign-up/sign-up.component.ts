import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private loginService: LoginService){}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      
      this.loginService.signUp(this.form.value);
    }
  }
}
