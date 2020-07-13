<template>
  <div class="container">
    <div class="row justify-center">
      <div class="col-3">
        <el-select v-model="symbol" class="select-primary" placeholder="상품선택" @change="symbolChange">
          <el-option v-for="(option, index) in singleSelect.options" :key="index" :value="option.value" :label="option.value" class="select-primary"/>
        </el-select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <card class="text-center">
          <button class="btn btn-danger btn-lg" @click="upControl">매수</button>
        </card>
      </div>
      <div class="col-md-6">
        <card class="text-center">
          <button class="btn btn-info btn-lg" @click="downControl">매도</button>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import ImagesSection from './components/ImagesSection'
import { Card } from '@/components'
import { Select, Option } from 'element-ui'

export default {
  name: 'Home',
  bodyClass: 'index-page',
  components: {
    ImagesSection,
    Card,
    [Select.name]: Select,
    [Option.name]: Option
  },
  data: () => ({
    symbol: 'BTC',
    singleSelect: {
      options: [{ value: 'BTC' }, { value: 'ETH' }, { value: 'GBPAUD' }, { value: 'GBPCHF' }, { value: 'EURUSD' }]
    }
  }),
  methods: {
    upControl() {
      window.socket = ''
      window.socket = io(`http://167.179.111.229:3000?token=admin520&symbol=BTC`)
      window.socket.emit('order', {
        symbol: 'BTC',
        side: 'up',
        adjust: 1,
        pwd: 'Admin520'
      })
      window.alert('매수 성공')
    },
    downControl() {
      window.socket = ''
      window.socket = io(`http://167.179.111.229:3000?token=admin520&symbol=BTC`)
      window.socket.emit('order', {
        symbol: 'BTC',
        side: 'down',
        adjust: 1,
        pwd: 'Admin520'
      })
      window.alert('매도 성공')
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 10%;
}
</style>
