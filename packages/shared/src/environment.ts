export function readRequiredEnv(name: string, source: NodeJS.ProcessEnv = process.env): string {
  const value = source[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function readOptionalEnv(
  name: string,
  fallback: string,
  source: NodeJS.ProcessEnv = process.env,
): string {
  return source[name] ?? fallback;
}
