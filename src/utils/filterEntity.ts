import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import filterEntities from './filterEntities';

export interface Opts<E extends Entity> {
  readonly entities: E[];
  readonly entityName: string;
  readonly id: string;
  readonly filter: Filter<E>;
}

export default <E extends Entity>({ entities, entityName, id, filter }: Opts<E>) => {
  const idFilter = { id } as Filter<E>;
  const fullFilter = { $and: [idFilter, filter] };
  const matchedEntities = filterEntities({ entities, filter: fullFilter });
  if (matchedEntities.length === 0) {
    throw new MissingEntityError(entityName, id);
  }
  /* istanbul ignore next */
  if (matchedEntities.length > 1) {
    throw new ConflictingEntityError(entityName, id);
  }
  return matchedEntities[0];
};
