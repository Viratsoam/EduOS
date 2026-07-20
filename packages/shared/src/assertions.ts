export function assertDefined<TValue>(
  value: TValue | null | undefined,
  message: string,
): asserts value is TValue {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}
