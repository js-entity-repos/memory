import FacadeImport from '@js-entity-repos/core/dist/Facade';
import ConfigImport from './Config';
import facadeImport from './facade';
import * as functionsImport from './functions';
import * as utilsImport from './utils';

export type Facade<Id, Entity> = FacadeImport<Id, Entity>;
export const facade = facadeImport;
export type Config<Entity> = ConfigImport<Entity>;
export const utils = utilsImport;
export const functions = functionsImport;
