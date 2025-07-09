export enum EnvKeys {
  APP_MODAL_DOM_ID = 'VITE_APP_MODAL_DOM_ID',
  APP_DARK_MODE = 'VITE_APP_DARK_MODE',
  GAME_INITIAL_SIZE = 'VITE_GAME_INITIAL_SIZE',
  GAME_INITIAL_MAX_VALUE = 'VITE_GAME_INITIAL_MAX_VALUE',
}

export enum EnvReturnType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

export type EnvMappedType<T> = T extends EnvReturnType.STRING
  ? string
  : T extends EnvReturnType.NUMBER
    ? number
    : T extends EnvReturnType.BOOLEAN
      ? boolean
      : never;

export type GetEnvProps<T> = {
  key: keyof ImportMetaEnv;
  type: T;
  fallback: EnvMappedType<T>;
};
