<template>
  <div class="flex row">
    <span class="mr-xs" v-text="label"></span>
    <select :value="value" @input="$emit('input', $event.target.value)">
      <option
        :selected="value === (field ? item[field] : item)"
        v-for="item of items"
        :key="item"
        v-text="field ? item[field] : item"
      ></option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'app-select',
  props: {
    label: String,
    items: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number, () => {}]
    },
    field: String
  }
};
</script>

<style lang="scss">
  .app-select {

  }
</style>
