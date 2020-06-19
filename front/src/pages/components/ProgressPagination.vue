<template>
  <div class="section section-pagination">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h4>Progress Bars</h4>
          <n-progress :value="25" label="Default" show-value />
          <n-progress :value="60" type="primary" label="Default" show-value />
          <n-progress :value="60" type="danger" label="Default" show-value />
          <n-progress :value="60" type="warning" label="Default" show-value />
          <n-progress :value="60" type="success" label="Default" show-value />
          <n-progress :value="60" type="info" label="Default" show-value />
        </div>
        <div class="col-md-6">
          <h4>Pagination</h4>
          <n-pagination v-model="pagination.simple" :page-count="10" type="primary" />

          <n-pagination v-model="pagination.default" :page-count="10" type="default" />

          <div class="pagination-container justify-content-center">
            <n-pagination
              v-model="pagination.full"
              :page-count="10"
              type="primary"
              prev-item-classes="arrow-margin-left"
              next-item-classes="arrow-margin-right"
            />
          </div>
          <br>
          <h4>Labels</h4>
          <badge type="default">Default</badge>
          <badge type="primary">Primary</badge>
          <badge type="success">Success</badge>
          <badge type="info">Info</badge>
          <badge type="warning">Warning</badge>
          <badge type="danger">Danger</badge>
          <badge type="neutral">Neutral</badge>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { Progress, Pagination, Badge } from '@/components'
export default {
  components: {
    [Progress.name]: Progress,
    [Pagination.name]: Pagination,
    Badge
  },
  data() {
    return {
      pagination: {
        simple: 1,
        default: 2,
        full: 3
      }
    }
  }
}
</script>
<style>
</style>
