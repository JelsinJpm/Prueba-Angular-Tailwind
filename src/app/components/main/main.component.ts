import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [RouterOutlet, SideMenuComponent],
})
export class MainComponent {}
