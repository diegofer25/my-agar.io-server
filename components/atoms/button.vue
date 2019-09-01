<template>
  <nuxt-link :to="nuxtLink">
    <button
      class="app-button"
      :class="buttonClasses"
      @click="$emit('click', $event)"
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
  </nuxt-link>
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
      return classes;
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
    }
    &:focus {
      outline: none;
      border: none;
    }
    span {
      padding: 10px 0;
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>
