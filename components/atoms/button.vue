<template>
  <button
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
import { TweenLite, Power0 } from 'gsap';
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
  methods: {
    onClick (event) {
      if (this.nuxtLink) {
        const doc = document.documentElement;
        TweenLite.to(doc, 1, { ease: Power0.easeNone, rotation: 360, scale: -0.1 });
        TweenLite.to(doc, 1, { ease: Power0.easeNone, rotation: 360, scale: 1, delay: 1 });
        setTimeout(() => {
          this.$router.push(this.nuxtLink);
        }, 800);
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
