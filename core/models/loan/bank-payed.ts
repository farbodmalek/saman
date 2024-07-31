import {ColumnActions} from "../common/column-actions";

export interface BankPayed {
    id: number;
    payAmount: number;
    payBankStatus: string;
    payDateFa: string;
    columnActions: ColumnActions[];
    loanId: number;
}