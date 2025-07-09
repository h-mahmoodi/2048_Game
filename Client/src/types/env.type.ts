export enum EnvKeys {
  MODAL_DOM_ID = 'VITE_MODAL_DOM_ID',
  GAME_INITIAL_SIZE = 'VITE_GAME_INITIAL_SIZE',
  DARK_MODE = 'VITE_DARK_MODE',
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
