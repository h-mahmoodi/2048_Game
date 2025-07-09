import { EnvKeys, EnvReturnType } from '@/types/env.type';
import { getEnv } from '@/utils/env.utils';

export const appConfig = {
  MODAL_DOM_ID: getEnv(
    EnvKeys.MODAL_DOM_ID,
    EnvReturnType.STRING,
    'modal'
  ),
};
