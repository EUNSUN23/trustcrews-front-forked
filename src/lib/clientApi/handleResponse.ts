import { ResponseBody } from '@/types/responseBody';

export async function handleResponse(res: Response) {
  if (res.ok) return res.json();

  const data: ResponseBody<null> = await res.json();
  const errorInstruction = res.headers.get('X-Error-Instruction');

  if (!errorInstruction || errorInstruction === 'NONE') {
    throw new Error();
  }

  if (errorInstruction === 'REDIRECT') {
    const errorRoute = `/error/${res.status}?error=${data.message}`;
    window.location.assign(errorRoute);
  } else if (errorInstruction === 'MESSAGE') {
    return data;
  }
}
