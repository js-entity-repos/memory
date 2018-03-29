import { Opts, Result } from '@js-entity-repos/core/dist/signatures/CountEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import filterEntities from '../utils/filterEntities';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return ({ filter = {} }: Opts<E>): Result => {
    const entities = config.getEntities();
    const matchedEntities = filterEntities({ entities, filter });
    const count = matchedEntities.length;
    return { count };
  };
};
