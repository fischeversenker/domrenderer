<template lang='pug'>
.home
  | TEST
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
