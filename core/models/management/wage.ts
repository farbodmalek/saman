import {ColumnActions} from "../common/column-actions";

export interface Wage {
    branch: string;
    id: number;
    longDistance: number;
    paymentMonth: string;
    pointCount: number;
    shortDistancePointCount: number;
    strLongDistance: string;
    supervisor: string;
    surveyUserFullName: string;
    userId: number;
    wageAmount: number;
    wageDateFa: string;
    columnActions: ColumnActions[];
}