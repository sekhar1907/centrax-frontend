import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { PracticeTodo, PracticeTodoDto, PracticeTodoList } from "../models/practice-todo.model";

const baseUrl = `${environment.apiUrl}/practice-todo-lists`;


@Injectable({
  providedIn: 'root'
})
export class PracticeTodoService {
  constructor(private http: HttpClient) { }


  getAll(): Observable<PracticeTodoList> {
    return this.http.get<PracticeTodoList>(baseUrl);
  }

  create(data: PracticeTodoDto): Observable<PracticeTodo> {
    return this.http.post<PracticeTodo>(baseUrl, data);
  }
}
