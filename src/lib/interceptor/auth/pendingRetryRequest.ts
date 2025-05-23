import PendingRequestStore from '@/lib/interceptor/auth/PendingRequestStore';

const pendingRetryRequest = new PendingRequestStore();
export default pendingRetryRequest;
