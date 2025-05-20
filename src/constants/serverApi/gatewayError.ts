import HttpStatus from '@/constants/httpStatus';

export const GATEWAY_ERROR = {
  ECONNREFUSED: {
    text: '현재 서비스를 이용하실 수 없습니다. 빠른 시일 내에 복구하도록 하겠습니다.',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  },
} as const;
