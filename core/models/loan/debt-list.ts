import {ColumnActions} from "../common/column-actions";

export interface DebtList {
    branchCode: number;
    customerNumber: number;
    id: number;
    isComplete: boolean;
    loanId: number;
    loanMinorTypeId: number;
    loanNumber: string;
    loanSerial: number;
    payAmount: number;
    payDate: string;
    payDateFa: string;
    payProfit: number;
    paySerial: number;
    waitProfitAmount: number;
    listType: number;
    columnActions: ColumnActions[];
}