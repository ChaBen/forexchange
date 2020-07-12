<template>
  <div>
    <div id="tv_chart_container" ref="chart"/>
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  mounted() {
    window.socket = io('http://167.179.111.229:3000?token=admin520&symbol=BTC')

    window.socket.on('exception', function(res) {
      console.log('exception event:', res)
    })
    window.socket.on('message', (data) => {
      if (window.onTick) {
        const res = JSON.parse(window.pako.inflate(data, {
          to: 'string'
        }))
        console.log('message:', res)
        window.onTick({ ...res, time: res.time * 1000 })
      }
    })

    window.tvWidget = new TradingView.widget({
      // debug: true, // uncomment this line to see Library errors and warnings in the console
      // fullscreen: true,
      // autosize: true,
      width: this.$refs.chart.clientWidth,
      height: '500',
      symbol: 'BTC',
      interval: '1',
      container_id: 'tv_chart_container',

      //	BEWARE: no trailing slash is expected in feed URL
      datafeed: new Datafeeds.UDFCompatibleDatafeed(),
      library_path: 'charting_library/',
      locale: 'en',
      timezone: 'Asia/Shanghai',
      theme: this.getParameterByName('theme'),
      disabled_features: [
        // 'header_symbol_search',
        // 'symbol_search_hot_key',
        'compare_symbol',
        'volume_force_overlay'
      ],
      enabled_features: [
        'move_logo_to_main_pane',
        'hide_last_na_study_output'
      ],
      overrides: {
        volumePaneSize: 'small'
      },
      favorites: {
        intervals: ['1', '5', '30', '60', '240', 'D', 'W', 'M']
      }
    })
  },
  methods: {
    getParameterByName(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
      var results = regex.exec(location.search)
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
    }
  }
}
</script>
