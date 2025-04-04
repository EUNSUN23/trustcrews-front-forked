type RetryRequest = (error: Error | null) => void;

// 토큰 재발급 이후 실행될 재요청 처리 queue 목록 (사용자 계정별 queue 존재)
const retryRequests: Map<string, RetryRequest[]> = new Map<
  string,
  RetryRequest[]
>();

// 토큰 재발급 진행중인 사용자 계정 목록
const revalidatingUsers: Set<string> = new Set<string>();

// 현재 계정으로 진행되고 있는 토큰 재발급 있는지 확인
export function isRevalidatingUser(userId: string) {
  return revalidatingUsers.has(userId);
}

// 토큰 재발급 진행 계정 추가
export function addToRevalidatingUsers(userId: string) {
  revalidatingUsers.add(userId);
}

// 토큰 재발급 진행 계정 삭제
export function deleteFromRevalidatingUsers(userId: string) {
  revalidatingUsers.delete(userId);
}

// 사용자의 재요청 처리 큐에 요청 추가
export function addToRetryRequests(
  userId: string,
  callback: RetryRequest,
): void {
  if (retryRequests.get(userId) === undefined) {
    retryRequests.set(userId, [callback]);
  } else {
    const queue = retryRequests.get(userId)!;
    queue.push(callback);
  }
}

// 사용자의 재요청 처리큐 삭제
export function deleteFromRetryRequests(userId: string) {
  retryRequests.delete(userId);
}

// 사용자의 재요청 처리큐 수행
export function processRetryRequests(userId: string, error: Error | null) {
  const queue = retryRequests.get(userId)!;
  queue.forEach((callback) => {
    callback(error);
  });
  deleteFromRetryRequests(userId);
}
