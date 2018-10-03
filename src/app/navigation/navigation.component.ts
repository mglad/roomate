import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseApp} from 'angularfire2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router,  private firebaseApp: FirebaseApp) { }
  isCollapsed = true;
  name = '';
  profileImg = '';
  ngOnInit() {
    this.name = this.firebaseApp.auth().currentUser.displayName;
    this.profileImg = this.firebaseApp.auth().currentUser.photoURL;
  }

  logout() {
    this.router.navigate(['/login']);
    this.firebaseApp.auth().signOut();
  }
}
