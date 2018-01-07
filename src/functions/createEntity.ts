import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import CreateEntity from '@js-entity-repos/core/dist/signatures/CreateEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <E extends Entity>(config: Config<E>): CreateEntity<E> => {
  return async ({ id, entity }) => {
    const storedEntities = config.getEntities();
    const idFilter = { id } as Filter<E>;
    const matchedEntities = filterEntities(storedEntities, idFilter);
    if (matchedEntities.length > 0) {
      throw new ConflictingEntityError(config.entityName, id);
    }
    const createdEntity = { ...entity as any, id };
    config.setEntities([...config.getEntities(), createdEntity]);
    return { entity: createdEntity };
  };
};
