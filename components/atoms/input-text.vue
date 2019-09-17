<template>
  <div class="input-text flex row my-sm fill-width">
    <span class="label" :class="{ focus }" v-text="label" />
    <input class="input" type="text" @input="$emit('input', $event.target.value)" @focus="onFocus" @blur="onBlur">
  </div>
</template>

<script>
export default {
  name: 'input-text',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    focus: false
  }),
  methods: {
    onFocus () {
      this.focus = true;
    },
    onBlur () {
      if (!this.value) {
        this.focus = false;
        console.log(this.value);
      }
    }
  },
};
</script>

<style scoped lang="scss">
.input-text {
  position: relative;
  .label {
    position: absolute;
    bottom: 2px;
    &.focus {
      top: -20px;
    }
  }
  .input {
    z-index: 1;
    color: white;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-bottom: 1px white;
    &:focus {
      outline: none;
    }
  }
}
</style>
