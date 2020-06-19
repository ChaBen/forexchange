<template>
  <div
    :class="`progress-${type}`"
    class="progress-container progress-base"
  >
    <span class="progress-badge">
      <slot name="label">
        {{ label }}
      </slot>
    </span>
    <div :style="`height: ${height}px`" class="progress">
      <div
        :class="computedClasses"
        :aria-valuenow="value"
        :style="`width: ${value}%;`"
        class="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <slot>
          <span v-if="showValue" class="progress-value">
            {{ value }}%
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NProgress',
  props: {
    striped: Boolean,
    showValue: Boolean,
    animated: Boolean,
    label: String,
    height: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: 'default'
    },
    value: {
      type: Number,
      default: 0,
      validator: (value) => {
        return value >= 0 && value <= 100
      }
    }
  },
  computed: {
    computedClasses() {
      return [{ 'progress-bar-striped': this.striped }, { 'progress-bar-animated': this.animated }]
    }
  }
}
</script>
<style>
</style>
