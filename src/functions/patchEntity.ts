import { Opts, Result } from '@js-entity-repos/core/dist/signatures/PatchEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { difference } from 'lodash';
import FacadeConfig from '../FacadeConfig';
import filterEntity from '../utils/filterEntity';

export default <E extends Entity>({ entityName, getEntities, setEntities }: FacadeConfig<E>) => {
  return ({ id, patch, filter = {} }: Opts<E>): Result<E> => {
    const entities = getEntities();
    const matchedEntity = filterEntity({ entities, entityName, id, filter });
    const patchedEntity = { ...matchedEntity as any, ...patch as any } as E;
    const unmatchedEntities = difference(entities, [matchedEntity]);
    setEntities([...unmatchedEntities, patchedEntity]);
    return { entity: patchedEntity };
  };
};
