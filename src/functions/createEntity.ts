import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import { Opts, Result } from '@js-entity-repos/core/dist/signatures/CreateEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import FacadeConfig from '../FacadeConfig';
import filterEntities from '../utils/filterEntities';

export default <E extends Entity>({ entityName, getEntities, setEntities }: FacadeConfig<E>) => {
  return ({ id, entity }: Opts<E>): Result<E> => {
    const entities = getEntities();
    const idFilter = { id } as Filter<E>;
    const matchedEntities = filterEntities({ entities, filter: idFilter });
    if (matchedEntities.length > 0) {
      throw new ConflictingEntityError(entityName, id);
    }
    const createdEntity = { ...entity as any, id };
    setEntities([...entities, createdEntity]);
    return { entity: createdEntity };
  };
};
