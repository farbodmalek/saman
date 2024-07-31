import {toast, ToastTheme} from "vue3-toastify";

export class ToastNotificationService {
    static error(text: string, position = toast.POSITION.TOP_CENTER, transition = toast.TRANSITIONS.ZOOM, theme: ToastTheme = 'colored') {
        toast.error(text, {
            position: position,
            transition: transition,
            theme: theme,
            rtl: true,
        });
    }

    static success(text: string, position = toast.POSITION.TOP_CENTER, transition = toast.TRANSITIONS.ZOOM, theme: ToastTheme = 'colored') {
        toast.success(text, {
            position: position,
            transition: transition,
            theme: theme,
            rtl: true,
        });
    }

    static info(text: string, position = toast.POSITION.TOP_CENTER, transition = toast.TRANSITIONS.ZOOM, theme: ToastTheme = 'colored') {
        toast.info(text, {
            position: position,
            transition: transition,
            theme: theme,
            rtl: true,
        });
    }

    static warn(text: string, position = toast.POSITION.TOP_CENTER, transition = toast.TRANSITIONS.ZOOM, theme: ToastTheme = 'colored') {
        toast.warning(text, {
            position: position,
            transition: transition,
            theme: theme,
            rtl: true,
        });
    }

    static dark(text: string, position = toast.POSITION.TOP_CENTER, transition = toast.TRANSITIONS.ZOOM) {
        toast.dark(text, {
            position: position,
            transition: transition,
            rtl: true,
        });
    }
}