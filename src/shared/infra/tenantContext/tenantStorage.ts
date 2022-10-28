import { storage } from './storage';

const TENANT_KEY = 'tenantId';

const tenantStorage = {
  get: () => storage.getStore().get(TENANT_KEY),

  wrapper: (tenantId: string, callback: () => void) =>
    storage.run(new Map(), () => {
      storage.getStore().set(TENANT_KEY, tenantId);
      callback();
    }),
};

export { tenantStorage };
