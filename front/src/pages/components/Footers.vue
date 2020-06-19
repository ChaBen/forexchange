<template>
  <div class="section-footers" data-background-color="gray">
    <div id="footer-areas">
      <!--     *********    BLACK SIMPLE FOOTER WITH SOCIAL AND BRAND     *********      -->
      <footer class="footer" data-background-color="black">
        <div class="container">
          <a class="footer-brand" href="#pablo">Now Ui Kit PRO</a>
          <ul class="pull-center">
            <li>
              <a href="#pablo">
                Blog
              </a>
            </li>
            <li>
              <a href="#pablo">
                Presentation
              </a>
            </li>
            <li>
              <a href="#pablo">
                Discover
              </a>
            </li>
            <li>
              <a href="#pablo">
                Payment
              </a>
            </li>
            <li>
              <a href="#pablo">
                Contact Us
              </a>
            </li>
          </ul>
          <ul class="social-buttons pull-right">
            <li>
              <a
                href="https://twitter.com/CreativeTim"
                target="_blank"
                class="btn btn-icon btn-link btn-neutral"
              >
                <i class="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/CreativeTim"
                target="_blank"
                class="btn btn-icon btn-neutral btn-link"
              >
                <i class="fab fa-facebook-square" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/CreativeTimOfficial"
                target="_blank"
                class="btn btn-icon btn-neutral btn-link"
              >
                <i class="fab fa-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <!--     *********   END BLACK SIMPLE FOOTER WITH SOCIAL AND BRAND     *********      -->
    </div>
  </div>
</template>
<script>
import { FormGroupInput, Button } from '@/components'
export default {
  components: {
    [FormGroupInput.name]: FormGroupInput,
    [Button.name]: Button
  },
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style>
</style>
