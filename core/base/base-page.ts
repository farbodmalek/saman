import {LoggedUserDto} from "~/core/models/logged-user-dto";

export class BasePage {

    public static loggedUserInfo: LoggedUserDto;
    public static config: any;

    static getEnv() {
        return useRuntimeConfig().public.management;
    }

    public static getLoggedUser(): LoggedUserDto | null {
        this.loggedUserInfo = JSON.parse(<string>localStorage.getItem('logged-user'));
        if (this.loggedUserInfo) {
            this.config = {headers: {'Authorization': 'Bearer ' + this.loggedUserInfo.token}};
            return this.loggedUserInfo;
        } else {
            localStorage.clear();
            navigateTo("/authentication/login");
            return null;
        }
    }

    static hasPermission(activityId: number) {
        this.loggedUserInfo = JSON.parse(<string>localStorage.getItem('logged-user'));
        return this.loggedUserInfo.activityDtos.some((p: any) => p.code === activityId);
    }

    static downloadAsExcel(blobRes: string, fileName: string) {
        const blob = new Blob([blobRes], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const objectUrl: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        a.href = objectUrl;
        a.download = fileName + '.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
    }
}