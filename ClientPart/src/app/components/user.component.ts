import { User } from "../models/User";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Position } from '../models/Position';
import { Department } from "../models/Department";
import { Role } from "../models/Role";
import { DataService } from "../services/data.service";
import { UserRoles } from "../models/UserRoles";
import { ActivatedRoute, Router } from "@angular/router";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { ToastyService, ToastyConfig } from "ng2-toasty";
import { Options, ImageResult } from "ngx-image2dataurl";

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    providers: [DataService]
})

export class UserComponent implements OnInit{
    editId?: number;
    user: User;
    positions: Array<Position>;
    departments: Array<Department>;
    roles: Array<Role>;
    options: Options = {
        resize: {
            maxHeight: 100,
            maxWidth: 75
        },
        allowedExtensions: ['JPG', 'PnG']
    };
    
    public file_srcs: string[] = [];  
    public debug_size_before: string[] = [];  
    public debug_size_after: string[] = []; 

    constructor(private service: DataService, 
                private router: Router,
                private activeRoute: ActivatedRoute, 
                private slimLoadingBarService: SlimLoadingBarService,
                private toastyService: ToastyService,
                private toastyConfig: ToastyConfig,
                private changeDetectorRef: ChangeDetectorRef){
        activeRoute.params.subscribe(params => this.editId = params['id']);
        this.user = new User();
        this.user.UserRoles = new Array<UserRoles>();
        this.positions = new Array<Position>();
        this.departments = new Array<Department>();
        this.roles = new Array<Role>();
        this.toastyConfig.theme = 'material';
    }

    ngOnInit(){

        this.slimLoadingBarService.start();

        if(this.editId){
            this.service
                .setUrl(this.service.URL_USERS)
                .get(this.editId).subscribe(
                    (data: any) => {
                        this.user = data;
                    },
                    (eror: any) => {
                        this.slimLoadingBarService.complete();
                    },
                    () => {
                        this.slimLoadingBarService.complete();
                    }
                );
        }

        this.service
            .setUrl(this.service.URL_POSITIONS)
            .all().subscribe(
                (data:any) => { 
                    this.positions = data; 
                },
                (error: any) => {
                    this.slimLoadingBarService.complete();
                },
                () => {
                    this.slimLoadingBarService.complete();
                }
            );
            
        this.service
            .setUrl(this.service.URL_DEPARTMENTS)
            .all().subscribe(
                (data:any) => { 
                    this.departments = data; 
                },
                (error: any) => {
                    this.slimLoadingBarService.complete();
                },
                () => {
                    this.slimLoadingBarService.complete();
                }
            );
            
        this.service
            .setUrl(this.service.URL_ROLES)
            .all().subscribe((data:any) => { this.roles = data; });
    }

    checkRole(roleId: number){
        if(!this.isCheckedRole(roleId)){
            this.user.UserRoles.push({ UserId: this.editId, RoleId: roleId });
        }
    }

    isCheckedRole(roleId: number){
        return this.user.UserRoles.find(m => m.RoleId == roleId);
    }
    
    selected(imageResult: ImageResult) {
        if (imageResult.error) alert(imageResult.error);
        this.user.ImgBase64 = imageResult.resized
        && imageResult.resized.dataURL
        || imageResult.dataURL;
    }

    create(){
        this.slimLoadingBarService.start();
        return this.service
                    .setUrl("http://localhost:52961/api/users")
                    .create(this.user).subscribe(
                        (data:any) => {
                            
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
                                msg: "Успешно добавлено",
                                showClose: true,
                                timeout: 2000,
                                theme: 'default'});
                        }
                    );
    }

    update(){
        this.slimLoadingBarService.start();
        return this.service
                    .setUrl("http://localhost:52961/api/users")
                    .update(this.user.Id, this.user).subscribe(
                        (data:any) => {
                            
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
                                msg: "Успешно обновлено",
                                showClose: true,
                                timeout: 2000,
                                theme: 'default'});
                        }
                    );
    }
}