import { publicFetchWrapper } from '@/lib/interceptor/public/publicFetchWrapper';
import { reqPLogger, resPLogger } from '@/lib/interceptor/interceptorLogger';
import BACKEND_URL from '@/constants/api/backendUrl';
import { getResponseErrorMessage } from '@/lib/interceptor/getResponseErrorMessage';

const publicFetch = publicFetchWrapper({
  baseUrl: BACKEND_URL,
  interceptors: {
    request: async (requestArgs) => {
      reqPLogger.i(`${requestArgs[1].method || 'GET'}: ${requestArgs[0]}`);
      return requestArgs;
    },
    response: async (response, requestArgs) => {
      const url = requestArgs[0];
      const requestInit = requestArgs[1];

      if (response.ok) {
        resPLogger.i(
          `${requestInit.method || 'GET'}: ${response.status} ${url}`,
        );
        return response;
      } else {
        const errorMessage = await getResponseErrorMessage(response);
        resPLogger.i(
          `${requestInit.method}: ${response.status} ${url} - ${errorMessage}`,
        );
        return response;
      }
    },
  },
});

export default publicFetch;
