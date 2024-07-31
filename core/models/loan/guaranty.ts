import {ColumnActions} from "../common/column-actions";

export interface Guaranty {
    id: number;
    guarantorCustomerId: number;
    guarantorCustomerNumber: number;
    loanId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    nationalNumber: string;
    idNumber: string;
    mobileNo: string;
    birthDateFa: string;
    registerDateFa: string;
    fatherName: string;
    columnActions: ColumnActions[];
}
