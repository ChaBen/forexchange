<template>
  <div class="wrapper">
    <div class="page-header clear-filter header-filter" filter-color="orange">
      <div class="rellax-header rellax-header-sky" data-rellax-speed="-8">
        <div
          class="page-header-image"
          style="background-image: url('img/presentation-page/nuk-pro-back-sky.jpg')"
        />
      </div>
      <div class="rellax-header rellax-header-buildings lax">
        <div
          class="page-header-image page-header-city"
          style="background-image: url('img/presentation-page/nuk-pro-buildings.png')"
        />
      </div>
      <div class="rellax-text-container lax" data-lax-translate-y="0 0, vh 700">
        <h1 class="h1-seo rellax-text" data-rellax-speed="-2">ForExchange</h1>
      </div>
      <h3 class="h3-description rellax-text" data-rellax-speed="-1">The No.1 largest foreign exchange broker</h3>
    </div>
    <div class="main">
      <images-section />
      <!--     *********     FEATURES 1      *********      -->
      <div class="features-1">
        <div class="container">
          <div class="row">
            <div class="col-md-8 ml-auto mr-auto">
              <h2 class="title">Why do traders choose us?</h2>
              <h4 class="description">Insight to help you create, connect, and convert. Understand Your Audience's Interests, Influence, Interactions, and Intent. Discover emerging topics and influencers to reach new audiences.</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="info info-hover">
                <div class="icon icon-primary">
                  <i class="now-ui-icons business_chart-bar-32" />
                </div>
                <h4 class="info-title">Automate your trading strategies using our REST and FIX APIs.</h4>
              </div>
            </div>
            <div class="col-md-4">
              <div class="info info-hover">
                <div class="icon icon-success">
                  <i class="now-ui-icons business_chart-pie-36" />
                </div>
                <h4 class="info-title">We offer exceptional execution across our award-winning platform</h4>
              </div>
            </div>
            <div class="col-md-4">
              <div class="info info-hover">
                <div class="icon icon-warning">
                  <i class="now-ui-icons design-2_ruler-pencil" />
                </div>
                <h4 class="info-title">We offer tighter spreads and custom pricing across our premium account offering</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--     *********    END FEATURES 1      *********      -->
      <div class="features-1">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <h2 class="title">REST and FIX APIs.</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <card class="tradingview-card">
              <chart-kline/>
            </card>
          </div>
        </div>
      </div>

      <!--     *********    PROJECTS 1     *********      -->
      <div class="projects-1">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-8 ml-auto mr-auto text-center">
              <h2 class="title">Please use our edited application programming interface to get the data you want</h2>
              <tabs type="danger" centered pills>
                <tab-pane label="nodejs">
                  <pre>
                    <code>const io = require('socket.io-client');
const socket = io('https://wss.live-rates.com/')

var instruments = ['EURUSD', 'USDJPY', 'BTCUSD', 'ETH']

//Use the 'trial' as key to establish a 2-minute streaming connection with real-time data.
//After the 2-minute test, the server will drop the connection and block the IP for an Hour.

var key = 'trial'
//var key = 'XXXXXXX' //YOUR LIVE-RATES SUBSCRIPTION KEY

socket.on('connect', function() {
  socket.emit('key', key);

  // if you want to subscribe only specific instruments, emit instruments. To receive all instruments, comment the line below.
  socket.emit('instruments', instruments);

});

socket.on('rates', function(msg) {

  //Do what you want with the Incoming Rates... Enjoy!
  try {
    let obj = JSON.parse(msg);
    console.log(obj)

  } catch (e) {
    console.log(msg)
  }

});
                    </code>
                  </pre>
                </tab-pane>
                <tab-pane label="php" />
                <tab-pane label="python" />
                <tab-pane label="java" />
              </tabs>
            </div>
          </div>
        </div>
      </div>
      <!--     *********    END PROJECTS 1      *********      -->

      <!--     *********    PROJECTS 4     *********      -->
      <div data-background-color="gray">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-8 mr-auto ml-auto text-center">
              <h2 class="title">Some of Our Awesome Projects</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 px-0">
              <card
                type="background"
                class="card-fashion"
                style="background-image: url('img/project14.jpg')"
              >
                <div class="card-body">
                  <div class="card-title text-left">
                    <h2>
                      <a href="#pablo">
                        The “crazy idea that could lead to a big future commission” project.
                      </a>
                    </h2>
                  </div>
                  <div class="card-footer text-left">
                    <div class="stats">
                      <span>
                        <i class="now-ui-icons objects_globe" />The “Crazy idea” project
                      </span>
                    </div>
                  </div>
                </div>
              </card>
            </div>
            <div class="col-md-6 px-0">
              <div class="card-container">
                <div class="card card-fashion">
                  <div class="card-title">
                    <a href="#pablo">
                      <h4>
                        <a href="#pablo">
                          The next time you’re on vacation, take advantage of all the work you can
                          get done...
                        </a>
                      </h4>
                    </a>
                  </div>
                  <div class="card-body">
                    <div class="card-footer">
                      <div class="stats">
                        <span>
                          <i class="now-ui-icons education_paper" /> The “I’m on vacation” project
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <card
                  type="background"
                  class="card-fashion"
                  style="background-image: url('img/project15.jpg')"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 px-0">
              <div class="card-container">
                <card
                  type="background"
                  class="card-fashion"
                  style="background-image: url('img/project17.jpg')"
                />
                <div class="card card-fashion arrow-left">
                  <div class="card-title">
                    <h4>
                      <a href="#pablo">
                        The elements of Agile Project Management have been around for decades...
                      </a>
                    </h4>
                  </div>
                  <div class="card-body">
                    <div class="card-footer">
                      <div class="stats">
                        <span>
                          <i class="now-ui-icons design_app" />The "Agile Project" project
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 px-0">
              <card
                type="background"
                class="card-fashion"
                style="background-image: url('img/project16.jpg')"
              >
                <div class="card-title text-left">
                  <h2>
                    <a href="#pablo">Performing a Project Premortem</a>
                  </h2>
                </div>
                <div class="card-footer text-left">
                  <div class="stats">
                    <span>
                      <i class="now-ui-icons media-2_sound-wave" />The "Premortem" project
                    </span>
                  </div>
                </div>
              </card>
            </div>
          </div>
        </div>
      </div>
      <!--     *********    END PROJECTS 4      *********      -->

      <!--     *********    TEAM 1     *********      -->
      <div class="team-1">
        <div class="container">
          <div class="row">
            <div class="col-md-8 ml-auto mr-auto text-center">
              <h2 class="title">Our Awesome Team</h2>
              <h4 class="description">This is the paragraph where you can write more details about your team.
                Keep you user engaged by providing meaningful information.</h4>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-4 ml-1">
              <card type="profile" plain>
                <img slot="avatar" class="img img-raised" src="img/james.jpg">

                <h3 class="card-title">Oliver Atticus</h3>
                <h6 class="category text-primary">Web Developer</h6>
                <p class="card-description">
                  If you want to know what a man's like, take a good look at how he treats his inferiors,
                  not his equals.
                </p>
                <div class="card-footer">
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i
                    class="fab fa-facebook-square"
                  /></a>
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i
                    class="fab fa-dribbble"
                  /></a>
                </div>
              </card>
            </div>
            <div class="col-md-4 mr-1">
              <card type="profile" plain>
                <img slot="avatar" class="img img-raised" src="img/michael.jpg">

                <h3 class="card-title">Smith College</h3>
                <h6 class="category text-primary">CEO / Co-Founder</h6>
                <p class="card-description">
                  Two things are infinite: the universe and human stupidity; and I'm not sure about the
                  universe.
                </p>
                <div class="card-footer">
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i
                    class="fab fa-twitter"
                  /></a>
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i
                    class="fab fa-facebook-square"
                  /></a>
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i class="fab fa-google" /></a>
                </div>
              </card>
            </div>
            <div class="col-md-4 ml-1 mt-4">
              <card type="profile" plain>
                <img slot="avatar" class="img img-raised" src="img/emily.jpg">

                <h3 class="card-title">Sophia Madison</h3>
                <h6 class="category text-primary">Entrepreneur</h6>
                <p class="card-description">
                  Be who you are and say what you feel, because those who mind don't matter, and those who
                  matter don't mind.
                </p>
                <div class="card-footer">
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i
                    class="fab fa-twitter"
                  /></a>
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i
                    class="fab fa-dribbble"
                  /></a>
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i
                    class="fab fa-linkedin"
                  /></a>
                </div>
              </card>
            </div>
            <div class="col-md-4 mr-1 mt-4">
              <card type="profile" plain>
                <img slot="avatar" class="img img-raised" src="img/olivia.jpg">

                <h3 class="card-title">Emily Chloe</h3>
                <h6 class="category text-primary">Entrepreneur</h6>
                <p class="card-description">
                  You know you're in love when you can't fall asleep because reality is finally better
                  than your dreams.
                </p>
                <div class="card-footer">
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i class="fab fa-google" /></a>
                  <a href="#pablo" class="btn btn-icon btn-primary btn-round"><i
                    class="fab fa-dribbble"
                  /></a>
                </div>
              </card>
            </div>
          </div>
        </div>
      </div>
      <!--     *********    END TEAM 1      *********      -->
    </div>
  </div>
</template>

<script>
import ImagesSection from './components/ImagesSection'
import { Card, Tabs, TabPane } from '@/components'
import ChartKline from './components/ChartKline'
import hljs from 'highlight.js/lib/core'
import lax from 'lax.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/dracula.css'

export default {
  name: 'Home',
  bodyClass: 'index-page',
  components: {
    ImagesSection,
    Card,
    Tabs,
    TabPane,
    ChartKline
  },
  mounted() {
    // window.addEventListener('scroll', () => {
    //   const scrollY = window.scrollY
    //   const city = document.getElementById('page-header-buildings')
    //   if (scrollY < 100) {
    //     city.style.top = -scrollY * 1.2 + 'px'
    //   }
    // })
    this.loadHiglight()
    this.updateLax()
  },
  methods: {
    loadHiglight() {
      hljs.registerLanguage('javascript', javascript)
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    },
    updateLax() {
      lax.setup()

      const update = () => {
        lax.update(window.scrollY)
        window.requestAnimationFrame(update)
      }

      window.requestAnimationFrame(update)
    }
  }
}
</script>
