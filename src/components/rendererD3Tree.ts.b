import * as d3 from 'd3';

import DRRendererD3, { DRNodeD3, DRRendererD3Config } from "./rendererD3";
import { DRNode, DRLink } from './renderer';

export interface DRRendererD3TreeConfig extends DRRendererD3Config {
  width: number;
  height: number;
  nodeScaleFactor: number;
  linkScaleFactor: number;
  fontSize: number;
  showLabels: boolean;
  labelDepth: number;
  x0?: number;
  y0?: number;
}

export interface DRNodeD3Tree extends DRNodeD3 {
  group: number;
  size: number;
  childCount: number;
  parentCount: number;
  fixed: boolean;
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

export default class DRRendererD3Force extends DRRendererD3 {

  private svg: any;
  private graph: any;
  private text: any;
  private node: any = null;
  private link: any = null;
  private simulation: d3.Simulation<any, undefined> | null = null;
  private dx = 10;
  private dy = 100;
  private diagonal: d3.Link<any, d3.DefaultLinkObject, [number, number]> | null = null;
  private tree: d3.TreeLayout<{}> | null = null;

  constructor(public container: HTMLElement, public config: DRRendererD3TreeConfig = DEFAULT_CONFIG) {
    super(container, config);
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
        .attr('r', (d: any) => d.size);

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
    const root = d3.hierarchy(nodes);

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", dx)
        .attr("viewBox", [-margin.left, -margin.top, width, dx])
        .style("font", "10px sans-serif")
        .style("user-select", "none");

    const gLink = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
        .attr("cursor", "pointer");

    function update(source) {
      const duration = d3.event && d3.event.altKey ? 2500 : 250;
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new tree layout.
      tree(root);

      let left = root;
      let right = root;
      root.eachBefore(node => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + margin.top + margin.bottom;

      const transition = svg.transition()
          .duration(duration)
          .attr("height", height)
          .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
          .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

      // Update the nodes…
      const node = gNode.selectAll("g")
        .data(nodes, d => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
          .attr("transform", d => `translate(${source.y0},${source.x0})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0)
          .on("click", d => {
            d.children = d.children ? null : d._children;
            update(d);
          });

      nodeEnter.append("circle")
          .attr("r", 2.5)
          .attr("fill", d => d._children ? "#555" : "#999");

      nodeEnter.append("text")
          .attr("dy", "0.31em")
          .attr("x", d => d._children ? -6 : 6)
          .attr("text-anchor", d => d._children ? "end" : "start")
          .text(d => d.data.name)
        .clone(true).lower()
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .attr("stroke", "white");

      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
          .attr("transform", d => `translate(${d.y},${d.x})`)
          .attr("fill-opacity", 1)
          .attr("stroke-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
          .attr("transform", d => `translate(${source.y},${source.x})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);

      // Update the links…
      const link = gLink.selectAll("path")
        .data(links, d => d.target.id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append("path")
          .attr("d", d => {
            const o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
          .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
          .attr("d", d => {
            const o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          });

      // Stash the old positions for transition.
      root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    update(root);

    return svg.node();
  }

  public transformNode(element: HTMLElement): DRNodeD3Tree {
    const fixed = this.getParentCount(element) === 0;

    return {
      element,
      fixed,
      label: this.getElementLabel(element),
      group: 1,
      size: 20 + element.childElementCount * 1,
      childCount: element.childElementCount,
      parentCount: this.getParentCount(element),
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

}
