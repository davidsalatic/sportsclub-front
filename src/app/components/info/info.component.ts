import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private titleService:TitleService) {
    titleService.changeTitle("Information")
   }

  ngOnInit(): void {
  }

}
