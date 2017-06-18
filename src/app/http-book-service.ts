import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HttpBookService {
    constructor(private _http: Http) {}
    getBooks() {
        return this._http.get('https://polar-ravine-10766.herokuapp.com/getAllBooks').map((response: Response) => response.json());
    }
    deleteBook(parameters: { title: any }) {
        const title = parameters;
        return this._http.get('https://polar-ravine-10766.herokuapp.com/delete/' + title).map((response: Response) => response.json());
    }

    createBook(parameters: { title: any, author: any, date: any }) {
        const {title, author, date} = parameters;
        const url = encodeURI('https://polar-ravine-10766.herokuapp.com/create/' + title + '/' + author + '/' + date);
        return this._http.get(url).map((response: Response) => response.json());
    }

    updateBook(parameters: { title: any, author: any, date: any }) {
        const {title, author, date} = parameters;
        const url = 'https://polar-ravine-10766.herokuapp.com/update/' + title + '/' + author + '/' + date;
        return this._http.get(url).map((response: Response) => response.json());
    }
}
