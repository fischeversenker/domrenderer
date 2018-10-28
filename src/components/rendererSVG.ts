import { DRRenderer, DRLink, DRNode } from "./renderer";

export default class DRRendererSVG implements DRRenderer {

  private container: HTMLElement | null = null;
  private config: any = {};

  public setup(container: HTMLElement, config?: any) {
    this.container = container;
    this.config = config || {};
  };

  public render(nodes: DRNode[], links: DRLink[]) {
    console.log({ nodes, links });
  }

  public setConfig(config: any) {
    this.config = config;
  }

  public update() {
    console.log('update');
  }

  public transformNode(element: HTMLElement): DRNode {
    return {
      element,
      label: element.tagName,
    };
  }

  public transformLink(source: number, target: number): DRLink {
    return {
      source,
      target,
    };
  }

  public reset() {
    void(0);
  }

  get configurableOptions() {
    // dummy
    return {
      linkLength: {
        type: 'range',
        value: 7,
        range: {
          min: 0,
          max: 14,
        },
        label: 'Link Length',
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
    };
  }
}
