export const createRequestHeaders = (requestInit: RequestInit) => {
  const headers = new Headers(requestInit.headers);

  if (!headers.get('Content-Type') && !(requestInit.body instanceof Blob)) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
};
