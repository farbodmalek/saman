import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker';
import {createApp} from 'vue'

const app = createApp({})

app.use(Vue3PersianDatetimePicker, {
    name: 'DatePicker',
    props: {
        format: 'jYYYY/jMM/jDD',
        displayFormat: 'jYYYY/jMM/jDD',
        editable: true,
        inputClass: 'form-control my-custom-class-name',
        placeholder: 'لطفا یک تاریخ انتخاب کنید',
        altFormat: 'jYYYY/jMM/jDD',
        color: '#36c40f',
        autoSubmit: false,
    }
});
app.component('DatePicker', Vue3PersianDatetimePicker);
app.mount('#app');
