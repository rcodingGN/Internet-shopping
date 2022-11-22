<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>格力董明珠店欢迎您！</p>
                    <!-- 未登录 -->
                    <p v-if="!userName">
                        <span>请</span>
                        <!-- 声明式导航：务必要有to属性 -->

                        <router-link to="/login">登录</router-link>
                        <router-link class="register" to="/register">免费注册</router-link>
                    </p>
                    <!-- 已登录 -->
                    <p v-else>
                        <a>{{userName}}</a>
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/ShopCart">我的购物车</router-link>
                    <a href="###">我的格力</a>
                    <a href="###">格力会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注格力</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" to="/home">
                    <img src="https://gelimall.oss-cn-shenzhen.aliyuncs.com/album/2020/4/2/86f141a8-3876-4568-86f0-3c343430775c.gif" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'ShopHeader',
    data() {
        return {
            keyword: '',
        }
    },
    methods: {
        // 搜索按钮的回调函数，需要向search路由跳转
        goSearch() {
            // 路由传递参数
            // 第一种：字符串形式
            // this.$router.push('/search/' + this.keyword + "?k=" + this.keyword.toUpperCase());
            // 第二种：模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`);
            // 第三种：对象
            // this.$router.push({
            //     name: "search",
            //     params: { keyword: this.keyword },
            //     query: { k: this.keyword.toUpperCase() }
            // })

            /* *********************************************************************************************** */
            // 面试题1：路由传递参数（对象写法）path是否可以结合params参数一起使用?
            // 答：路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用，否则程序会崩溃
            // this.$router.push({path: '/search',params: { keyword: this.keyword },query: { k: this.keyword.toUpperCase() }})

            // 面试题2：如何指定params参数可传可不传? 
            /* 答：在配置路由的时候，如果占位了（params参数），但是路由跳转的时候就不传递。路径就会出现问题
            如果路由要求传递params参数，但是就不传递params参数，会发现url有问题 */
            // 如何指定params参数可传递或不传递？
            /* 在配置路由的时候，在占位符后面加上一个问号，代表params可传可不传*/
            // this.$router.push({ name: 'search', query: { k: this.keyword.toUpperCase() } })

            // 面试题3：params参数可传也可不传，但是如果传递是空串，如何解决？
            /* 答：使用undefined解决params参数传递带空串的问题 */
            // this.$router.push({ name: 'search', params: { keyword: '' || undefined }, query: { k: this.keyword.toUpperCase() } })

            // 面试题4：路由组件能不能传递props数据?  可以的，三种写法  布尔值写法、对象写法、函数写法
            // this.$router.push({ name: 'search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() } })
            // console.log(this.$router);

            // 从根源上解决问题，重写push|replace
            if (this.$route.query) {
                let location = { name: 'search', params: { keyword: this.keyword || undefined } };
                location.query = this.$route.query;
                this.$router.push(location)
            }
        },
        // 退出登录
        async logout() {
            /* 
                退出登录的步骤：
                1、发请求，通知服务器退出登录（销毁token）
                2、清楚项目当中的信息（userinfo、token）
             */
            try {
                await this.$store.dispatch("userLogout");
                this.$router.push('/home')
            } catch (error) {
                alert(error.message)
            }

        }
    },
    mounted() {
        // 通过全局事件总线清楚搜索关键字
        this.$bus.$on('clear', () => {
            this.keyword = '';
        });
        // 获取用户信息
        // this.$store.dispatch('getUserInfo');
    },
    computed: {
        // 用户名信息
        userName() {
            return this.$store.state.user.userInfo.nickName;
        }
    },
}
</script>

<style lang="less" scoped>
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>