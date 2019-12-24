export default [{
        id: "0",
        name: "商家认证",
        path: "/manager/finance",
        icon: "resource",
        children: [{
                id: 0,
                name: "商家资质审核",
                path: "/manager/aptitude",
                icon: "resource"
            },
            {
                id: 1,
                name: "资质审核通过",
                path: "/manager/pass",
                icon: "resource"
            },
            {
                id: 2,
                name: "资质审核未通过",
                path: "/manager/NoPass",
                icon: "resource"
            }
        ]
    },
    {
        id: "1",
        name: "boss圈",
        path: "/manager/invitation",
        icon: 'resource',
        children: [
            { id: 0, name: "帖子管理", path: '/manager/examine', icon: 'resource', children: [] }
        ]
    },
    {
        id: '2',
        name: '耗材管理',
        path: '/manager/material',
        icon: 'resource',
        children: [
            { id: 1, name: "待接单", path: "/manager/take", icon: "resource" },
            { id: 2, name: "待发货", path: "/manager/deliver", icon: "resource" },
            { id: 3, name: "已完成", path: "/manager/accomplish", icon: "resource" },
            { id: 4, name: "退款", path: "/manager/refunded", icon: "resource" },
            { id: 5, name: "商品管理", path: "/manager/upshop", icon: "resource" },
            { id: 6, name: "活动管理", path: "/manager/activity", icon: "resource" },
            { id: 7, name: " 财务管理", path: "/manager/consumable", icon: "resource" }
        ]
    },
    {
        id: '3',
        name: '商家订单管理',
        path: 'shopOrder',
        icon: 'resource',
        children: [
            { id: 1, name: "订单管理", path: "/manager/orderSystem", icon: "resource" },
            { id: 2, name: "财务管理", path: "/manager/financial", icon: "resource" }
        ]
    },
    {
        id: '4',
        name: '退款管理',
        path: '/manager/refund',
        icon: 'resource',
        children: [
            { id: 1, name: "商家退款", path: "/manager/refundOrder", icon: "resource" }
        ]
    },
    {
        id: '5',
        name: '添加商品类型',
        path: '/manager/addShop',
        icon: 'resource',
        children: [
            { id: 1, name: "添加洗衣类型", path: "/manager/addShopType", icon: "resource" },
            { id: 2, name: "添加耗材类型", path: "/manager/addConsumable", icon: "resource" }
        ]
    },
    {
        id: '6',
        name: '添加广告banner',
        path: '/manager/advertising',
        icon: 'resource',
        children: []
    },

];