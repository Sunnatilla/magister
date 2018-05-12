import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DataService {
    
    URL_USERS = 'http://localhost:52961/api/users';
    URL_USERS_SEARCH = "http://localhost:52961/api/users/search";
    URL_POSITIONS = 'http://localhost:52961/api/positions';
    URL_DEPARTMENTS = 'http://localhost:52961/api/departments';
    URL_ROLES = 'http://localhost:52961/api/roles';


    private url  = "";

    constructor(private http: HttpClient){}

    setUrl(url: string){
        this.url = url;
        return this;
    }

    all(){
        return  this.http.get(this.url);
    }

    get(id: number){
        const urlParams = new HttpParams().set("id", id.toString());
        return this.http.get(this.url, {params: urlParams});
    }

    create(data: any){
        return this.http.post(this.url, data);
    }

    update(id: number, data: any){
        return this.http.put(this.url + "/" + id, data);
    }

    delete(id: number){
        const urlParams = new HttpParams().set("id", id.toString());
        return this.http.delete(this.url, {params: urlParams});
    }

    searchUsers(searchParams:any){
        const { LastName, DepartmentId, PositionId } = searchParams;
        const urlParams = new HttpParams()
                                .set("FirstName", LastName)
                                .set("DepartmentId", DepartmentId)
                                .set("PositionId", PositionId);

        return this.http.get(this.URL_USERS_SEARCH, {params: urlParams});
    }
}