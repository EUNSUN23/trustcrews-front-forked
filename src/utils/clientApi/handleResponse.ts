import { HttpError } from '@/utils/clientApi/HttpError';

const handleResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    const body = await res.json().catch(() => null);

    throw new HttpError(
      res.status,
      body || {
        result: 'fail',
        data: null,
        message: '요청 수행 중 오류가 발생했습니다.',
      },
      res.statusText,
    );
  }

  // todo - 메세지 연결
  // console.log('res in handle: ', res);
  // const data: ResponseBody<null> = await res.json();
  // const errorInstruction = res.headers.get('X-Error-Instruction');
  //
  // if (!errorInstruction || errorInstruction === 'NONE') {
  //   throw new Error();
  // }
  //
  // if (errorInstruction === 'REDIRECT') {
  //   const errorRoute = `/error/${res.status}?error=${data.message}`;
  //   window.location.assign(errorRoute);
  // } else if (errorInstruction === 'MESSAGE') {
  //   return data;
  // }
};

export default handleResponse;
