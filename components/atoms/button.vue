<template>
  <button
    :disabled="disabled"
    class="app-button"
    :class="buttonClasses"
    @click="onClick"
  >
    <div class="flex row nowrap">
      <div v-if="icon" class="flex-item grow">
        <div class="flex row align-items-center fill-height">
          <i class="material-icons mr-xs" v-text="icon"></i>
        </div>
      </div>
      <div class="flex-item grow">
        <div class="flex row justify-center">
          <span v-text="text"></span>
        </div>
      </div>
    </div>
  </button>
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
    disabled: Boolean,
    fullWidth: Boolean,
    icon: String,
    nuxtLink: String
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
      if (this.disabled) {
        classes.push('disabled');
      }
      return classes;
    }
  },
  methods: {
    onClick (event) {
      if (this.nuxtLink) {
        this.$router.push(this.nuxtLink);
      } else {
        this.$emit('click', event);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .app-button {
    min-height: 30px;
    padding: 0 20px;
    border: none;
    border-radius: 3px;
    &.full-width {
      width: 100%;
    }
    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
    &:active {
      transform: scale(0.95);
      box-shadow: inset 0 0 14px 0px rgba(0, 0, 0, 0.5);
    }
    &:focus {
      outline: none;
      border: none;
    }
    &.disabled {
      background-color: lightgray;
      color: grey;
      &:active {
        transform: scale(1);
        box-shadow: none;
      }
      &:hover {
        opacity: 1;
        cursor: not-allowed;
      }
    }
    span {
      padding: 10px 0;
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>
