<script setup lang="ts">
import { useStore } from '@/store'
import { useMessage } from '@/utils'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  text: string,
  name: string,
  to?: string
}
const props = withDefaults(defineProps<Props>(), {
  text: '',
  name: 'MenuItem',
  to: '/index'
})
const emits = defineEmits(['click'])

const router = useRouter()
const global = useStore()
const $message = useMessage()

let isSelected = ref(props.name === global.selectedItemName)
watch(() => global.selectedItemName, (newVal) => {
  isSelected.value = (props.name === newVal)
})

function handleClick() {
  if (props.name === 'logout') {
    $message.success('已退出登录')
    emits('click')
  }
  else {
    global.setSelectedItemName(props.name)
    router.push(props.to)
  }
}

</script>

<template>
  <div
    :class="isSelected ? 'selected' : 'unselected'"
    @click="handleClick"
  >
    <div class="menu-item--container">
      <div class="menu-item--content-container">
        <slot />
        <span>{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .menu-item--container {
    height: 2.9rem;
    width: 100%;
    border-left: #FFF solid 3px;
    display: flex;
    align-items: center;
    color: rgb(123, 123, 126);
    cursor: pointer;

    .menu-item--content-container {
      display: flex;
      align-items: center;
      
      span {
        margin-left: .8rem;
        font-size: .9rem;
      }
    }
  }

  .selected {
    background-color: rgb(242, 240, 254);
    border-left: $theme-color solid 3px;
    box-shadow: 0 0 1px 1px rgb(240, 238, 248) inset;

    .menu-item--container {
      padding-left: 1.8rem;
      color: $theme-color;
      transition: background-color linear .15s;
      border: none;
    }
  }

  .unselected {
    transition: background-color linear .15s;

    .menu-item--container {
      padding-left: 1.8rem;
      transition: background-color linear .15s;
    }

    &:hover .menu-item--container {
      background-color: rgb(247, 247, 247);
      border-left: $theme-color solid 3px;
      transition: all linear .15s;
    }
  }
</style>
