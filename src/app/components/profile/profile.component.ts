import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }
}
