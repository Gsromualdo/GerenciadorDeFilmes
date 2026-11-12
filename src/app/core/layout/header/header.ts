import { Component, inject, linkedSignal } from '@angular/core';
import { UserTokenStore } from '../../services/user-token-sore';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserInfoStore } from '../../services/user-info-store';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly _userTokenStore = inject(UserTokenStore);
  private readonly _router = inject(Router);
  readonly _userInfoStore = inject(UserInfoStore);

  navigateEnd = toSignal(this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd)));

  isMenuOpen = linkedSignal({
    source: this.navigateEnd,
    computation: () =>false,
  });

  

  toggleMenu() {
    this.isMenuOpen.update((currentValue)=> !currentValue);
  }

  logout() {
    console.log('Saindo do sistema...');

    this._userTokenStore.removeToken();
    this._userInfoStore.removeUser();

    this._router.navigate(['/auth/login']);
  }
}
