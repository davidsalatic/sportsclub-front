import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TitleService{

    private pageTitle = new BehaviorSubject("Sports Club");
    title = this.pageTitle.asObservable();

    constructor(private browserTitle:Title){}

    changeTitle(title:string)
    {
        this.pageTitle.next(title)
        this.browserTitle.setTitle(title+ " - Sports Club")
    }

    getTitle()
    {
        return this.pageTitle.value;
    }
}