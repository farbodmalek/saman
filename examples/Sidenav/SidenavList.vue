<template>
  <div id="sidenav-collapse-main" class="collapse navbar-collapse w-auto h-auto h-100">

    <ul class="navbar-nav">
      <li class="nav-item" v-for="(item, index) of menu" :key="index">
        <SidenavCollapse
            :is-expanded="item.isExpanded"
            :collapse="item.subMenu && item.subMenu.length > 0"
            :collapse-ref="item.collapseRef"
            :nav-text="item.navText"
            :aria-controls="''"
            :class="getRoute === item.navText ? 'active' : ''"
            :route="item.route"
        >

          <template #icon>
            <i class="text-primary text-sm opacity-10" :class="item.icon"></i>
          </template>

          <template #list v-if="item.subMenu && item.subMenu.length > 0">
            <ul class="nav">
              <template v-for="sub of item.subMenu">
                <SidenavItem
                    @click="onRoute(item)"
                    v-if="!sub.subMenu"
                    :to="sub.route"
                    mini-icon="L"
                    :text="sub.navText"/>

                <SidenavCollapseItem
                    v-if="sub.subMenu && sub.subMenu.length > 0"
                    refer="vrExamples"
                    mini-icon="V"
                    :text="sub.navText">
                  <template #nav-child-item>
                    <SidenavItem
                        v-for="s of sub.subMenu"
                        class="me-4"
                        :to="s.route"
                        mini-icon="V"
                        :text="s.navText"/>
                  </template>
                </SidenavCollapseItem>
              </template>
            </ul>
          </template>

        </SidenavCollapse>
      </li>
    </ul>

  </div>
</template>

<script setup>
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";
import SidenavItem from "./SidenavItem.vue";
import {useNavStore} from "~~/store/NavStore";

const navStore = useNavStore();

const sidenavType = computed(() => {
  return navStore.sidenavType === "bg-white" ? "text-dark" : "text-white";
});
const getRoute = computed(() => {
  const route = useRoute();
  return route.path.split("/")[1];
});
defineProps({
  isRTL: {
    type: Boolean,
    default: false,
  },
});

const menu = ref([
  // {
  //   collapseRef: 'default',
  //   navText: "تعاریف",
  //   icon: 'ni ni-shop',
  //   route: '/'
  // },
  {
    collapseRef: 'applicationsExamples',
    navText: "امنیت",
    icon: 'ni ni-ui-04',
    subMenu: [
      {
        route: '/security/users',
        navText: 'مدیریت کاربران'
      },
      {
        route: '',
        navText: 'مدیریت شعب',
      },
      {
        route: '/security/systemDefinition',
        navText: 'تعاریف سیستم',
      },
      {
        route: '/security/menu-list',
        navText: 'تعریف منو ها',
      },
      {
        route: '',
        navText: 'تعریف دسترسی ها',
      },
      {
        route: '/security/changePass',
        navText: 'تغییر رمز',
      },
      {
        route: '/security/roles',
        navText: 'مدیریت نقش ها',
      },
    ]
  },
  {
    icon: 'ni ni-shop',
    collapseRef: 'applicationsExamples',
    navText: "پرونده های نظارت",
    subMenu: [
      {
        route: '',
        navText: 'نقشه'
      },
      {
        route: '/survey/monitoring-list/1',
        navText: 'پرونده های جهت ارجاع',
      },
      {
        route: '/survey/monitoring-list/3',
        navText: 'پرونده های جهت ارجاع(بین مرحله ای)',
      },
      {
        route: '/survey/monitoring-list/2',
        navText: 'پرونده های ارجاع شده',
      },
      {
        route: '',
        navText: 'مدیریت قیود پرونده های نظارت',
      },
      {
        route: '/survey/monitoring-list/4',
        navText: 'پرونده های نظارت شده',
      },
      {
        route: '/survey/wageList',
        navText: 'لیست حق الزحمه',
      },
      {
        route: '/survey/mngSubject',
        navText: 'مدیریت عنوان طرح موضوع قرارداد',
      },
      {
        route: '/survey/monitoring-list/0',
        navText: 'پرونده های ملزم به نظارت',
      },
    ]
  },
  {
    icon: 'ni ni-shop',
    collapseRef: 'applicationsExamples',
    navText: "پرونده های پیگیری",
    subMenu: [
      {
        route: '/loan/all',
        navText: 'همه پرونده های تسهیلاتی'
      },
      {
        route: '',
        navText: 'پرونده های در جریان',
      },
      {
        route: '',
        navText: 'پرونده های موارد استثناء',
      },
      {
        route: '',
        navText: 'پرونده های جهت ارجاع به کارشناس',
      },
      {
        route: '',
        navText: 'پرونده های جهت ارجاع به نیروی شرکتی',
      },
      {
        route: '',
        navText: 'پرونده های ارجاع شده',
      },
      {
        route: '',
        navText: 'پرونده های ارجاع شده به کاربر',
      },
      {
        route: '/mp/wage/set',
        navText: 'ثبت فیش حق السعی',
      },
      {
        route: '/mp/wage/list',
        navText: 'لیست حق السعی',
      },
      {
        route: '/mp/loan/actorPursuit',
        navText: 'لیست ارجاعات اقدام کننده ها',
      },
    ]
  },
  {
    icon: 'ni ni-shop',
    route: '/mp/customers',
    navText: 'مشتریان',
  },
  {
    icon: 'ni ni-shop',
    route: '/mp/oraclesqldifference',
    navText: 'اختلاف نگین و وصول مطالبات',
  },
  {
    icon: 'ni ni-shop',
    route: '/applications/wizard',
    navText: 'تنظیمات',
  },
]);
const route = useRoute();

const getExpandMenu = () => {
  menu.value.forEach((p) => {
    if (p.subMenu && p.subMenu.length > 0) {
      p.subMenu.forEach(x => {
        if (x.route === route.path) {
          p.isExpanded = true;
        }
      });
    }
  });
}

const onRoute = (item) => {
  // console.log(item)
  item.isExpanded = true;
}

onMounted(() => {
  getExpandMenu();
})
</script>
