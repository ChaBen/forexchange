<template>
  <navbar
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    position="fixed"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/presentation">
        ForExchange
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">Designed by Invision. Coded by Creative Tim</div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <a to="/#about" class="nav-link">
          <i class="now-ui-icons business_bulb-63" /> About-us
        </a>
      </li>
      <drop-down tag="li" title="Menus" icon="now-ui-icons design_app" class="nav-item">
        <nav-link to="/#about">
          <i class="now-ui-icons business_bulb-63" /> About-us
        </nav-link>
        <nav-link class="dropdown-item" to="/sections#teams">
          <i class="now-ui-icons sport_user-run" /> Chat
        </nav-link>
        <a href="https://demos.creative-tim.com/vue-now-ui-kit-pro/documentation" target="_blank" class="dropdown-item">
          <i class="now-ui-icons design_bullet-list-67" /> Rest-api
        </a>
        <nav-link class="dropdown-item" to="/sections#teams">
          <i class="now-ui-icons sport_user-run" /> Projects
        </nav-link>
        <nav-link class="dropdown-item" to="/sections#teams">
          <i class="now-ui-icons sport_user-run" /> Teams
        </nav-link>
        <nav-link class="dropdown-item" to="/contact">
          <i class="now-ui-icons location_pin" /> Contact Us
        </nav-link>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components'
import { Popover } from 'element-ui'
export default {
  name: 'MainNavbar',
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover
  },
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  }
}
</script>

<style scoped>

</style>
