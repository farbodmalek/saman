import axios from "axios";
import {BasePage} from "../../core/base/base-page";

export class BaseApi extends BasePage {
    public static async postApi(url: string, body: any) {
        return await axios.post(this.getEnv() + url, body, this.config).then(r => r.data);
    }

    public static async getApi(url: string) {
        return await axios.get(this.getEnv() + url, this.config).then(r => r.data);
    }
}