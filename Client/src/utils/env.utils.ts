import {
  type EnvMappedType,
  type GetEnvProps,
  EnvReturnType,
} from '@/types/env.type';
import { assertNever } from './app.utils';

export const getEnv = <T extends EnvReturnType>(
  props: GetEnvProps<T>
): EnvMappedType<T> => {
  const { key, type, fallback } = props;
  const value = import.meta.env[key] as EnvMappedType<T>;

  if (value == null || value === '') {
    console.warn(`Invalid value for ${key}: ${value}, using fallback`);
    return fallback;
  }
  switch (type) {
    case EnvReturnType.STRING: {
      const str = value.toString();
      return str as EnvMappedType<T>;
    }
    case EnvReturnType.NUMBER: {
      const num = Number(value);
      if (isNaN(num)) {
        console.warn(
          `Invalid number value for ${key}: ${value}, using fallback`
        );
        return fallback;
      }
      return num as EnvMappedType<T>;
    }
    case EnvReturnType.BOOLEAN: {
      const bool = value.toString().toLowerCase();
      if (bool === '1' || bool === 'true') {
        return true as EnvMappedType<T>;
      }
      if (bool === '0' || bool === 'false') {
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
