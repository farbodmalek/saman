import {BaseApi} from "../core/base/base-api";
import {Wage} from "../core/models/management/wage";
import {SubjectSelectedByUser} from "../core/models/management/subject-selected-by-user";
import {LoanSubjects} from "../core/models/management/loan-subjects";

export class SurveyService extends BaseApi {
    static getSurveyList(body: any) {
        const url = 'survey/GetSurveysList';
        return this.postApi(url, body);
    }

    static setPreferencePlan(body: any) {
        const url = 'survey/setPreferencePlan';
        return this.postApi(url, body);
    }

    static downloadExcelSurveyLoan(body: any) {
        const url = 'survey/getSurveyLoansListExcel';
        return this.postApi(url, body);
    }

    static removeSurveyLoan(body: any) {
        const url = 'survey/RemoveCartable/';
        return this.postApi(url, body);
    }

    static getSurveyWageList(body: any): Promise<Wage[]> {
        const url = 'survey/GetSurveyWageList';
        return this.postApi(url, body);
    }

    static confirmUsersMonthlyPayment(userSurveyWageIdList: number[]) {
        const url = 'survey/ConfirmUsersMontlyPayment';
        return this.postApi(url, userSurveyWageIdList);
    }

    static getPlanNoInfoList(body: any): Promise<SubjectSelectedByUser[]> {
        const url = 'PlanNo/GetPlanNoInfoList/';
        return this.postApi(url, body);
    }

    static setPlanLoan(body: any) {
        const url = 'PlanNo/setLoansPlanNo/';
        return this.postApi(url, body);
    }

    static getLoanSubjectList(body: any): Promise<LoanSubjects[]> {
        const url = 'PlanNo/GetLoanPlanNoList';
        return this.postApi(url, body);
    }

    static changeLoanPlanNo(body: any) {
        const url = 'PlanNo/changeLoansPlanNo';
        return this.postApi(url, body);
    }
}