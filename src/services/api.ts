async function request<T>(
  method: string,
  url: string,
  body?: unknown
) {
  const response = await fetch(
    import.meta.env.VITE_API_ROOT + url,
    {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
        ? JSON.stringify(body)
        : undefined
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Something went wrong'
    );
  }

  return {
    data: data as T
  };
}

export function get<T>(url: string) {
  return request<T>('GET', url);
}

export function post<T>(
  url: string,
  body: unknown
) {
  return request<T>('POST', url, body);
}

export function put<T>(
  url: string,
  body: unknown
) {
  return request<T>('PUT', url, body);
}