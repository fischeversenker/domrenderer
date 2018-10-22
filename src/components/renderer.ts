import * as d3 from 'd3';
import { BaseType, SimulationNodeDatum, Selection } from 'd3';

export default class DOMRenderer {

  private width: number;
  private height: number;
  private nodes: BaseType[] = [];
  private links: any[] = [];
  private entryNodeSelector: string;

  color() {
    const scale = d3.scaleOrdinal(d3.schemeCategory10);
    return (d: any) => scale(d.group);
  }

  forceSimulation(nodes: any, links: any) {
    return d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d: any) => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());
  }

  getChart() {
    const links = this.links.map(d => Object.create(d));
    const nodes = this.nodes.map(d => Object.create(d));

    const ticked = () => {
      link.attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x)
          .attr("cy", d => d.y);
    }

    const svg = d3.select('body')
                  .append('svg')
                  .attr('width', this.width)
                  .attr('height', this.height)
                  .attr("viewBox", `${-this.width / 2}, ${-this.height / 2}, ${this.width}, ${this.height}`);

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .enter().append("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const simulation = this.forceSimulation(nodes, links).on("tick", ticked);

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("r", 5)
        .attr("fill", this.color())
        // TBD: fix this.
        // .call(this.drag(simulation));

    node.append("title")
        .text(d => d.id);

    return svg.node();
  }

  drag(simulation: any) {

    function dragstarted(d: any) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d: any) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d: any) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

  getLevelNodes(node: any) {
    return [ ...node.parentNode.children ];
  }

  getChildIndex(node: any) {
    return this.getLevelNodes(node).indexOf(node);
  }

  tagNodeName(node: any) {
    node.innerHTML = node.nodeName + node.innerHTML;
  }

  clearInside(node: any) {
    [...node.childNodes].forEach(child => {
      if (child.nodeName === '#text') {
        child.remove();
      }
    })
  }

  handleImage(node: any) {
    if (node.nodeName === 'IMG') {
      node.src = '';
      node.alt = 'IMG';
    }
  }

  walk(node: any, cb: any) {
    cb(node)
    if (node.children.length) {
      this.walk(node.children[0], cb);
    }
    if (node.nextElementSibling) {
      this.walk(node.nextElementSibling, cb);
    }
  }

  init() {
    d3.forceSimulation(this.nodes as SimulationNodeDatum[]);
  }

  constructor(node: string, nodes: BaseType[], links: any[]) {
    this.width = 600;
    this.height = 600;
    this.entryNodeSelector = node;
    this.nodes = nodes;
    this.links = links;
    this.init();
  }

}
