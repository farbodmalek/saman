import {ColumnActions} from "../common/column-actions";

export interface LoanSubjects {
    createBy: string;
    createDate: string;
    id: number;
    loanCount: number;
    planNoId: number;
    planNoName: string;
    columnActions: ColumnActions[];
}