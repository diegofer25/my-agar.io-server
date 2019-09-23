<template>
  <div class="color-picker flex row my-sm">
    <div class="flex-item grow">
      <span v-text="label"></span>
    </div>
    <input class="input ml-sm" @input="$emit('input', $event.target.value)" type="color">
  </div>
</template>

<script>
export default {
  name: 'colorpicker',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
.color-picker {
  .input {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
