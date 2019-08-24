import Vue from 'vue';
import Router from 'vue-router';
// import { resolve } from 'upath';

// 按需加载组件，在需要的时候才加载组件
import App from '@/App';
const Manager = () =>
    import ('@/pages/manager' /* webpackChunkName: "pages/manager" */ ).then(m => m.default || m)
const Login = () =>
    import ('@/pages/login' /* webpackChunkName: "pages/login" */ ).then(m => m.default || m)
    // const Fanance = () =>
    //     import ('@/pages/finance/finance' /* webpackChunkName: "pages/finance/finance" */ ).then(m => m.default || m)
const Aptitude = () =>
    import ('@/pages/finance/aptitude' /* webpackChunkName: "pages/finance/aptitude" */ ).then(m => m.default || m)
const Pass = () =>
    import ('@/pages/finance/pass' /* webpackChunkName: "pages/finance/pass" */ ).then(m => m.default || m)
const NoPass = () =>
    import ('@/pages/finance/NoPass' /* webpackChunkName: "pages/finance/NoPass" */ ).then(m => m.default || m)
    // const Invitation = () =>
    //     import ('@/pages/invitation/invitation' /* webpackChunkName: "pages/invitation/invitation" */ )
const Examine = () =>
    import ('@/pages/invitation/examine' /* webpackChunkName: "pages/invitation/examine" */ ).then(m => m.default || m)
const Accomplish = () =>
    import ('@/pages/Material/accomplish' /* webpackChunkName: "pages/Material/accomplish" */ ).then(m => m.default || m)
const Activity = () =>
    import ('@/pages/Material/activity' /* webpackChunkName: "pages/Material/activity" */ ).then(m => m.default || m)
const Deliver = () =>
    import ('@/pages/Material/deliver' /* webpackChunkName: "pages/Material/deliver" */ ).then(m => m.default || m)
const Refunded = () =>
    import ('@/pages/Material/refunded' /* webpackChunkName: "pages/Material/refunded" */ ).then(m => m.default || m)
const Take = () =>
    import ('@/pages/Material/take' /* webpackChunkName: "pages/Material/take" */ ).then(m => m.default || m)
const Upshop = () =>
    import ('@/pages/Material/upshop' /* webpackChunkName: "pages/Material/upshop" */ ).then(m => m.default || m)
const Consumable = () =>
    import ('@/pages/Material/consumable' /* webpackChunkName: "pages/Material/consumable" */ ).then(m => m.default || m)
const Financial = () =>
    import ('@/pages/shopOrder/financial' /* webpackChunkName: "pages/shopOrder/financial" */ ).then(m => m.default || m)
const OrderSystem = () =>
    import ('@/pages/shopOrder/orderSystem' /* webpackChunkName: "pages/shopOrder/orderSystem" */ ).then(m => m.default || m)
const RefundOrder = () =>
    import ('@/pages/refund/refundOrder' /* webpackChunkName: "pages/refund/refundOrder" */ ).then(m => m.default || m)
const AddShopType = () =>
    import ('@/pages/addShop/addShopType' /* webpackChunkName: "pages/addShop/addShopType" */ ).then(m => m.default || m)
const AddConsumable = () =>
    import ('@/pages/addShop/addConsumable' /* webpackChunkName: "pages/addShop/addConsumable" */ ).then(m => m.default || m)
const Advertising = () =>
    import ('@/pages/advertising/advertising' /* webpackChunkName: "pages/advertising/advertising" */ ).then(m => m.default || m)
const page404 = () =>
    import ('@/pages/error/404' /* webpackChunkName: "/pages/error/404" */ ).then(m => m.default || m)
Vue.use(Router);

// 路由后记住滚动条的位置
const scrollBehavior = (to, from, savedPosition) => {
        // SavedPosition is only available for popstate navigations.
        if (savedPosition) {
            return savedPosition
        } else {
            let position = {}
                // If no children detected
            if (to.matched.length < 2) {
                // Scroll to the top of the page
                position = { x: 0, y: 0 }
            } else if (to.matched.some((r) => r.components.default.scrollToTop)) {
                // If one of the children has scrollToTop option set to true
                position = { x: 0, y: 0 }
            }
            // If link has anchor, scroll to anchor by returning the selector
            if (to.hash) {
                position = { selector: to.hash }
            }
            return position
        }
    }
    // 注册路由
const router = new Router({
    mode: 'history',
    base: '/sangjie/panel/', //项目的根名称 如：localhost:3000/sangjie/panel/index
    linkActiveClass: 'b-link-active',
    linkExactActiveClass: 'b-c-link-active',
    scrollBehavior,
    routes: [{
        name: '/',
        path: '/',
        component: App,
        children: [
            { name: 'login', path: 'login', component: Login },
            {
                name: 'manager',
                path: 'manager',
                component: Manager,
                children: [
                    { name: 'finance', path: '/manager/finance', component: Aptitude },
                    { name: 'finance-aptitude', path: '/manager/aptitude', component: Aptitude },
                    { name: 'finance-pass', path: '/manager/pass', component: Pass },
                    { name: 'finance-NoPass', path: '/manager/NoPass', component: NoPass },
                    { name: 'invitation-examine', path: '/manager/examine', component: Examine },
                    { name: 'material-take', path: '/manager/take', component: Take },
                    { name: 'material-accomplish', path: '/manager/accomplish', component: Accomplish },
                    { name: 'material-activity', path: '/manager/activity', component: Activity },
                    { name: 'material-deliver', path: '/manager/deliver', component: Deliver },
                    { name: 'material-refunded', path: '/manager/refunded', component: Refunded },
                    { name: 'material-upshop', path: '/manager/upshop', component: Upshop },
                    { name: 'material-consumable', path: '/manager/consumable', component: Consumable },
                    { name: 'shopOrder', path: '/manager/shopOrder', component: OrderSystem },
                    { name: 'shopOrder-orderSystem', path: '/manager/orderSystem', component: OrderSystem },
                    { name: 'shopOrder-financial', path: '/manager/financial', component: Financial },
                    { name: 'refund', path: '/manager/refund', component: RefundOrder },
                    { name: 'refund-refundOrder', path: '/manager/RefundOrder', component: RefundOrder },
                    { name: 'addShop-addShopType', path: '/manager/addShopType', component: AddShopType },
                    { name: 'addShop-addConsumable', path: '/manager/AddConsumable', component: AddConsumable },
                    { name: 'advertising-advertising', path: '/manager/advertising', component: Advertising },
                ]
            },
            { name: '404', path: '/*', component: page404 }
        ]
    }]
});

/**
 * 路由守卫，用于拦截路由跳转
 * to   从哪儿来
 * from 到哪儿去
 * next 必须执行才能路由过去
 */
router.beforeEach((to, from, next) => {
    // debugger;
    // console.log(to);
    // console.log(from);
    // debugger;
    clearInterval(this.timer)
    next()
});
export default router