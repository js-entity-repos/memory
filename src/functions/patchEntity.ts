import PatchEntity from '@js-entity-repos/core/dist/signatures/PatchEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { difference } from 'lodash';
import Config from '../Config';
import filterEntity from '../utils/filterEntity';

export default <E extends Entity>(config: Config<E>): PatchEntity<E> => {
  return async ({ id, patch, filter = {} }) => {
    const storedEntities = config.getEntities();
    const matchedEntity = filterEntity(config, id, filter);
    const patchedEntity = { ...matchedEntity as any, ...patch as any } as E;
    const unmatchedEntities = difference(storedEntities, [matchedEntity]);
    config.setEntities([...unmatchedEntities, patchedEntity]);
    return { entity: patchedEntity };
  };
};
