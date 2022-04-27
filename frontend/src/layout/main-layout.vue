<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IconHome,
  IconBook,
  IconExport,
  IconImport,
  IconUnorderedList,
  IconComputer,
  IconPrinter,
  IconPlusCircle,
  IconPoweroff,
  IconUser,
  IconCaretDown
} from '@arco-design/web-vue/es/icon'
import { useUserStore } from '@/store/user'

const router = useRouter()

const userInfo = useUserStore()
let showTitleBar = ref(false)
let contentTitle = ref('Title')

function logout() {
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <div class="side-bar-header">
      <div class="title-box">
        <span>图书馆管理系统</span>
      </div>
    </div>
    <aside class="side-bar-box">
      <div class="side-bar">
        <menu-item
          text="首页"
          name="index"
          to="/"
        >
          <icon-home size="large" />
        </menu-item>
        <div class="divider" />
        <div id="books-manage">
          <div class="side-bar-title">
            <span>图书管理</span>
          </div>
          <div>
            <menu-item
              text="全部图书"
              name="all-books"
              to="/books"
            >
              <icon-book size="large" />
            </menu-item>
            <menu-item
              text="借出登记"
              name="lend-books"
              to="/books/lend"
            >
              <icon-export size="large" />
            </menu-item>
            <menu-item
              text="归还登记"
              name="return-books"
              to="/books/return"
            >
              <icon-import size="large" />
            </menu-item>
          </div>
        </div>
        <div class="divider" />
        <div id="fine-manage">
          <div class="side-bar-title">
            <span>罚款管理</span>
          </div>
          <div>
            <menu-item
              text="罚款记录"
              name="all-fines"
              to="/fines"
            >
              <icon-unordered-list size="large" />
            </menu-item>
            <menu-item
              text="缴纳罚款"
              name="pay-fine"
              to="/pay-fine"
            >
              <icon-computer size="large" />
            </menu-item>
          </div>
        </div>
        <div class="divider" />
        <div id="publisher-manage">
          <div class="side-bar-title">
            <span>出版商管理</span>
          </div>
          <div>
            <menu-item
              text="全部出版商"
              name="all-publishers"
              to="/publishers"
            >
              <icon-printer size="large" />
            </menu-item>
            <menu-item
              text="订购图书"
              name="purchase"
              to="/purchase"
            >
              <icon-plus-circle size="large" />
            </menu-item>
          </div>
        </div>
        <div class="divider" />
        <div id="logout">
          <div class="side-bar-title">
            <span>操作</span>
          </div>
          <div>
            <menu-item
              text="退出登录"
              name="logout"
              @click="logout"
            >
              <icon-poweroff size="large" />
            </menu-item>
          </div>
        </div>
      </div>
    </aside>
    <header class="header-box">
      <div class="user-box">
        <div class="dropdown-box">
          <div class="info-box">
            <a-avatar
              :style="{ backgroundColor: 'rgb(127, 99, 244)' }"
              :size="36"
            >
              <IconUser />
            </a-avatar>
            <span style="cursor: default;">{{ userInfo.name }}</span>
            <icon-caret-down size="large" />
          </div>
          <div class="dropdown">
            <div class="dropdown-item">
              <div
                class="dropdown-content"
                @click="logout"
              >
                <icon-poweroff size="large" />
                <span>退出登录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main
      ref="page"
      class="content-box"
    >
      <div
        v-if="showTitleBar"
        class="content-title"
      >
        <span>{{ contentTitle }}</span>
      </div>
      <div class="page-box">
        <div class="page">
          <RouterView />
        </div>
        <div class="copyright">
          <span>2022 &copy; wangsz12</span>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  $side-bar-width: 13.5rem;
  $header-height: 3.8rem;

  .container {
    height: max-content;
    min-height: 100%;
    // height: 100%;
    width: 100%;
    display: flex;
    background-color: rgb(243, 247, 250);

    .divider {
      height: 1px;
      width: 85%;
      background-color: rgb(236, 236, 236);
      margin: .8rem auto .4rem auto;
    }

    .side-bar-header {
      height: $header-height;
      width: $side-bar-width;
      background-color: $theme-color;
      box-shadow: 0 0 .5px .5px $theme-color;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      z-index: 999;

      .title-box {
        display: flex;

        span {
          color: white;
          display: inline-flex;
          align-items: center;
          font-size: 1.1rem;
        }
      }
    }

    .side-bar-box {
      height: calc(100% - 3.8rem);
      width: $side-bar-width;
      position: fixed;
      top: $header-height;
      overflow: auto;
      background-color: #fff;
      z-index: 999;
      box-shadow: 0 0 .2px .2px rgba(0, 0, 0, 0.1);

      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar,
      &::-webkit-scrollbar-thumb {
        display: none;
      }

      .side-bar {
        // height: calc(max-content - 4rem);
        width: 100%;
        padding: {
          top: .5rem;
          bottom: 1rem;
        }
        z-index: 999;

        .side-bar-title {
          height: 2rem;
          display: flex;
          align-items: center;

          span {
            margin-left: 1.8rem;
            color: rgb(174, 173, 177);
            font-size: .8rem;
          }
        }
      }
    }

    .header-box {
      height: $header-height;
      width: calc(100% - 13rem);
      display: flex;
      align-items: center;
      position: fixed;
      left: $side-bar-width;
      background-color: #fff;
      z-index: 999;
      box-shadow: 0 0 .2px .2px rgba(0, 0, 0, 0.1);

      .user-box {
        // height: 100%;
        display: flex;
        align-items: center;
        position: absolute;
        right: 2rem;
        top: calc(($header-height - 48px) / 2);
        min-width: 10rem;

        .dropdown-box {
          font-size: 1rem;
          width: 100%;
          position: relative;

          .info-box {
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: .5rem;

            span:nth-child(2) {
              // height: 100%;
              padding-left: .8rem;
              padding-right: .5rem;
              line-height: 1.9rem;
            }
          }

          &:hover .dropdown {
            display: block;
            animation: dropdown-list .3s ease;
          }

          .dropdown {
            width: 100%;
            background-color: #FFF;
            border-radius: 7px;
            box-shadow: 1px 1.5px 10px -5px $theme-color;
            padding: .5rem 0;
            display: none;

            .dropdown-item {
              height: 2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background-color linear .15s;

              &:hover {
                background-color: rgb(242, 240, 254);
                transition: background-color linear .15s;
                cursor: pointer;
                color: $theme-color;
              }

              .dropdown-content {
                font-size: .9rem;
                display: flex;
                align-items: center;

                span:nth-child(2) {
                  padding-left: 1rem;
                }
              }
            }
          }
        }
      }
    }

    .content-box {
      height: calc(100% - 3.8rem);
      width: calc(100% - 13.5rem);
      position: fixed;
      right: 0;
      bottom: 0;
      overflow: {
        x: hidden;
        y: auto;
      }

      .content-title {
        height: 3rem;
        width: 100%;
        background-color: rgb(232, 231, 249);
        display: flex;
        align-items: center;
        padding-left: 1.5rem;
        color: rgb(115, 97, 211);
        font-size: 1.1rem;
      }

      .page-box {
        // width: 100%;
        padding: 2rem;

        .copyright {
          text-align: center;
          color: rgb(150, 150, 150);
          margin-top: 1.5rem;
        }
      }
    }
  }

  @keyframes dropdown-list {
    from {
      transform: translateY(-7px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
