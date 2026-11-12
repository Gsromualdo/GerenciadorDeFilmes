import {computed, Injectable, signal} from '@angular/core';
import { IUserInfos } from '../../shared/models/user-infos';

@Injectable({
    providedIn: 'root',
})
export class UserInfoStore {
    private readonly user = signal<IUserInfos | undefined>(undefined);
    private readonly USER_NAME_KEY = 'user-name'
    userInfos = this.user.asReadonly();


    userName = computed(() => {
        const HAS_USER = this.user();
        const userNameLocalStorage = localStorage.getItem(this.USER_NAME_KEY);

        if(!HAS_USER) return userNameLocalStorage ? userNameLocalStorage : '';

        return this.user()?.name;
    });

    setUserInfo(user: IUserInfos) {
        this.user.set(user);

        localStorage.setItem(this.USER_NAME_KEY, user.name);
    }

    removeUser() {
        localStorage.removeItem(this.USER_NAME_KEY);
    }
}