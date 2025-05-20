import PendingRequestStore from '@/utils/interceptor/auth/PendingRequestStore';

const pendingRetryRequest = new PendingRequestStore();
export default pendingRetryRequest;
