import {BaseApi} from "~/core/base/base-api";

export class CommonService extends BaseApi {

    static getSuperVisor(body: any) {
        const url = 'branch/FilterSupervisor';
        return this.postApi(url, body);
    }

    static getBranches(body: any) {
        const url = 'branch/GetAllBranches';
        return this.postApi(url, body);
    }

    static getAllUserRoles() {
        const url = 'role/GetAll';
        return this.getApi(url);
    }

    static getAllBranches(body: any) {
        const url = 'branch/GetAllBranches';
        return this.postApi(url, body);
    }

    static getDashboardData(body: any) {
        const url = 'loan/getLoanAccQuery';
        return this.postApi(url, body);
    }

    static getPlanNoList(body: any) {
        const url = 'survey/GetPlanNosList';
        return this.postApi(url, body);
    }

    static setPlanNo(body: any) {
        const url = 'PlanNo/SetLoanPlanNo';
        return this.postApi(url, body);
    }
}