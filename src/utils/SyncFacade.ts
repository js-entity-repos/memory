import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';

export type PromiseResult<T> = T extends Promise<infer R> ? R : any;

type SyncFacade<E extends Entity> = {
  readonly [K in keyof Facade<E>]: PromiseResult<Facade<E>[K]>;
};

export default SyncFacade;
