export enum Ownership {
  Shared = 'Shared',
  Created = 'Created',
}

export interface Diagram {
  id: string;
  name: string;
  nodes: string;
  edges: string;
  createdBy: string;
  shared?: Ownership;
}
