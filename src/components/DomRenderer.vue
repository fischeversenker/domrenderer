<template lang="pug">
.dom-renderer
  .dom-renderer__inputs
    label nodeScaleFactor {{ rawInputs.nodeScaleFactor }}
    input(type='range', v-model='rawInputs.nodeScaleFactor', :min='ranges.nodeScaleFactor.min', :max='ranges.nodeScaleFactor.max', :step='ranges.nodeScaleFactor.step')
    label linkScaleFactor {{ rawInputs.linkScaleFactor }}
    input(type='range', disabled, v-model='rawInputs.linkScaleFactor', :min='ranges.linkScaleFactor.min', :max='ranges.linkScaleFactor.max', :step='ranges.linkScaleFactor.step')
    label fontSize {{ rawInputs.fontSize }}
    input(type='range', v-model='rawInputs.fontSize', :min='ranges.fontSize.min', :max='ranges.fontSize.max', :step='ranges.fontSize.step')

    .dom-renderer__inputs-block
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

const FRAME_LENGTH = 100;

@Component
export default class DomRenderer extends Vue {

  private nodes: any[] = [];
  private links: any[] = [];
  private width: number = 0;
  private height: number = 0;

  private node: any;
  private link: any;
  private parser: DOMParser = new DOMParser();
  private simulation: d3.Simulation<any, undefined> | null = null;
  private tick: () => void = () => void(0);

  private lastReset = 0;

  private rawInputs: any = {
    nodeScaleFactor: 2,
    linkScaleFactor: 1,
    fontSize: 14,
    viewBoxX1: -400,
    viewBoxY1: -200,
    viewBoxX2: 800,
    viewBoxY2: 800,
    showLabels: true,
    labelDepth: 4,
  };

  private ranges: any = {
    nodeScaleFactor: {
      min: 0,
      max: 10,
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
    this.width = 800;
    this.height = 800;
    this.reset();
    this.start();
  }

  reset() {
    const parsedDocument = this.parser.parseFromString(mock, "text/html");
    const { nodes, links } = this.getNodesAndLinks(parsedDocument.documentElement);
    this.node && this.node.remove && this.node.remove();
    this.link && this.link.remove && this.link.remove();
    this.nodes = nodes;
    this.links = links;
  }

  getNodesAndLinks(element: HTMLElement) {
    let nodes: any[] = [];
    let links: any[] = [];

    // gather nodes
    this.walk(element, (el: HTMLElement) => {
      const nodeId = nodes.length;
      el.dataset.nodeId = String(nodeId);
      nodes.push(this.transformNode(el, nodes.length, el.childElementCount));
    });

    // gather links
    this.walk(element, (el: HTMLElement) => {
      Array.from(el.children).forEach((child: Element) => {
        links.push(this.transformLink(Number(el.dataset.nodeId), Number((child as HTMLElement).dataset.nodeId)));
      });
    });

    return { nodes, links };
  }

  transformNode(element: HTMLElement, nodeId: number, nodeChildCount: number) {
    return {
      element,
      id: nodeId,
      name: `${element.tagName} - ${Array.from(element.classList).join(', ')}`,
      group: 1,
      size: (4 + nodeChildCount) * this.inputs.nodeScaleFactor,
      childCount: nodeChildCount,
      parentCount: this.getParentCount(element),
    };
  }

  transformLink(source: number, target: number) {
    return {
      source,
      target,
      weight: 4,
    };
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
    return (d: any) => scale(d.size);
  }

  forceSimulation(nodes: any, links: any) {
    return d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d: any) => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());
  }

  start() {
    const links = this.links.map(d => Object.create(d));
    const nodes = this.nodes.map(d => Object.create(d));

    const ticked = () => {

      svg.attr("viewBox", d => `${this.inputs.viewBoxX1}, ${this.inputs.viewBoxY1}, ${this.inputs.viewBoxX2}, ${this.inputs.viewBoxY2}`);

      link.attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x)
          .attr("cy", d => d.y)
          .attr("r", d => (2 + d.childCount) * this.inputs.nodeScaleFactor);

      text.attr('x', d => d.x)
          .attr('y', d => d.y + 3)
          .attr('font-size', d => `${this.inputs.fontSize}px`)
          .classed('label--hidden', d => d.parentCount > this.inputs.labelDepth || !this.rawInputs.showLabels);
    }

    this.tick = () => ticked();

    const svg = d3.select(this.$refs.canvas as BaseType)
                  .append('svg')
                  .attr('width', this.width)
                  .attr('height', this.height)
                  .attr('preserveAspectRatio', 'xMinYMin meet')
                  .attr("viewBox", d => `${this.inputs.viewBoxX1}, ${this.inputs.viewBoxY1}, ${this.inputs.viewBoxX2}, ${this.inputs.viewBoxY2}`);

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .enter().append("line")
        .attr("stroke-width", d => 2);

    this.link = link;

    this.simulation = this.forceSimulation(nodes, links).on("tick", throttle(ticked, FRAME_LENGTH));

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("r", d => d.size)
        .attr("fill", this.color())
        .call((this.drag() as any));

    node.append("title")
        .text(d => d.name);

    this.node = node;

    const text = svg.selectAll('text')
        .data(nodes)
        .enter()
        .append('text');

    text.attr('text-anchor', 'middle')
        .text(d => d.name)
        .attr('fill', 'white')
        .attr('font-size', d => `${this.inputs.fontSize}px`)
        .call((this.drag() as any));

    return svg.node();
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
      d.fx = null;
      d.fy = null;
    };

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

}
</script>

<style scoped>
.dom-renderer {
  display: grid;
  grid-template-columns: 1fr 6fr;
  justify-content: left
}

/deep/ .label--hidden {
  opacity: 0;
}
</style>
