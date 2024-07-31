import {defineNuxtRouteMiddleware} from "#app";

export default defineNuxtRouteMiddleware(async (to) => {
    if (process.client) {
        const token = localStorage.getItem('logged-user');
        if (!token && to.path != "/authentication/login") {
            localStorage.clear();
            navigateTo("/authentication/login");
        } else if (!token && to.path == "/authentication/login") {
            navigateTo("/authentication/login");
        } else {
            navigateTo("/dashboard");
        }
    }
})
