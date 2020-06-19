<template>
  <div class="card card-plain">
    <div id="headingOne" role="tab" class="card-header">
      <a
        :href="`#${itemId}`"
        :aria-expanded="active"
        :aria-controls="`content-${itemId}`"
        data-toggle="collapse"
        data-parent="#accordion"
        @click.prevent="activate"
      >
        <slot name="title">
          {{ title }}
        </slot>
        <slot name="icon">
          <i v-if="!noIcon" class="now-ui-icons arrows-1_minimal-down" />
        </slot>
      </a>
    </div>
    <collapse-transition :duration="animationDuration">
      <div
        v-show="active"
        :id="`content-${itemId}`"
        :aria-labelledby="title"
        role="tabpanel"
        class="collapsed"
      >
        <div class="card-body">
          <slot />
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'CollapseItem',
  components: {
    CollapseTransition
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    id: String,
    noIcon: Boolean
  },
  inject: {
    animationDuration: {
      default: 250
    },
    multipleActive: {
      default: false
    },
    addItem: {
      default: () => {}
    },
    removeItem: {
      default: () => {}
    },
    deactivateAll: {
      default: () => {}
    }
  },
  data() {
    return {
      active: false
    }
  },
  computed: {
    itemId() {
      return this.id || this.title
    }
  },
  mounted() {
    this.addItem(this)
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.removeItem(this)
  },
  methods: {
    activate() {
      if (!this.multipleActive) {
        this.deactivateAll()
      }
      this.active = !this.active
    }
  }
}
</script>
<style>
</style>
