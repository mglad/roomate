import { Component, OnInit } from '@angular/core';
import {FirebaseApp} from 'angularfire2';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private firebaseApp: FirebaseApp) { }

  profileForm: FormGroup;
  name = '';
  profileImg = '';
  ngOnInit() {
    const currentUser = this.firebaseApp.auth().currentUser;
    if (currentUser.displayName != null) {
      this.name = currentUser.displayName.split(' ')[0];
    }

    if (currentUser.photoURL != null) {
      this.profileImg = currentUser.photoURL + '?height=200';
    }

    this.profileForm = new FormGroup({
      displayName: new FormControl(''),
      description: new FormControl('')
    });
  }

  onSubmit() {

  }
}
