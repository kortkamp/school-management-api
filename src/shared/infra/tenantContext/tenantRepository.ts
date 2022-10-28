import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  RemoveOptions,
  SaveOptions,
} from 'typeorm';

import { AppDataSource } from '../typeorm';
import { tenantStorage } from './tenantStorage';

/**
 * Note: Set current_tenant session var and executes a query on repository.
 * Usage:
 * const itens = = await tenantTransactionWrapper( manager => {
 *     return manager.getRepository(Entity).find();
 *  });
 *
 * @param {function} callback - a function thar receives an Entity Manager and returns a method to be executed by tenantTransactionWrapper
 * @param {string} providedTenantId - optional tenantId, otherwise tenant will be taken from localStorage
 */
async function tenantWrapper<R>(
  callback: (manager: EntityManager) => Promise<R>,
  providedTenantId?: string,
) {
  const tenantId = providedTenantId || tenantStorage.get();
  let response: R;
  await AppDataSource.transaction(async manager => {
    await manager.query(`SET LOCAL smsystem.current_tenant='${tenantId}';`);
    response = await callback(manager);
  });

  return response;
}

/**
 * Note: Set current_tenant session var and executes a query on repository.
 * Usage:
 * const find = await tenantTransactionWrapper( manager => {
 *     return manager.getRepository(Entity).find();
 *  });
 *
 * const itens = find();
 * @param {function} callback - a function thar receives an Entity Manager and returns a method to be executed by tenantTransactionWrapper
 */
function tenantTransactionWrapper<R>(
  callback: (manager: EntityManager) => Promise<R>,
) {
  return async () => {
    const tenantId = tenantStorage.get();
    let response: R;
    await AppDataSource.transaction(async manager => {
      await manager.query(`SET LOCAL smsystem.current_tenant='${tenantId}';`);
      response = await callback(manager);
    });

    return response;
  };
}

const customRepository = <T>(entity: EntityTarget<T>) => ({
  find: (options?: FindManyOptions<T>) =>
    tenantTransactionWrapper(mng => mng.getRepository(entity).find(options))(),
  findAndCount: (options?: FindManyOptions<T>) =>
    tenantTransactionWrapper(mng =>
      mng.getRepository(entity).findAndCount(options),
    )(),
  save: (entities: DeepPartial<T>[], options?: SaveOptions) =>
    tenantTransactionWrapper(mng =>
      mng.getRepository(entity).save(entities, options),
    )(),
  findOne: (options: FindOneOptions<T>) =>
    tenantTransactionWrapper(async mng =>
      mng.getRepository(entity).findOne(options),
    )(),
  remove: (entities: T[], options?: RemoveOptions) =>
    tenantTransactionWrapper(mng =>
      mng.getRepository(entity).remove(entities, options),
    )(),
  createQueryBuilder: () => {
    throw new Error(
      'Cannot create queryBuilder for that repository type, instead use: tenantWrapper',
    );
  },
  tenantTransactionWrapper,
});

export { tenantTransactionWrapper, customRepository, tenantWrapper };
