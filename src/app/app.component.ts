import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class User {
  first_name: string;
  last_name: string;
  email: string;
  avatar: any;
  id?: number;

  constructor(first_name: string, last_name: string, email: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users: User[] = [];
  page: number = 1;
  total_pages: number = 0 
  isDisabled: boolean = false;
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http
  }
  
  ngOnInit(): void {
    this.http.get(`https://reqres.in/api/users?page=${this.page}`).subscribe((response: any) => {
      this.users = response.data;
      
      this.total_pages = response.total_pages;
      console.log(this.users);
      
    })
  }

  getUsersForward() {
    this.page = this.page + 1;
    this.http.get(`https://reqres.in/api/users?page=${this.page}`).subscribe((response: any) => {
      this.users = response.data;
      console.log(this.total_pages, this.page, this.isDisabled);
      
      if (this.page === this.total_pages) {
        this.isDisabled = true
      }
      console.log(this.total_pages, this.page, this.isDisabled);
    })
  }

  getUsersBack() {
    this.page = this.page - 1;
    this.http.get(`https://reqres.in/api/users?page=${this.page}`).subscribe((response: any) => {
      this.users = response.data;
      console.log(this.total_pages, this.page, this.isDisabled);
      
      if (this.page !== this.total_pages) {
        this.isDisabled = false
      }
      console.log(this.total_pages, this.page, this.isDisabled);
    })
  }
  
  
}
