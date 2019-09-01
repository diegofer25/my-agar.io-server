<template>
  <button
    class="app-button"
    :class="buttonClasses"
    @click="$emit('click', $event)"
    v-text="text"
  ></button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    text: String,
    color: {
      type: String,
      default: 'blue'
    },
    fullWidth: Boolean
  },
  computed: {
    buttonClasses () {
      const classes = [];
      if (this.color) {
        classes.push(`bg-${this.color}`);
      }
      if (this.fullWidth) {
        classes.push('full-width');
      }
      return classes;
    }
  },
};
</script>

<style lang="scss">
  .app-button {
    min-height: 30px;
    padding: 5px 20px;
    border: none;
    border-radius: 3px;
    font-size: 20px;
    font-weight: bold;
    &.full-width {
      width: 100%;
    }
    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
    &:active {
      transform: scale(0.95);
    }
    &:focus {
      outline: none;
      border: none;
    }
  }
</style>
