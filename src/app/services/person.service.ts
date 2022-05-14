import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private BASE_URL = 'https://tekdi-challenges.appspot.com/api/People';

  constructor(private http: HttpClient) { }

  getPeople() {
    return this.http.get<Person[]>(this.BASE_URL);
  }

  getPerson(id: number) {
    return this.http.get<Person>(`${this.BASE_URL}/${id}`);
  }

  addPerson(person: Person) {
    return this.http.post<Person>(this.BASE_URL, person);
  }

  updatePerson(person: Person) {
    return this.http.put<Person>(`${this.BASE_URL}/${person.id}`, person);
  }
}
