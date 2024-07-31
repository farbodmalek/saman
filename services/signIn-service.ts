import {BaseApi} from "../core/base/base-api";

export class SignInService extends BaseApi {

    static login(body: any) {
        const url = 'auth/login';
        return this.postApi(url, body);
    }

    static logout() {
        localStorage.clear();
        navigateTo("/authentication/login");
    }
}