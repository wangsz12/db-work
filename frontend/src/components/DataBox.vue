<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title: string,
  value: number | string,
  clickTo?: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  value: -1,
  clickTo: ''
})

const router = useRouter()

function handleClick() {
  if (props.clickTo !== '') {
    router.push(props.clickTo)
  }
}
</script>

<template>
  <div
    class="data-box--container"
    @click="handleClick"
  >
    <div class="icon-box">
      <i class="icon">
        <slot />
      </i>
    </div>
    <div class="title">
      {{ props.title }}
    </div>
    <div class="value">
      {{ props.value === -1 ? 'loading' : props.value }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .data-box--container {
    @extend .component;

    width: 11rem;
    transition: color .2s ease;
    // transition: transform .4s ease;
    text-align: center;

    &:hover {
      cursor: pointer;
      color: $theme-color;
      // transform: translateY(-3px);
      transition: color .2s ease;
      // transition: transform .4s ease;
    }

    .icon-box {
      height: 3rem;
      width: auto;
      position: relative;
      z-index: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;

        &:after {
          content: "";
          position: absolute;
          background-color: rgb(238, 238, 238);
          height: 3rem;
          width: 3rem;
          z-index: -1;
          border-radius: 50%;
        }
      }
    }

    .title {
      margin: {
        top: .8rem;
        bottom: .5rem;
      }
      font-size: .9rem;
    }

    .value {
      font-size: 1.5rem;
      font-weight: bold;
      font-family: -apple-system, 'OpenSans', sans-serif;
    }
  }
</style>
