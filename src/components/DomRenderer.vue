<template lang="pug">
.dom-renderer
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import mock from '../mock';
import Renderer from './renderer';

@Component
export default class DomRenderer extends Vue {

  private nodes: Array<any> = [];
  private links: Array<any> = [];

  mounted() {
    this.init();
  }

  init() {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(mock, "text/html");

    this.walk(parsedDocument.documentElement, (node: HTMLElement) => {
      const nodeId = this.nodes.length;
      const nodeChildCount = this.getNodeChildCount(node);
      this.nodes.push({
        node,
        id: nodeId,
        name: `${node.tagName} - ${Array.from(node.classList).join(',')}`,
        group: 1,
        size: 4 + nodeChildCount,
      });
      const parentNode = this.nodes.find((otherNode: any) => otherNode.node === node.parentElement);
      if (parentNode) {
        this.links.push({
          source: nodeId,
          target: parentNode.id,
          value: 2 + nodeChildCount * 2,
        });
      }
    });

    const renderer = new Renderer(window.innerWidth, window.innerHeight, this.$el, (this.nodes as any[]), this.links);
    renderer.getChart();
  }

  walk(node: any, cb: any) {
    cb(node);
    [...node.children].forEach(node => this.walk(node, cb));
  }

  getNodeChildCount(node: HTMLElement): number {
    return Array.from(node.children).reduce((acc: number, otherNode: Element) => acc + this.getNodeChildCount(otherNode as HTMLElement), node.childElementCount);
  }

}
</script>
