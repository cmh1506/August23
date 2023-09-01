import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  constructor(private http: HttpClient){
  }
  title: string = "huhu"
  ngOnInit(): void {
    this.http.get<string>('http://localhost:3000/api/material').subscribe((res) => {
      this.title = JSON.parse(JSON.stringify(res))[0]["recyclingverfahren"]
    })
  }
}
