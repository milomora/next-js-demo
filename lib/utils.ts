export function updateQueryString(key: string, value: string) {
  const url = new URL(window.location.toString());
  url.searchParams.set(key, value);
  history.pushState(null, '', url);
}
