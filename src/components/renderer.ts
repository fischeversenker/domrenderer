export interface DRRenderer {
  constructor: Function;
  render(nodes: DRNode[], links: DRLink[]): void;
  reset(): void;
  setConfig(config?: any): void;
  update: () => void;
  transformNode(element: HTMLElement): DRNode;
  transformLink(source: number, target: number): DRLink;
  configurableOptions?: any;
}

export interface DRNode {
  element: HTMLElement;
  label: string;
}

export interface DRLink {
  source: number;
  target: number;
  index?: number;
}
