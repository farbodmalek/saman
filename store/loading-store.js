import {defineStore} from "pinia";

export const loadingStore = defineStore('loadingMethod', {
    state: () => {
        return {
            isLoading: false,
        }
    },

    actions: {
        getLoadingShow() {
            return this.isLoading = true;
        },

        getLoadingHide() {
            return this.isLoading = false;
        },

        showLoading() {
            return this.isLoading;
        }
    }
})