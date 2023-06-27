<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' //跳转路由到登录页面
import { ElMessage } from 'element-plus'
import {useCartStore} from '@/stores/cartStore'
import 'element-plus/theme-chalk/el-message.css'
// import { loginAPI } from '@/apis/user'  //数据提交登录
import { useUseStore } from '@/stores/user'  //数据获取
const CartStore = useCartStore()
const useStore = useUseStore()
const Router = useRouter()
// 自定义校验规则函数
const validatePass = (rule, value, callback) => {  // 调用callback()就通过规则
  if (value) {
    callback()
  } else {
    callback(new Error('请勾选协议！'))
  }
}
// 自动填写账号密码 
const aotuwrite = () => {
  form.value.account2 = 'admin'
  form.value.password = 'hm#qd@23!'
  form.value.agree = true
}
// 准备标段数据 用于动态绑定输入框
const form = ref({
  account: 'heima290',  //实际提交的
  account2: '',  //显示的
  password: '',
  agree: false
})
// 准备表单验证的规则 用于表单验证数据 大表单绑定rules，大笔表单里面的输入框绑定account和password
const rules = {
  account: [
    { required: true, message: '请输入账号！', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码！', trigger: 'blur' },
    { min: 6, max: 14, message: '密码为6~14位数', trigger: 'blur' },
  ],
  agree: [{ validator: validatePass, }],
}

// 防止用户一上来就点击登录从而错过表单验证
const formRef = ref(null)   //绑定dom
const doLogin = () => {
  const { account, password } = form.value
  formRef.value.validate(async (valid) => {
    // valid 代表所有项表单
    if (valid) {
      // console.log({account: form.value.account,password: form.value.password})
      // const res = await loginAPI({ account, password })
      await useStore.getUserInfo({ account, password })
      // 提示用户
      ElMessage({ type: 'success', message: '登录成功' })
      Router.replace({ path: '/' })  //跳转路由到首页
      // 更新购物车数据
      CartStore.updateNewList()
    } else {
      console.log('请填写数据')
      return false
    }
  })
}
</script>
 
<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form"> 
            <el-form ref="formRef" label-position="right" label-width="60px" :model="form" :rules="rules" status-icon>
              <el-form-item label="账户" prop="account">
                <el-input v-model="form.account2" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" />
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button class="aotu"  @click="aotuwrite">自动填写账号密码</el-button>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
      </div>
    </footer>
  </div>
</template>
 
<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 93px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 1px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  margin-top: 10px;
  width: 100%;
  color: #fff;
}

.aotu {
  height: 40px;
  font-weight: 700;
  color: #fff;
  background: $xtxColor;
  margin-left: 12px !important;
  width: 100%;
  margin-left: 0;
}
</style>