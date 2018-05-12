import { Position } from './Position';
import { Department } from './Department';
import { UserRoles } from './UserRoles';

export class User {    
    Id: number;
    FirstName: string;
    LastName: string;
    MiddleName: string;
    IsMale: boolean = true;
    ImgBase64?: string;
    PositionId?: number;
    Position: Position;
    DepartmentId?: number;
    Department: Department;
    UserRoles: Array<UserRoles>;
}