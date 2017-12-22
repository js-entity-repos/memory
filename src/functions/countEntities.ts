import CountEntities from '@js-entity-repos/core/dist/signatures/CountEntities';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <Entity>(config: Config<Entity>): CountEntities<Entity> => {
  return async ({ filter }) => {
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities(storedEntities, filter);
    const count = matchedEntities.length;
    return { count };
  };
};
