<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// import { APIResult } from '@/config/types'
import {
  IconUser,
  IconUnlock
} from '@arco-design/web-vue/es/icon'
import { useMessage } from '@/utils'

const router = useRouter()
const $message = useMessage()

interface Credentials {
  username: string,
  password: string
}

let credentials = reactive({
  username: '',
  password: ''
})
let logining = ref(false)

function login(credentials: Credentials) {
  console.log('credentials: ', credentials)
  localStorage.setItem('token', 'token')
  return Promise.resolve()
}

function loginBtnHdl() {
  if (credentials.username === '') {
    $message.error('请输入用户名')
    return
  }
  if (credentials.password === '') {
    $message.error('请输入密码')
    return
  }

  logining.value = true
  login(credentials)
    .then(() => {
      $message.success('登录成功')
      router.push('/')
    })
    .catch((err: Error) => {
      $message.error(err.message)
    })
    .finally(() => {
      logining.value = false
    })
}

</script>

<template>
  <div class="container">
    <div class="img-box">
      <img src="@/assets/login.png">
    </div>
    <div class="content-box">
      <div class="logo-box">
        <span>图书馆管理系统</span>
      </div>
      <div class="login-box">
        <div class="title-box">
          <span>登录</span>
        </div>
        <div class="input-box">
          <input
            v-model="credentials.username"
            type="text"
            required
            class="input"
            title=""
          >
          <icon-user
            class="prefix-icon"
            size="large"
          />
          <div class="underline" />
          <label>用户名</label>
        </div>
        <div class="input-box">
          <input
            v-model="credentials.password"
            type="password"
            required
            class="input"
            title=""
          >
          <icon-unlock
            class="prefix-icon"
            size="large"
          />
          <div class="underline" />
          <label>密码</label>
        </div>
        <div class="login-btn-box">
          <a-button
            type="primary"
            :loading="logining"
            class="login-btn"
            @click="loginBtnHdl"
          >
            登录
          </a-button>
        </div>
      </div>
      <div class="copyright">
        <span>2022 © wangsz12</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    width: 100vw;
    display: flex;

    .img-box {
      height: 100%;
      width: 55%;
      background-color: $theme-color;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .content-box {
      height: 100%;
      width: 45%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo-box {
        position: absolute;
        left: 8rem;
        top: 3rem;

        span {
          margin-left: 1rem;
          font-size: 1.5rem;
          font-weight: 500;
          vertical-align: middle;
        }
      }

      .login-box {
        width: 60%;

        .title-box {
          height: 3rem;
          margin-left: 1rem;

          span {
            font-size: 2rem;
            font-weight: bold;
          }
        }

        .input-box {
          height: 3rem;
          width: 100%;
          position: relative;
          margin-top: 4rem;
            display: flex;
            align-items: center;

          .input {
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            border: none;
            border-bottom: 2px solid silver;
            padding: 1rem 2.7rem;
            font-size: 1.2rem;
            outline: none;

            &:focus, &:valid {
              // border-bottom-color: $theme-color;
              box-shadow: none;

              & ~ label {
                transform: translate(-2.5rem, -2rem);
                font-size: 1.1rem;
                color: $theme-color;
              }

              & ~ .underline:before {
                transform: scaleX(1);
              }
            }
          }

          label {
            position: absolute;
            bottom: 1rem;
            left: 2.7rem;
            color: grey;
            pointer-events: none;
            font-size: 1.1rem;
            transition: all .3s ease;
          }

          .underline {
            position: absolute;
            bottom: 0.5px;
            height: 2px;
            width: 100%;

            &:before {
              content: "";
              position: absolute;
              height: 100%;
              width: 100%;
              background-color: $theme-color;
              transform: scaleX(0);
              transition: transform .3s ease;
            }
          }

          .prefix-icon {
            position: absolute;
            bottom: 1rem;
            left: .8rem;
            font-size: 1.1rem;
          }
        }
      }


      .login-btn-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5rem;

        .login-btn {
          height: 2.8rem;
          width: 15rem;
          font-size: 1.2rem;
        }
      }

      .copyright {
        position: absolute;
        bottom: 3rem;
        text-align: center;
        font-size: .9rem;
        color: grey;
      }
    }
  }
</style>
