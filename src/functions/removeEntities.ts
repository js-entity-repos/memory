import { Opts, Result } from '@js-entity-repos/core/dist/signatures/RemoveEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import filterEntities from '../utils/filterEntities';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return ({ filter = {} }: Opts<E>): Result => {
    const entities = config.getEntities();
    const removalFilter = { $nor: [filter] };
    const unmatchedEntities = filterEntities({ entities, filter: removalFilter });
    config.setEntities(unmatchedEntities);
  };
};
