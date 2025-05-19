import { HttpError } from '@/utils/clientApi/HttpError';

const handleResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    const body = await res.json().catch(() => null);

    throw new HttpError(res.status, res.statusText, body?.message);
  }
};

export default handleResponse;
