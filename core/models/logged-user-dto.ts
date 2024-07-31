import {ActivityDto} from "~/core/models/activity-dto";

export interface LoggedUserDto {
    activityDtos: ActivityDto[];
    branchId: number;
    branchcodes: any[];
    currenSupervisorId: number;
    endEmploymentDateFa: string;
    expireDate: string;
    expireDateFa: string;
    firstName: string;
    fullName: string;
    fullUserName: string;
    id: number;
    isActive: boolean;
    isLegal: boolean;
    isLegalUser: boolean;
    lastName: string;
    loanActionLogs: any[];
    mobileNumber: string;
    mustChangePassword: boolean;
    nationalCode: string;
    password: string;
    picturePath: string;
    rePassword: string;
    relatedSupervisors: string;
    roleDesc: string;
    roleId: number;
    roleName: string;
    startEmploymentDateFa: string;
    telNumber: string;
    token: string;
    userName: string;
}