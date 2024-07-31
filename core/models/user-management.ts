import {ColumnActions} from "~/core/models/common/column-actions";

export interface UserManagement {
    activityDtos: string;
    branchId: number;
    branchcodes: number;
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
    columnActions: ColumnActions[];
}