import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IUserTokenSuccessAuthResponse } from "../../shared/models/user-token-success-auth-response";
import { IUserLoginScuccessResponse } from "../../shared/models/user-login-success-response";
import { UserTokenStore } from "./user-token-sore";
import { tap } from "rxjs";
import { IUserRegisterSuccessResponse } from "../../shared/models/user-register-success-response";
import { UserInfoStore } from "./user-info-store";

@Injectable({
    providedIn: 'root'
})

export class UserApi {
    private readonly _httpClient = inject(HttpClient)
    private readonly _userTokenStore = inject(UserTokenStore);
    private readonly _userInfoStore = inject(UserInfoStore);


    validateToken() {
        return this._httpClient.get<IUserTokenSuccessAuthResponse>('http://localhost:3000/users/validate-token');
    }

    login(email: string, password: string) {
        return this._httpClient.post<IUserLoginScuccessResponse>('http://localhost:3000/users/login', { email,password}

        ).pipe(
            tap(({user:{id, name, email}}) => this._userInfoStore.setUserInfo({id, name, email})),
            tap((loginResponse) => this._userTokenStore.saveToken(loginResponse.token)));
    }

    register(name: string, email: string, password: string) {
        return this._httpClient.post<IUserRegisterSuccessResponse>('http://localhost:3000/users', {
           name,
           email,
           password, 
        });
    }
}