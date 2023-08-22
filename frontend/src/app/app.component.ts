import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient){
  }
  title: string = "huhu"
  ngOnInit(): void {
    this.http.get<string>('msdocs-expressjs-mongodb-che.azurewebsites.net/api/material').subscribe((res) => {
      console.log(res)
      this.title = JSON.parse(JSON.stringify(res))[0]["recyclingverfahren"]
    })
  }
  
}
