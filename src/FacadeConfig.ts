import Entity from '@js-entity-repos/core/dist/types/Entity';

export default interface FacadeConfig<E extends Entity> {
  readonly getEntities: () => E[];
  readonly setEntities: (entities: E[]) => void;
  readonly entityName: string;
  readonly defaultPaginationLimit: number;
}
