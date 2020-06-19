<template>
  <component :is="componentTag" :class="`badge-${type}`" :href="href" class="n-badge">
    <slot />
  </component>
</template>
<script>
export default {
  name: 'Badge',
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    href: String,
    type: {
      type: String,
      default: 'default',
      validator: (value) => {
        const acceptedValues = ['primary', 'info', 'success', 'warning', 'danger', 'default', 'neutral']
        return acceptedValues.indexOf(value) !== -1
      }
    }
  },
  computed: {
    componentTag() {
      return this.href ? 'a' : this.tag
    }
  }
}
</script>
<style>
</style>
