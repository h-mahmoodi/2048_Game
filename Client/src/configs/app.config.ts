import { EnvKeys, EnvReturnType } from '@/types/env.type';
import { getEnv } from '@/utils/env.utils';

export const APP_CONFIG = {
  MODAL_DOM_ID: getEnv({
    key: EnvKeys.APP_MODAL_DOM_ID,
    type: EnvReturnType.STRING,
    fallback: 'modal',
  }),
  DARK_MODE: getEnv({
    key: EnvKeys.APP_DARK_MODE,
    type: EnvReturnType.BOOLEAN,
    fallback: true,
  }),
};
