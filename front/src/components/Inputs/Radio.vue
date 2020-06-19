<template>
  <div :class="[inlineClass, {disabled: disabled}]" class="form-check form-check-radio">
    <label :for="cbId" class="form-check-label">
      <input
        :id="cbId"
        v-model="model"
        :disabled="disabled"
        :value="label"
        class="form-check-input"
        type="radio"
      >
      <span class="form-check-sign" />
      <slot />
    </label>
  </div>
</template>
<script>
export default {
  name: 'NRadio',
  props: {
    label: [String, Number],
    disabled: Boolean,
    value: [String, Boolean],
    inline: Boolean
  },
  data() {
    return {
      cbId: ''
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    inlineClass() {
      if (this.inline) {
        return `form-check-inline`
      }
      return ''
    }
  },
  created() {
    this.cbId = Math.random().toString(16).slice(2)
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/assets/sass/now-ui-kit/variables";
  @import "~@/assets/sass/now-ui-kit/checkboxes-radio";
</style>
