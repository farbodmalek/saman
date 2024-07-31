import {defineStore} from "pinia";

export const loanStore = defineStore('loan', {
    state: () => {
        return {
            loanData: {}
        }
    },

    actions: {
        setLoanData(loanData) {
            this.loanData = loanData;
        },

        getLoanData() {
            return this.loanData;
        }
    }
})