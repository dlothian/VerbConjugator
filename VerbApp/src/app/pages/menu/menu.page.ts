import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

// Gives the titles of the buttons and their urls
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Conjugator',
      url: '/menu/conjugator'
    },
    {
      title: 'About',
      url: '/menu/about'
    },
    {
      title: 'How To',
      url: '/menu/instructions'
    }
  ];

  selectedPath = '/menu/conjugator';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
  });

}

  ngOnInit() {
  }

}
