// tslint:disable-next-line:no-unused
import countEntitiesSignature from '@js-entity-repos/core/dist/signatures/CountEntities';
// tslint:disable-next-line:no-unused
import createEntitySignature from '@js-entity-repos/core/dist/signatures/CreateEntity';
// tslint:disable-next-line:no-unused
import getEntitiesSignature from '@js-entity-repos/core/dist/signatures/GetEntities';
// tslint:disable-next-line:no-unused
import getEntitySignature from '@js-entity-repos/core/dist/signatures/GetEntity';
// tslint:disable-next-line:no-unused
import overwriteEntitySignature from '@js-entity-repos/core/dist/signatures/OverwriteEntity';
// tslint:disable-next-line:no-unused
import patchEntitySignature from '@js-entity-repos/core/dist/signatures/PatchEntity';
// tslint:disable-next-line:no-unused
import removeEntitiesSignature from '@js-entity-repos/core/dist/signatures/RemoveEntities';
// tslint:disable-next-line:no-unused
import removeEntitySignature from '@js-entity-repos/core/dist/signatures/RemoveEntity';
// tslint:disable-next-line:no-unused
import upsertEntitySignature from '@js-entity-repos/core/dist/signatures/UpsertEntity';
// tslint:disable-next-line:no-unused
import Config from '../Config';

import countEntitiesImport from './countEntities';
import createEntityImport from './createEntity';
import getEntitiesImport from './getEntities';
import getEntityImport from './getEntity';
import overwriteEntityImport from './overwriteEntity';
import patchEntityImport from './patchEntity';
import removeEntitiesImport from './removeEntities';
import removeEntityImport from './removeEntity';
import upsertEntityImport from './upsertEntity';

export const countEntities = countEntitiesImport;
export const createEntity = createEntityImport;
export const getEntities = getEntitiesImport;
export const getEntity = getEntityImport;
export const overwriteEntity = overwriteEntityImport;
export const patchEntity = patchEntityImport;
export const removeEntities = removeEntitiesImport;
export const removeEntity = removeEntityImport;
export const upsertEntity = upsertEntityImport;
