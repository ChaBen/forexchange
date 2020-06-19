<template>
  <component
    :is="tag"
    :class="[{show: isOpen}, {'dropdown': direction === 'down'}, {'dropup': direction ==='up'}]"
    :aria-expanded="isOpen"
    class="dropdown"
    aria-haspopup="true"
    @click-outside="closeDropDown"
    @click="toggleDropDown"
  >

    <slot name="title">
      <a
        :class="{'no-caret': hideArrow}"
        class="dropdown-toggle nav-link"
        data-toggle="dropdown"
      >
        <i :class="icon" />
        <span class="no-icon">{{ title }}</span>
      </a>
    </slot>
    <ul
      :class="[{'dropdown-menu-right': position === 'right'}, {show: isOpen}]"
      class="dropdown-menu"
    >
      <slot />
    </ul>
  </component>
</template>
<script>
export default {
  name: 'DropDown',
  props: {
    direction: {
      type: String,
      default: 'down'
    },
    title: String,
    icon: String,
    position: String,
    hideArrow: Boolean,
    tag: {
      type: String,
      default: 'li'
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  provide() {
    return {
      closeDropDown: this.closeDropDown
    }
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen
      this.$emit('change', this.isOpen)
    },
    closeDropDown() {
      this.isOpen = false
      this.$emit('change', this.isOpen)
    }
  }
}
</script>
<style>
  .dropdown {
    list-style-type: none;
  }

  .dropdown .dropdown-toggle {
    cursor: pointer;
  }
</style>
