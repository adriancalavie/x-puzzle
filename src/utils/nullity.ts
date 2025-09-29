export const notNull = <T>(value: T | null): value is T => value !== null;
export const isNull = <T>(value: T | null): value is null => value === null;
