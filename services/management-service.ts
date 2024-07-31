import {BaseApi} from "../core/base/base-api";
import {BaseFilters} from "../core/models/common/base-filters";
import {FilterManagement} from "~/core/models/management/filter-management";

export class ManagementService extends BaseApi {

    static getUsers(body: BaseFilters) {
        const url = 'user/getUserListQuery';
        return this.postApi(url, body);
    }

    static getMenuDefinition(body: FilterManagement) {
        const url = 'activity/getAllActivitiesQuery';
        return this.postApi(url, body);
    }

    static roleManagement(body: FilterManagement) {
        const url = 'role/getRoleListQuery';
        return this.postApi(url, body);
    }

    static setNewUserDefinition(body: FilterManagement) {
        const url = 'user/setUser';
        return this.postApi(url, body);
    }

    static getUserRole(id: number) {
        const url = `user/GetUserRoles/${id}`;
        return this.getApi(url);
    }

    static deleteUserRole(id: number) {
        const url = `user/deleteUserRole/${id}`;
        return this.postApi(url, null);
    }

    static userSetRole(body: any) {
        const url = `user/SetUserRole`;
        return this.postApi(url, body);
    }

    static getUserBranch(id: number) {
        const url = `userBranch/GetUserBranches/${id}`;
        return this.getApi(url);
    }

    static deleteUserBranch(body: any) {
        const url = `UserBranch/deleteUserBranch/`;
        return this.postApi(url, body);
    }

    static changeUserPass(body: any) {
        const url = 'user/refereshPassword';
        return this.postApi(url, body);
    }

    static getSystemDefinition() {
        const url = 'setting/getSetting';
        return this.getApi(url);
    }

    static setSystemDefinition(body: any) {
        const url = 'setting/UpdateSetting';
        return this.postApi(url, body);
    }

    static setUserActivity(body: any) {
        const url = 'activity/setActivity';
        return this.postApi(url, body);
    }

    static getCustomers(body: any) {
        const url = 'customer/getCustomers';
        return this.postApi(url, body);
    }
    static GetCustomerAddressByNumber(id: any) {
        const url = `customer/GetCustomerAddressByNumber/${id}`;
        return this.getApi(url,);
    }

    static getSqlOracleLoanListQuery(body: any) {
        const url = 'oracle/getSqlOracleLoanListQuery';
        return this.postApi(url, body);
    }

    static GetWagePaymentList(body: any) {
        const url = 'actor/GetWagePaymentList';
        return this.postApi(url, body);
    }

    static SaveActorMontlyOperationPdf(id: any) {
        const url = `actor/SaveActorMontlyOperationPdf/${id}`;
        return this.getApi(url,);
    }
    static RemovePrintMontlyRequest(id: any) {
        const url = `actor/RemovePrintMontlyRequest/${id}`;
        return this.getApi(url,);
    }

    static setPrintRequestPayment(body: any) {
        const url = 'actor/SetPrintRequestPayment';
        return this.postApi(url, body);
    }
}