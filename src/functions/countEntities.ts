import CountEntities from '@js-entity-repos/core/dist/signatures/CountEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <E extends Entity>(config: Config<E>): CountEntities<E> => {
  return async ({ filter = {} }) => {
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities(storedEntities, filter);
    const count = matchedEntities.length;
    return { count };
  };
};
