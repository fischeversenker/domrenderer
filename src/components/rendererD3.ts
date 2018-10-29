import * as d3 from 'd3';

import { DRNode, DRLink, DRRenderer } from "./renderer";

export interface DRRendererD3Config {
  width: number;
  height: number;
}

export interface DRNodeD3 extends DRNode {
  size: number;
}

const DEFAULT_CONFIG = {
  width: 800,
  height: 400,
}

export default abstract class DRRendererD3 implements DRRenderer {

  constructor(public container: HTMLElement, public config: DRRendererD3Config = DEFAULT_CONFIG) { }

  public setConfig(config?: any) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public reset() {
    this.config = {
      ...DEFAULT_CONFIG,
    };
  }

  public abstract transformNode(el: HTMLElement): DRNode;
  public abstract transformLink(source: number, target: number): DRLink;
  public abstract update: () => void;
  public abstract render(nodes: DRNode[], links: DRLink[]): any;

}
