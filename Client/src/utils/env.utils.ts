import { type EnvMappedType, EnvReturnType } from '@/types/env.type';
import { assertNever } from './app.utils';

export const getEnv = <T extends EnvReturnType>(
  key: keyof ImportMetaEnv,
  type: T,
  fallback: EnvMappedType<T>
): EnvMappedType<T> => {
  const value = import.meta.env[key] as EnvMappedType<T>;

  if (value == null || value === '') {
    console.warn(`Invalid value for ${key}: ${value}, using fallback`);
    return fallback;
  }
  switch (type) {
    case EnvReturnType.STRING: {
      return value as EnvMappedType<T>;
    }
    case EnvReturnType.NUMBER: {
      const num = Number(value);
      if (isNaN(num)) {
        console.warn(
          `Invalid number value for ${key}: ${value}, using fallback`
        );
        return fallback as EnvMappedType<T>;
      }
      return num as EnvMappedType<T>;
    }
    case EnvReturnType.BOOLEAN: {
      const val = value.toString().toLowerCase();
      if (val === '1' || val === 'true') {
        return true as EnvMappedType<T>;
      }
      if (val === '0' || val === 'false') {
        return false as EnvMappedType<T>;
      }
      console.warn(
        `Invalid boolean value for ${key}: ${value}, using fallback`
      );
      return fallback as EnvMappedType<T>;
    }
    default: {
      return assertNever(type);
    }
  }
};
