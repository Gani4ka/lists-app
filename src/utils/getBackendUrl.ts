export function getBackendUrl() {
  const isLocalhost = process.env.NODE_ENV === 'development';
  return isLocalhost
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL;
}
