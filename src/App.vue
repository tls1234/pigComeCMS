<template>
    <router-view></router-view>
</template>

<script>
export default {
    data(){
        return {
            index : "manager "
        }
    },
    created(){
        this.showPage();
    },
    methods : {
        async showPage(){
            // debugger;
            const that = this;
            const {path} = that.$route;
            if(path === '/') {
                that.$router.replace({ path: "/manager" });
            }else {
                that.$router.replace({ path });
            }
            // this.$api("typeStatus",{params:{status:"2"}}).then(res => {
            //     // 已登录
            //     const { path } = that.$route;
            //     if(res.data.retCode == 200) {
            //         // debugger;
                    
            //         }
            //     }else {
            //         that.$router.replace({ path: "/manager" });
            //     }
            // // const { token } = res;
            // // localStorage.setItem('token', token);
            // }).catch(error => {
            //     this.$message({
            //         message: '接口错误，请刷新页面',
            //         center: true
            //     });
            // });
        }
    }
}
</script>

<style lang="less" scoped>
    
</style>