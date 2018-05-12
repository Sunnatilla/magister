import { Component, OnInit } from "@angular/core";
import { User } from "../models/User";
import { DataService } from "../services/data.service";
import { Position } from "../models/Position";
import { Department } from "../models/Department";
import { SearchParams } from "../models/SearchParams";
import { SlimLoadingBarService, SlimLoadingBarEventType } from "ng2-slim-loading-bar";
import { ToastyService, ToastyConfig } from "ng2-toasty";


@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    providers: [DataService]
})

export class UserListComponent implements OnInit{
    users: Array<User>;
    positions: Array<Position>;
    departments: Array<Department>;
    searchParams: SearchParams;
    
    constructor(private service: DataService, 
                private slimLoadingBarService: SlimLoadingBarService,
                private toastyService: ToastyService,
                private toastyConfig: ToastyConfig
            ){
        this.users = new Array<User>();
        this.positions = new Array<Position>();
        this.departments = new Array<Department>();
        this.searchParams = new SearchParams();
        this.toastyConfig.theme = 'material';
    }

    ngOnInit(){
        
        this.slimLoadingBarService.start();

        this.service
            .setUrl(this.service.URL_POSITIONS)
            .all().subscribe((data:any) => { this.positions = data; });
        
        this.service
            .setUrl(this.service.URL_DEPARTMENTS)
            .all().subscribe((data:any) => { this.departments = data; });

        this.service
            .setUrl(this.service.URL_USERS)
            .all()
            .subscribe(
                (data:any) => {
                    this.users = data
                },
                (error:any) => {
                    this.slimLoadingBarService.complete();
                },
                () => {
                    this.slimLoadingBarService.complete();
                }
            );
            
    }

    delete(id: number){
        this.slimLoadingBarService.start();
        this.service.delete(id).subscribe(
            (data:any) => {
                this.users = this.users.filter(m => m.Id != id)
            },
            (error: any) => {
                this.slimLoadingBarService.complete();
                this.toastyService.error({
                    title: "Сообщение",
                    msg: "Возникла ошибка",
                    showClose: true,
                    timeout: 2000,
                    theme: 'default'});
            },
            () => {
                this.slimLoadingBarService.complete();
                this.toastyService.success({
                    title: "Сообщение",
                    msg: "Успешно удалено",
                    showClose: true,
                    timeout: 2000,
                    theme: 'default'});
            }
        );
    }

    clearSearch(){
        this.searchParams = { LastName : "", DepartmentId: null, PositionId: null};
        this.search();
    }

    search(){        
        this.slimLoadingBarService.start();
        this.service.searchUsers(this.searchParams).subscribe(
            (data:any) => {
                this.users = data;
            },
            (error: any) => {
                this.slimLoadingBarService.complete();
                this.toastyService.error({
                    title: "Сообщение",
                    msg: "Возникла ошибка",
                    showClose: true,
                    timeout: 2000,
                    theme: 'default'});
            },
            () => {
                this.slimLoadingBarService.complete();
                this.toastyService.success({
                    title: "Сообщение",
                    msg: "Запрос успешно обработан",
                    showClose: true,
                    timeout: 2000,
                    theme: 'default'});
            }
        );
    }
}