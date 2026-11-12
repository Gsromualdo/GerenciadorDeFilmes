import {HttpInterceptorFn } from "@angular/common/http";
import { UserTokenStore } from "../services/user-token-sore";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const userTokeStore = inject(UserTokenStore);

    const HAS_TOKEN = userTokeStore.hasToken();

    if (HAS_TOKEN) {
        const newRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${userTokeStore.getToken()}`,
            },
        });

        return next(newRequest);
    }
    return next(req);
};