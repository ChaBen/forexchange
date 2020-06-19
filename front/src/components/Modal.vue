<template>
  <SlideYUpTransition :duration="animationDuration">
    <div
      v-show="show"
      :class="[{'show d-block': show}, {'d-none': !show}, {'modal-mini': type === 'mini'}]"
      :aria-hidden="!show"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      @click.self="closeModal"
    >

      <div
        :class="[{'modal-notice': type === 'notice'}, modalClasses]"
        class="modal-dialog"
      >
        <div class="modal-content">
          <slot name="base-content">
            <div :class="headerClasses" class="modal-header">
              <slot name="close-button">
                <button
                  v-if="showClose"
                  :aria-hidden="!show"
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  @click="closeModal"
                >
                  <i class="now-ui-icons ui-1_simple-remove" />
                </button>
              </slot>
              <slot name="header" />
            </div>

            <div :class="bodyClasses" class="modal-body">
              <slot />
            </div>

            <div :class="footerClasses" class="modal-footer">
              <slot name="footer" />
            </div>
          </slot>
        </div>
      </div>

    </div>
  </SlideYUpTransition>
</template>
<script>
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'Modal',
  components: {
    SlideYUpTransition
  },
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: '',
      validator(value) {
        const acceptedValues = ['', 'notice', 'mini']
        return acceptedValues.indexOf(value) !== -1
      }
    },
    modalClasses: [Object, String],
    headerClasses: [Object, String],
    bodyClasses: [Object, String],
    footerClasses: [Object, String],
    animationDuration: {
      type: Number,
      default: 500
    }
  },
  watch: {
    show(val) {
      const documentClasses = document.body.classList
      if (val) {
        documentClasses.add('modal-open')
      } else {
        documentClasses.remove('modal-open')
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:show', false)
      this.$emit('close')
    }
  }
}
</script>
<style>
    .modal.show {
        background-color: rgba(0, 0, 0, 0.3)
    }
</style>
<style lang="scss">
    @import "~@/assets/sass/now-ui-kit/variables";
    @import "~@/assets/sass/now-ui-kit/mixins";
    @import "~@/assets/sass/now-ui-kit/modals";
</style>
