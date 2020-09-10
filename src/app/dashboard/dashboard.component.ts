import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {ApiModule} from '../api/api.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.scss','./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(private api: ApiModule) { }

  login(){
    this.api.login('admin@gmail.com','abc123',(err,res)=>{
      console.log('response ', res)
    })
  }
  ngOnInit() {
  }

}
