import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {ApiModule} from './api.module';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  messaging: any;
  currentMessage = new BehaviorSubject(null)
  currentAppComponent: any;
  constructor(private api: ApiModule) {
    if (firebase.messaging.isSupported()) {
        this.messaging = firebase.messaging();
    }
  }

  
}
