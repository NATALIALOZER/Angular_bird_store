import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../shared/interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null,[Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    const user: User = {
      login: this.form.value.login,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe( () => {
      this.form.reset();
      this.router.navigate(['/admin','/dashboard'])
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }
  }
}
