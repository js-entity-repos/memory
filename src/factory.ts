import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Config from './Config';
import countEntities from './functions/countEntities';
import createEntity from './functions/createEntity';
import getEntities from './functions/getEntities';
import getEntity from './functions/getEntity';
import patchEntity from './functions/patchEntity';
import removeEntities from './functions/removeEntities';
import removeEntity from './functions/removeEntity';
import replaceEntity from './functions/replaceEntity';

export default <E extends Entity>(config: Config<E>): Facade<E> => {
  return {
    countEntities: countEntities<E>(config),
    createEntity: createEntity<E>(config),
    getEntities: getEntities<E>(config),
    getEntity: getEntity<E>(config),
    patchEntity: patchEntity<E>(config),
    removeEntities: removeEntities<E>(config),
    removeEntity: removeEntity<E>(config),
    replaceEntity: replaceEntity<E>(config),
  };
};
