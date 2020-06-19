<template>
  <footer
    :class="{[`footer-${type}`]: type}"
    :data-background-color="backgroundColor"
    class="footer"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href="https://www.forexchange.com">
              ForExchange
            </a>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, Coded by ForExchange Tim.
      </div>
    </div>
  </footer>
  <!-- <footer class="footer" data-background-color="black">
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
  </footer> -->
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
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
