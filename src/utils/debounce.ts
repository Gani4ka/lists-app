export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}
