<template>
  <div class="flex row">
    <span class="mr-xs" v-text="label"></span>
    <select @input="$emit('input', $event.target.value)">
      <option
        :selected="value === (fieldValue ? item[fieldValue] : item)"
        :value="fieldValue ? item[fieldValue] : item"
        v-for="item of items"
        :key="fieldValue ? item[fieldValue] : item"
        v-text="fieldText ? item[fieldText] : item"
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
    fieldText: String,
    fieldValue: String
  }
};
</script>

<style lang="scss">
  .app-select {

  }
</style>
