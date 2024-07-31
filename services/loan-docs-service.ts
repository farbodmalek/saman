import {BaseApi} from "../core/base/base-api";
import {LoanCustomerPayed} from "../core/models/loan/loan-customer-payed";
import {CustomerPayedDetail} from "../core/models/loan/customer-payed-detail";
import {BankPayed} from "../core/models/loan/bank-payed";
import {DebtList} from "../core/models/loan/debt-list";
import {ActionAttachType} from "../core/models/common/action-attach-type";
import {CommitmentSurvey} from "../core/models/loan/commitment-survey";

export class LoanDocsService extends BaseApi {
    static getAllLoan(body: any) {
        const url = 'loan/getLoansQuery';
        return this.postApi(url, body);
    }

    static loanRefresh(body: any) {
        const url = 'loan/refreshLoan/';
        return this.postApi(url, body);
    }

    static setLoanDeath(body: any) {
        const url = 'loan/setDeath';
        return this.postApi(url, body);
    }

    static getInsuranceTypes(body: any) {
        const url = 'loan/getSupplementaryInsuranceTypes';
        return this.postApi(url, body);
    }

    static getLoanDetailById(id: number) {
        const url = `loan/getLoanByIdQuery/${id}`;
        return this.getApi(url);
    }

    static getLoanCustomerPayed(body: any): Promise<LoanCustomerPayed[]> {
        const url = `loan/getLoanPayInfoQuery`;
        return this.postApi(url, body);
    }

    static getLoanCustomerPayedDetail(body: any): Promise<CustomerPayedDetail[]> {
        const url = `loan/getLoanPayDetailsQuery`;
        return this.postApi(url, body);
    }

    static getLoanBankPayed(body: any): Promise<BankPayed[]> {
        const url = `loan/getLoanPayBankQuery`;
        return this.postApi(url, body);
    }

    static getLoanDebtList(body: any): Promise<DebtList[]> {
        const url = `loan/getLoanPayCardQuery`;
        return this.postApi(url, body);
    }

    static getLoanDailyQuery(body: any): Promise<DebtList[]> {
        const url = `loan/getLoanDailyQuery`;
        return this.postApi(url, body);
    }

    static updateLoanDailyQuery(body: any): Promise<DebtList[]> {
        const url = `loan/refreshLoanDaily`;
        return this.postApi(url, body);
    }

    static getLoanActions(body: any): Promise<DebtList[]> {
        const url = `loanAction/GetLoanActionListQuery/` + body;
        return this.postApi(url, {});
    }

    static deleteAction(id: number) {
        const url = `loanAction/removeLoanAction/` + id;
        return this.postApi(url, {});
    }

    static getActionAttachType(): Promise<ActionAttachType[]> {
        const url = `loanAction/GetAllActionTypes`;
        return this.postApi(url, {});
    }

    static getActionFileAttachType(id: number): Promise<ActionAttachType[]> {
        const url = `upload/GetAllAttachmentTypes/` + id;
        return this.getApi(url);
    }

    static setNewLoanAction(body: any) {
        const url = `loanAction/setLoanAction`;
        return this.postApi(url, body);
    }

    static getActionReport(id: number) {
        const url = `actor/GetLoanActionsReport/` + id;
        return this.getApi(url);
    }

    static getSupervisionSurveyList(body: any) {
        const url = `survey/getCartableSurveyList`;
        return this.postApi(url, body);
    }

    static setEnactment(body: any) {
        const url = `enactment/set/`;
        return this.postApi(url, body);
    }

    static getCommitteeSurvey(body: any): Promise<CommitmentSurvey[]> {
        const url = `survey/GetOutsideSurveyList`;
        return this.postApi(url, body);
    }

    static setOutsideSurvey(body: any): Promise<CommitmentSurvey[]> {
        const url = `survey/setOutsideSurvey`;
        return this.postApi(url, body);
    }

    static getGuarantorAddress(id: number) {
        const url = `customer/getCustomer/${id}`;
        return this.getApi(url);
    }

    static getAllUserActors(body: any): Promise<CommitmentSurvey[]> {
        const url = "actor/getAllUserActors";
        return this.postApi(url, body);
    }


    static getActorWages(body: any): Promise<CommitmentSurvey[]> {
        const url = "actor/GetActorWages";
        return this.postApi(url, body);
    }

    static actorConfirmation(body: any): Promise<CommitmentSurvey[]> {
        const url = "actor/actorConfirmation/";
        return this.postApi(url, body);
    }
    static getActorPursuitQuery(body: any): Promise<CommitmentSurvey[]> {
        const url = "actor/getActorPursuitQuery";
        return this.postApi(url, body);
    }

    static GetBranchAggregatedWage(body: any): Promise<CommitmentSurvey[]> {
        const url = "actor/GetBranchAggregatedWage";
        return this.postApi(url, body);
    }

    static GetActorAggregatedWage(body: any): Promise<CommitmentSurvey[]> {
        const url = "actor/GetActorAggregatedWage";
        return this.postApi(url, body);
    }

    static GetSupervisorAggregatedWage(body: any): Promise<CommitmentSurvey[]> {
        const url = "actor/GetSupervisorAggregatedWage";
        return this.postApi(url, body);
    }

    static getRelatedList(body: any): Promise<CommitmentSurvey[]> {
        const url = "loan/getRelatedLoans";
        return this.postApi(url, body);
    }

    static aggregationfilter(body: any): Promise<CommitmentSurvey[]> {
        const url = "actor/Aggregationfilter";
        return this.postApi(url, body);
    }

}