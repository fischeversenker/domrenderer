<template lang="pug">
.dom-renderer
  | Funzt das noch?
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { BaseType, SimulationNodeDatum, Selection } from 'd3';

import Renderer from './renderer';

const NODES = [
  {
    "id": 1,
    "group": 1
  }, {
    "id": 2,
    "group": 1
  }, {
    "id": 3,
    "group": 2
  }, {
    "id": 4,
    "group": 2
  },
];
const LINKS = [
  {
    "source": 2,
    "target": 1,
    "value": 28
  }, {
    "source": 3,
    "target": 1,
    "value": 8
  }, {
    "source": 4,
    "target": 1,
    "value": 10
  }, {
    "source": 4,
    "target": 3,
    "value": 6
  },
];

@Component
export default class DomRenderer extends Vue {

  mounted() {
    console.log('DOmRenderer created');

    // const $el = (window as any).tree;
    // console.log($el);
    // this.walk($el.children[0], (node: any) => {
    //   this.nodes.push(node);
    //   // TBD
    //   // var levelNodes = getLevelNodes(node)
    //   // var childIndex = getChildIndex(node)
    //   // var width = 90 / levelNodes.length
    //   // var leftSlice = 100 / levelNodes.length
    //   // var left = leftSlice * childIndex
    //   // clearInside(node)
    //   // tagNodeName(node)
    //   // handleImage(node)
    //   // node.style.cssText += `;
    //   //   width: ${width}%;
    //   //   left: ${left}%;
    //   // `
    // });


    // TBD: pass element to attach canvas to
    const renderer = new Renderer('.dom-renderer', (NODES as any[]), LINKS);
    renderer.getChart();
  }

}
</script>
