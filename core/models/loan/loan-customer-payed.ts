import {ColumnActions} from "../common/column-actions";

export interface LoanCustomerPayed {
    accountDateFa: string;
    accountIssuerBranchCode: string;
    accountNo: string;
    baseAmount: number;
    branchCode: number;
    customerNumber: number;
    discountAmount: number;
    id: number;
    loanId: number;
    loanMinorTypeId: number;
    loanNumber: string;
    loanSerial: number;
    mainAmount: number;
    payDateEn: string;
    payDateFa: string;
    payDateTime: string;
    payNo: number;
    penaltyAmount: number;
    profitAmount: number;
    waitProfitAmount: number;
    listType: number;
    columnActions: ColumnActions[];
}