export interface DRRenderer {
  setup: (container: HTMLElement, config?: any) => void;
  render: (nodes: DRNode[], links: DRLink[]) => void;
  setConfig: (config: any) => void;
  update: () => void;
  transformNode: (element: HTMLElement) => DRNode;
  transformLink: (source: number, target: number) => DRLink;
  reset: () => void;
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
