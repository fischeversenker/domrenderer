<template lang='pug'>
.home
  DomRenderer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DomRenderer from './components/DomRenderer.vue' // @ is an alias to /src

@Component({
  components: {
    DomRenderer,
  },
})
export default class Home extends Vue {}

</script>

<style lang="scss" scoped>

.home {
  text-align: center;
}
</style>
