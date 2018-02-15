import RemoveEntities from '@js-entity-repos/core/dist/signatures/RemoveEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <E extends Entity>(config: Config<E>): RemoveEntities<E> => {
  return async ({ filter = {} }) => {
    const entities = config.getEntities();
    const removalFilter = { $nor: [filter] };
    const unmatchedEntities = filterEntities({ entities, filter: removalFilter });
    config.setEntities(unmatchedEntities);
  };
};
