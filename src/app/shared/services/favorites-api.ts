import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MoviesListResponse } from "../types/movies-list-response";
import { IMovieToFavoriteSuccessResponse } from "../models/IMovie-ToFavorite-Success-Response";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class FavoritesApi {
    private readonly _httpClient = inject(HttpClient);

    getFavorites() {
        return this._httpClient.get<MoviesListResponse>(environment.baseUrl + '/favorites');
    }

    addMovieToFavorites(movieId: number){
        return this._httpClient.post<IMovieToFavoriteSuccessResponse>(environment.baseUrl +'/favorites/' + movieId, {});
    
    }

    removeMovieFromFavorites(movieId: number) {
        return this._httpClient.delete<void>(environment.baseUrl +'/favorites/' + movieId);
    }

    isMovieInFavorites(movieId: number) {
        return this.getFavorites().pipe(
            map((favoriteListResponse) => favoriteListResponse.find((fm) => fm.id === movieId) ? true : false)
        );
    }

    toggleMovieFavorite(isCurrentMovieFavorite: boolean, movieId: number): Observable<void | IMovieToFavoriteSuccessResponse>{
        const removeMovie = isCurrentMovieFavorite;

        if(removeMovie){
            return this.removeMovieFromFavorites(movieId);
        } else {
            return this. addMovieToFavorites(movieId);
        }
    }
}