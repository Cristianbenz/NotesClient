import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateNoteRequest } from '../models/createNoteRequest';
import { Response } from '../models/response';
import { UpdateNoteRequest } from '../models/updateNoteRequest';
import { ApiAuthService } from './api-auth.service';

@Injectable({
  providedIn: 'root'
})

export class ApiNotesService {
  private _url = 'https://localhost:7283'
  private user = this._authService.userData;
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  } 

  constructor( 
    private _http : HttpClient,
    private _authService : ApiAuthService
  ) { }

  getNotes() : Observable<Response> {
      return this._http.get<Response>(`${this._url}/api/Note/GetAll/${this.user?.id}`, this._httpOptions)
  }

  createNote(note : CreateNoteRequest) : Observable<Response> {
    return this._http.post<Response>(`${this._url}/api/Note/CreateNote`, note, this._httpOptions)
  }

  updateNote(id : number, note : UpdateNoteRequest) : Observable<Response> {
    return this._http.put<Response>(`${this._url}/api/Note/EditNote/${id}`, note, this._httpOptions)
  }
}