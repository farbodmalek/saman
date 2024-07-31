import {ToastNotificationService} from "~/core/toast-notification-service";
import {loadingStore} from "../store/loading-store";

export class MakeResponse {
    static notificationService = ToastNotificationService;

    static makeServerResponse(method: Promise<any>, isLoading: boolean, onComplete: (result: any) => void) {
        const loadingMethod = loadingStore();
        if (isLoading) {
            loadingMethod.getLoadingShow();
        }

        method.then((result: any) => {
            const connectionErrorMessage = 'خطا در برقراری ارتباط با سرور، لطفاً مجددا تلاش نمایید.';
            if (result === null) {
                loadingMethod.getLoadingHide();
                this.notificationService.error(connectionErrorMessage);
                onComplete(null);
            } else {
                if (result && result.serverErrors && result.serverErrors.length > 0) {
                    loadingMethod.getLoadingHide();
                    if (result.serverErrors[0].code === 401) {
                        this.notificationService.error('عدم احراز هویت توسط سیستم.');
                    } else {
                        this.notificationService.error(result.serverErrors[0].hint);
                    }
                }

                if (result && result.errors && result.errors.length > 0) {
                    loadingMethod.getLoadingHide();
                    for (const item of result.errors) {
                        this.notificationService.error(item);
                    }
                    onComplete(result);
                } else if (result != null) {
                    onComplete(result);
                    loadingMethod.getLoadingHide();
                } else {
                    loadingMethod.getLoadingHide();
                    this.notificationService.error(connectionErrorMessage);
                    onComplete(null);
                }
            }
        }).catch(result => {

            loadingMethod.getLoadingHide();

            if (result.response && result.response.status === 404) {
                this.notificationService.error('خطای سیستمی');
            } else if (result.response && result.response.status === 401) {
                this.notificationService.error('عدم احراز هویت توسط سیستم.');
                localStorage.clear();
                navigateTo("/authentication/login");
            }
            if (result.request.status === 0) {
                localStorage.clear();
                navigateTo("/authentication/login");
            }
            if (result && result.errors && result.errors.length > 0) {
                for (const item of result.errors) {
                    this.notificationService.error(item);
                }
                onComplete(result);
            } else if (result !== null) {
                onComplete(result);
            } else {
                this.notificationService.error('خطای سیستمی. لطفا به راهبر سیستم گزارش شود.');
                onComplete(null);
            }

            onComplete(null);
        });
    }

    static getLoggedUserInfo() {
        return JSON.parse(<string>localStorage.getItem('logged-user'));
    }
}