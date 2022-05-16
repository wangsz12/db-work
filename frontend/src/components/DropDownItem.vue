<script setup lang="ts">
interface Props {
  text: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
})
const emits = defineEmits(['click'])
</script>

<template>
  <div
    class="dropdown-item"
    @click="emits('click')"
  >
    <div class="dropdown-content">
      <slot />
      <span>{{ props.text }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .dropdown-item {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color linear .15s;
    padding: 3px 0;

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
        padding-left: 10px;
      }
    }
  }
</style>
