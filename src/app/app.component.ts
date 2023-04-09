import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = '101224717_comp3133_as2';
  isMenuVisible = false

  constructor (private router: Router) {

  }

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl == "/login" || currentUrl == "/register"){
      this.isMenuVisible = false
    }else{
      this.isMenuVisible = true
    }
  }
  
}
