<template lang="pug">
.dom-renderer
  .dom-renderer__inputs
    label nodeScaleFactor {{ rawInputs.nodeScaleFactor }}
    input(type='range', v-model='rawInputs.nodeScaleFactor', :min='ranges.nodeScaleFactor.min', :max='ranges.nodeScaleFactor.max', :step='ranges.nodeScaleFactor.step')
    label linkScaleFactor {{ rawInputs.linkScaleFactor }}
    input(type='range', v-model='rawInputs.linkScaleFactor', :min='ranges.linkScaleFactor.min', :max='ranges.linkScaleFactor.max', :step='ranges.linkScaleFactor.step')
    label fontSize {{ rawInputs.fontSize }}
    input(type='range', v-model='rawInputs.fontSize', :min='ranges.fontSize.min', :max='ranges.fontSize.max', :step='ranges.fontSize.step')

    .dom-renderer__inputs-block(v-if='false')
      label viewBoxX1 {{ rawInputs.viewBoxX1 }}
      input(type='range', v-model='rawInputs.viewBoxX1', :min='ranges.viewBoxX1.min', :max='ranges.viewBoxX1.max', :step='ranges.viewBoxX1.step')
      label viewBoxY1 {{ rawInputs.viewBoxY1 }}
      input(type='range', v-model='rawInputs.viewBoxY1', :min='ranges.viewBoxY1.min', :max='ranges.viewBoxY1.max', :step='ranges.viewBoxY1.step')
      label viewBoxX2 {{ rawInputs.viewBoxX2 }}
      input(type='range', v-model='rawInputs.viewBoxX2', :min='ranges.viewBoxX2.min', :max='ranges.viewBoxX2.max', :step='ranges.viewBoxX2.step')
      label viewBoxY2 {{ rawInputs.viewBoxY2 }}
      input(type='range', v-model='rawInputs.viewBoxY2', :min='ranges.viewBoxY2.min', :max='ranges.viewBoxY2.max', :step='ranges.viewBoxY2.step')

    label(for='show-labels') Show Labels?
    input#show-labels(type='checkbox', v-model='rawInputs.showLabels')
    label labelDepth {{ rawInputs.labelDepth }}
    input(type='range', v-model='rawInputs.labelDepth', :min='ranges.labelDepth.min', :max='ranges.labelDepth.max')
  .dom-renderer__canvas(ref='canvas')
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import * as d3 from 'd3';
import { BaseType, SimulationNodeDatum, Selection } from 'd3';

import throttle from 'lodash.throttle';

import mock from '../mock';

const FRAME_LENGTH = 20;

const WIDTH = 800;
const HEIGHT = 400;

interface DRNode {
  element: HTMLElement;
  label: string;
  group: number;
  size: number;
  childCount: number;
  parentCount: number;
  fixed: boolean;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

interface DRLink {
  source: number;
  target: number;
  index: number;
}

// IDEA #######################
// make this a browser plugin to always inspect the currently viewed page
// plugin like elements in chrome dev console

@Component
export default class DomRenderer extends Vue {

  private svg: any;
  private text: any;
  private nodes: DRNode[] = [];
  private links: any[] = [];
  private width: number = 0;
  private height: number = 0;
  private zoom: any = null;

  private graphUnion: any = null;
  private node: any = null;
  private link: any = null;
  private parser: DOMParser = new DOMParser();
  private simulation: d3.Simulation<any, undefined> | null = null;

  private lastReset = 0;

  private rawInputs: any = {
    nodeScaleFactor: 1,
    linkScaleFactor: 1,
    fontSize: 14,
    viewBoxX1: 0,
    viewBoxY1: 0,
    viewBoxX2: WIDTH,
    viewBoxY2: HEIGHT,
    showLabels: true,
    labelDepth: 2,
  };

  private ranges: any = {
    nodeScaleFactor: {
      min: 0.1,
      max: 5,
      step: 0.1,
    },
    linkScaleFactor: {
      min: 0,
      max: 10,
      step: 0.1,
    },
    fontSize: {
      min: 8,
      max: 72,
      step: 1,
    },
    viewBoxX1: {
      min: -2000,
      max: 2000,
      step: 1,
    },
    viewBoxY1: {
      min: -2000,
      max: 2000,
      step: 1,
    },
    viewBoxX2: {
      min: 0,
      max: 2000,
      step: 1,
    },
    viewBoxY2: {
      min: 0,
      max: 2000,
      step: 1,
    },
    labelDepth: {
      min: 0,
      max: 10,
    },
  }

  @Watch('rawInputs', { deep: true })
  inputChanged() {
    if (this.simulation && Date.now() - this.lastReset > FRAME_LENGTH) {
      this.tick();
      this.lastReset = Date.now();
    }
  }

  get inputs(): any {
    return Object.keys(this.rawInputs)
      .reduce((acc, key) => ({
        ...acc,
        [key]: Number(this.rawInputs[key]),
      }), {});
  }

  mounted() {
    this.width = WIDTH;
    this.height = HEIGHT;
    this.reset();
    this.start();
    this.zoom = d3.zoom();
  }

  reset() {
    const parsedDocument = this.parser.parseFromString(mock, "text/html");
    const { nodes, links } = this.getNodesAndLinks(document.documentElement);
    this.nodes = nodes;
    this.links = links;

    if (this.node && this.link && this.text) {
      this.node.remove();
      this.link.remove();
      this.text.remove();
    }
  }

  getNodesAndLinks(element: HTMLElement) {
    let nodes: any[] = [];
    let links: any[] = [];

    // gather nodes
    this.walk(element, (el: HTMLElement) => {
      const nodeId = nodes.length;
      el.dataset.nodeId = String(nodeId);
      nodes.push(this.transformNode(el));
    });

    // gather links
    this.walk(element, (el: HTMLElement) => {
      Array.from(el.children).forEach((child: Element) => {
        links.push(this.transformLink(Number(el.dataset.nodeId), Number((child as HTMLElement).dataset.nodeId)));
      });
    });

    return { nodes, links };
  }

  transformLink(source: number, target: number) {
    return {
      source,
      target,
      weight: 4,
    };
  }

  transformNode(element: HTMLElement): DRNode {
    const fixed = this.getParentCount(element) === 0;
    return {
      element,
      fixed,
      label: this.getElementLabel(element),
      group: 1,
      size: 4 + element.childElementCount,
      childCount: element.childElementCount,
      parentCount: this.getParentCount(element),
      x: this.width / 2,
      y: this.height / 2,
      fx: fixed ? 0 : null,
      fy: fixed ? 0 : null,
    };
  }

  getElementLabel(element: HTMLElement): string {
    let label = `${element.tagName.toLowerCase()}`;
    if (element.classList.length) {
      label += ` || ${Array.from(element.classList).join(', ')}`;
    }
    return label;
  }

  getParentCount(node: HTMLElement, acc: number = -1): number {
    if (node.parentElement) {
      return this.getParentCount(node.parentElement, acc + 1)
    }
    return acc + 1;
  }

  walk(node: any, cb: any) {
    cb(node);
    [...node.children].forEach(node => this.walk(node, cb));
  }

  /* */

  color() {
    const scale = d3.scaleOrdinal(d3.schemeCategory10);
    return (d: any) => scale(d.childCount);
  }

  forceSimulation(nodes: any, links: any) {
    return d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d: any) => d.index))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());
  }

  tick() {
    this.svg.attr("viewBox", (d: any) => `${this.inputs.viewBoxX1}, ${this.inputs.viewBoxY1}, ${this.inputs.viewBoxX2}, ${this.inputs.viewBoxY2}`);

    this.link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

    this.node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
        .attr('r', (d: any) => d.size * this.inputs.nodeScaleFactor);

    this.text
        .classed('label--hidden', (d: any) => d.parentCount > this.inputs.labelDepth || !this.rawInputs.showLabels);

    this.text.selectAll('text')
        .attr('x', (d: any) => d.x + this.inputs.fontSize / 2)
        .attr('y', (d: any) => d.y + this.inputs.fontSize + this.inputs.fontSize / 4)
        .attr('font-size', (d: any) => this.inputs.fontSize);

    this.text.selectAll('rect')
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y)
        .attr('width', 60 + this.inputs.fontSize * 10)
        .attr('height', this.inputs.fontSize * 2);
  }

  start() {
    this.svg = d3.select(this.$refs.canvas as BaseType)
                  .append('svg')
                  .attr('width', this.width)
                  .attr('height', this.height)
                  .attr('preserveAspectRatio', 'xMinYMin meet');

    this.simulation = this.forceSimulation(this.nodes, this.links)
        .on('tick', throttle(this.tick.bind(this), FRAME_LENGTH));

    this.link = this.svg.append('g')
          .classed('links', true)
          .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`)
        .selectAll('line')
        .data(this.links)
        .enter().append('line')
          .classed('link', true);

    this.node = this.svg.append('g')
        .classed('nodes', true)
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
      .selectAll('circle')
      .data(this.nodes)
      .enter().append('circle')
        .classed('node', true)
        .attr('fill', this.color())
        .call((this.drag() as any));

    this.node.append("title")
        .text((d: any) => d.label);

    this.text = this.svg.append('g')
        .classed('texts', true)
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
      .selectAll('g')
      .data(this.nodes)
      .enter().append('g')
        .classed('text-group', true);

    this.text.append('rect')
      	.attr('class', 'rect');

    this.text.append('text')
      	.attr('class', 'text')
        .text((d: any) => d.label)

    return this.svg.node();
  }

  drag() {

    const dragstarted = (d: any) => {
      if (!d3.event.active) (this.simulation as any).alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d: any) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d: any) => {
      if (!d3.event.active) (this.simulation as any).alphaTarget(0);
      if (!d.fixed) {
        d.fx = null;
        d.fy = null;
      }
    };

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

}
</script>

<style>
.dom-renderer {
  display: grid;
  grid-template-columns: 1fr 6fr;
  justify-content: left;
}

.dom-renderer__canvas {
  outline: 1px solid white;
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
  stroke-width: 2;
}

.node {
  stroke: white;
  stroke-width: 2;
}

.label--hidden {
  opacity: 0;
}
</style>
