import {ColumnActions} from "../common/column-actions";

export interface Actions {
    actionDateFa: string;
    actionTypeDesc: string;
    actionTypeId: number;
    actorId: number;
    createDateFa: string;
    createdBy: number;
    deadlineDateFa: string;
    description: string;
    fullUserName: string;
    id: number;
    loanId: number;
    userId: number;
    columnActions: ColumnActions[];
}