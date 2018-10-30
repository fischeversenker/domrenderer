<template lang="pug">
.dom-renderer
  .dom-renderer__inputs
    .dom-renderer__inputs-block(v-for='option, index in rendererOptions', :key='index')
      label(:for='`renderer-input-${index}`') {{ option.label }} {{ inputs[option.key] }}
      input(:type='option.type', :id='`renderer-input-${index}`', v-model='inputs[option.key]', v-bind.once='attributesFor(option)')

    select(@change='onRendererChanged($event.target.value)')
      option(v-for='renderer in availableRenderers', :value='renderer') {{ renderer }}

  .dom-renderer__canvas(ref='canvas')
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

import throttle from 'lodash.throttle';

import mock from '../mock2';

import { DRNode, DRLink, DRRenderer } from './renderer';
import DRRendererD3Force from './rendererD3Force';
import DRRendererSVG from './rendererSVG';

const FRAME_LENGTH = 20;

// IDEA #######################
// make this a browser plugin to always inspect the currently viewed page
// plugin like elements in chrome dev console

@Component
export default class DomRenderer extends Vue {

  private width: number = 0;
  private height: number = 0;

  private renderer: DRRenderer = new DRRendererD3Force(document.documentElement);

  private parser: DOMParser = new DOMParser();

  private lastReset = 0;

  private inputs: any = {};

  private availableRenderers = [
    'D3Force', 'SVG',
  ];

  @Watch('inputs', { deep: true })
  inputChanged() {
    if (this.renderer && Date.now() - this.lastReset > FRAME_LENGTH) {
      this.renderer.setConfig(this.rendererOptionsInputs);
      this.renderer.update();
      this.lastReset = Date.now();
    }
  }

  get rendererOptionsInputs(): any {
    const inputValue = (key: string, type: string) => {
      switch (type) {
        case 'range':
          return Number(this.inputs[key]);
        case 'checkbox':
          return this.inputs[key];
      }
    };

    return this.rendererOptions.reduce((acc, option: any) => ({
        ...acc,
        [option.key]: inputValue(option.key, option.type),
      }), {});
  }

  get rendererOptions() {
    if (this.renderer.configurableOptions) {
      return Object.keys(this.renderer.configurableOptions)
        .map(key => ({
          key: key,
          ...this.renderer.configurableOptions[key],
        }));
    }
    return [];
  }

  created() {
    if (this.rendererOptions.length) {
      this.rendererOptions.forEach(option => Vue.set(this.inputs, option.key, option.value));
    }
  }

  mounted() {
    this.width = (this.$refs.canvas as HTMLElement).clientWidth;
    this.height = (this.$refs.canvas as HTMLElement).clientWidth;

    if (this.renderer) {
      this.reset();
      this.start();
    }
  }

  reset() {
    this.renderer.reset();
  }

  start() {
    const parsedDocument = this.parser.parseFromString(mock, "text/html");
    const { nodes, links } = this.getNodesAndLinks(parsedDocument.documentElement);
    this.renderer.render(nodes, links);
  }

  onRendererChanged(newRenderer: string) {
    this.renderer.reset();
    switch (newRenderer) {
      case 'SVG':
        this.renderer = new DRRendererSVG();
        break;
      case 'D3Force':
        this.renderer = new DRRendererD3Force(document.documentElement);
        break;
      // case 'D3Tree':
      //   this.renderer = new DRRendererD3Tree();
      //   break;
    }
    this.start();
  }

  getNodesAndLinks(baseElement: HTMLElement) {
    let nodes: any[] = [];
    let links: any[] = [];

    // gather nodes
    this.walk(baseElement, (el: HTMLElement) => {
      const nodeId = nodes.length;
      el.dataset.nodeId = String(nodeId);
      nodes.push(this.renderer.transformNode(el));
    });

    // gather links
    this.walk(baseElement, (el: HTMLElement) => {
      Array.from(el.children).forEach((child: Element) => {
        links.push(this.renderer.transformLink(Number(el.dataset.nodeId), Number((child as HTMLElement).dataset.nodeId)));
      });
    });

    return { nodes, links };
  }

  walk(node: any, cb: any) {
    cb(node);
    [...node.children].forEach(node => this.walk(node, cb));
  }

  attributesFor(option: any) {
    const attributes: any = {};
    if (option.type === 'range') {
      attributes.min = option.range.min;
      attributes.max = option.range.max;
      attributes.step = option.range.step || 1;
    }
    return attributes;
  }
}
</script>

<style>
.dom-renderer {
}

.dom-renderer__inputs {
  position: absolute;
  left: 40px;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  outline: 1px solid white;
  background-color: rgba(255, 255, 255, 0.1);
}

.dom-renderer__inputs-block {
  display: flex;
  flex-direction: column;
}

.dom-renderer__canvas {
}

.text-group {
  pointer-events: none;
  opacity: 0.85;
}

.text-group .text {
  fill: white;
}

.text-group .rect {
  stroke: white;
  stroke-opacity: 0.6;
  stroke-width: 1px;
  fill: rebeccapurple;
}

.link {
  stroke: white;
  /* stroke-width: 2; */
}

.node {
  /* stroke: white;
  stroke-width: 2; */
}

.label--hidden {
  opacity: 0;
}
</style>
