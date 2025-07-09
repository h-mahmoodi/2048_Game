import { EnvKeys, EnvReturnType } from '@/types/env.type';
import { getEnv } from '@/utils/env.utils';

export const GAME_CONFIG = {
  INITIAL_SIZE: getEnv({
    key: EnvKeys.GAME_INITIAL_SIZE,
    type: EnvReturnType.NUMBER,
    fallback: 4,
  }),
  INITIAL_MAX_VALUE: getEnv({
    key: EnvKeys.GAME_INITIAL_MAX_VALUE,
    type: EnvReturnType.NUMBER,
    fallback: 2048,
  }),
};
