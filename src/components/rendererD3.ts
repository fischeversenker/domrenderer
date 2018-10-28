import * as d3 from 'd3';

import { DRNode, DRLink, DRRenderer } from "./renderer";

export interface DRRendererD3Config {
  width: number;
  height: number;
  nodeScaleFactor: number;
  linkScaleFactor: number;
  fontSize: number;
  showLabels: boolean;
  labelDepth: number;
}

export interface DRNodeD3 extends DRNode {
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

const DEFAULT_CONFIG = {
  width: 800,
  height: 400,
  nodeScaleFactor: 1,
  linkScaleFactor: 1,
  fontSize: 16,
  showLabels: true,
  labelDepth: 2,
}

const RendererOptions: any = {
  nodeScaleFactor: {
    type: 'range',
    value: '1',
    range: {
      min: 0,
      max: 10,
      step: 0.1,
    },
    label: 'Node Scale Factor',
  },
  linkScaleFactor: {
    type: 'range',
    value: '1',
    range: {
      min: 0,
      max: 10,
      step: 1,
    },
    label: 'Link Scale Factor',
  },
  fontSize: {
    type: 'range',
    value: '16',
    range: {
      min: 4,
      max: 400,
      step: 1,
    },
    label: 'Font Size',
  },
  labelDepth: {
    type: 'range',
    value: '3',
    range: {
      min: 0,
      max: 10,
      step: 1,
    },
    label: 'Label Depth',
  },
  showLabels: {
    type: 'checkbox',
    value: true,
    label: 'Show Labels',
  },
};

export default class DRRendererD3 implements DRRenderer {

  private config: DRRendererD3Config = DEFAULT_CONFIG;

  private container: HTMLElement | null = null;

  private svg: any;
  private graph: any;
  private text: any;
  private node: any = null;
  private link: any = null;
  private simulation: d3.Simulation<any, undefined> | null = null;

  public setup(container: HTMLElement, config?: DRRendererD3Config) {
    this.container = container;
    this.setConfig(config || DEFAULT_CONFIG);
  }

  public setConfig(config: DRRendererD3Config) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public update = () => {

    this.svg.attr("viewBox", (d: any) => `0, 0, ${this.config.width}, ${this.config.height}`);

    this.link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)
        .attr('stroke-width', (d: any) => 4 + 1 * this.config.linkScaleFactor);

    this.node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
        .attr('r', (d: any) => this.nodeSize(d));

    this.text
        .classed('label--hidden', (d: any) => d.parentCount > this.config.labelDepth || !this.config.showLabels);

    this.text.selectAll('text')
        .attr('x', (d: any) => d.x + this.config.fontSize / 2)
        .attr('y', (d: any) => d.y + this.config.fontSize + this.config.fontSize / 4)
        .attr('font-size', (d: any) => this.config.fontSize);

    this.text.selectAll('rect')
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y)
        .attr('width', (d: any) => 0)
        .attr('height', this.config.fontSize * 2);
  }

  // TBD: refactor this. Dont add a new svg for each render()
  public render(nodes: DRNode[], links: DRLink[]) {

    this.svg = d3.select(this.container)
                  .append('svg')
                  .attr('width', this.config.width)
                  .attr('height', this.config.height)
                  .attr('preserveAspectRatio', 'xMinYMin meet');

    this.graph = this.svg.append('g')
        .classed('graph', true);

    this.simulation = this.forceSimulation(nodes, links)
        .on('tick', this.update);

    this.link = this.graph.append('g')
          .classed('links', true)
          .attr("transform", `translate(${this.config.width / 2}, ${this.config.height / 4})`)
        .selectAll('line')
        .data(links)
        .enter().append('line')
          .classed('link', true);

    this.node = this.graph.append('g')
        .classed('nodes', true)
        .attr('transform', `translate(${this.config.width / 2}, ${this.config.height / 4})`)
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
        .classed('node', true)
        .attr('fill', this.color())
        .call((this.drag() as any));

    this.node.append("title")
        .text((d: any) => d.label);

    this.text = this.graph.append('g')
        .classed('texts', true)
        .attr('transform', `translate(${this.config.width / 2 + this.config.fontSize}, ${this.config.height / 4 - this.config.fontSize})`)
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
        .classed('text-group', true);

    this.text.append('rect')
      	.attr('class', 'rect');

    this.text.append('text')
      	.attr('class', 'text')
        .text((d: any) => d.label)

    this.svg.append('rect')
        .attr('width', this.config.width)
        .attr('height', this.config.height)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .call(d3.zoom().scaleExtent([ 1 / 128, 4 ]).on('zoom', this.zoomed))

    return this.svg.node();
  }

  public reset(config?: DRRendererD3Config) {
    this.config = config || DEFAULT_CONFIG;
    if (this.simulation) {
      this.simulation.stop();
    }

    if (this.node) {
      this.node.remove();
    }
    if (this.link) {
      this.link.remove();
    }
    if (this.text) {
      this.text.remove();
    }
  }

  public transformNode(element: HTMLElement): DRNodeD3 {
    const fixed = this.getParentCount(element) === 0;

    return {
      element,
      fixed,
      label: this.getElementLabel(element),
      group: 1,
      size: 20 + element.childElementCount * 1,
      childCount: element.childElementCount,
      parentCount: this.getParentCount(element),
      x: 0,
      y: 0,
      fx: fixed ? 0 : null,
      fy: fixed ? 0 : null,
    };
  }

  public transformLink(source: number, target: number): DRLink {
    return {
      source,
      target,
    };
  }

  get configurableOptions() {
    return RendererOptions;
  }

  /* PRIVATE */

  getElementLabel(element: HTMLElement): string {
    let label = `${element.tagName.toLowerCase()}`;
    if (element.classList.length) {
      label += `.${Array.from(element.classList).join('.')}`;
    }
    return label;
  }

  getParentCount(node: HTMLElement, acc: number = -1): number {
    if (node.parentElement) {
      return this.getParentCount(node.parentElement, acc + 1)
    }
    return acc + 1;
  }

  forceSimulation(nodes: any, links: any) {

    // const isConnected = (id: number, link: DRLink) => link.source === id || link.target === id;
    // const count = (id: number) => this.links.reduce((acc, link) => acc + (isConnected(id, link) ? 1 : 0), 0);
    const forceLink = d3.forceLink(links)
            .id((d: any) => d.index);
    return d3.forceSimulation(nodes)
        .force("link", forceLink)
        // .force("charge", d3.forceManyBody())
        .force('centerY', d3.forceY(0))
        // .force('center', d3.forceCenter())
        .force('collision', d3.forceCollide((d: any) => this.nodeSize(d)));
  }

  color() {
    const scale = d3.scaleOrdinal(d3.schemeCategory10);
    return (d: any) => scale(d.childCount);
  }

  nodeSize = (d: DRNodeD3) => d.size * this.config.nodeScaleFactor;

  drag = () => {

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

  zoomed = () => this.graph.attr('transform', d3.event.transform);

}
