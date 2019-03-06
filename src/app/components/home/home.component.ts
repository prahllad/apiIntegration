import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class Home {
    private ngUnsubscribe: Subject<any> = new Subject();
    totalIssues: any = {};
    found: boolean = false;
    error:any ;
    constructor(private userService: UserService, ) {

        // this.get();
    }
    get(url) {      //this function used to get url from frontend and call user service to get data
        if (url === '') {
            this.error = "Empty url can't be submitted";
            this.found = false; 
        }
        else {
            this.userService.getgitRepo(url.trim()).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success) => {
                if (success) {
                    this.error = null;
                    this.found = true;
                    success.forEach((el, index) => {
                        this.totalIssues['count' + index] = el['total_count'];
                    })
                }
            }, (error) => {
                this.found = false; 
                this.error = 'repo not found , something is wrong';
            })
        }
    }


}