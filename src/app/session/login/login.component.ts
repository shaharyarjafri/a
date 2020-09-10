import { Component, OnInit } from '@angular/core';
import {ApiModule} from '../../api/api.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiModule) { }

  ngOnInit() {
  }
  login(){
    this.api.login('admin@gmail.com','abc123',(err,res)=>{
      console.log('response ', res)
    })
  }
}
