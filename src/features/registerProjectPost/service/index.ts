import { CreatePostForm } from '@/app/postRegister/_utils/type';
import { throwErrorIfInvalid } from '@/utils/common';
import _ from 'lodash';
import { request } from '@/lib/clientApi/request';

/**
 * 게시글 생성
 * @param createData
 */
export const createPost = async (createData: CreatePostForm) => {
  const {
    project: { technologyIds, name, subject, endDate, startDate },
    board: { title, content, contact, positionIds },
  } = createData;

  throwErrorIfInvalid(_.isEqual('', title), '제목을 입력해주세요.');
  throwErrorIfInvalid(_.isEqual('', name), '프로젝트 이름을 입력해주세요.');
  throwErrorIfInvalid(_.isEqual('', content), '프로젝트 소개를 입력해주세요.');
  throwErrorIfInvalid(_.isEqual('', contact), '연락 방법을 입력해주세요.');
  throwErrorIfInvalid(_.isEqual('', startDate), '시작 날짜를 선택해주세요.');
  throwErrorIfInvalid(_.isEqual('', endDate), '종료 날짜를 선택해주세요.');
  throwErrorIfInvalid(_.isEqual('', subject), '프로젝트 주제를 입력해주세요.');
  throwErrorIfInvalid(_.isEmpty(positionIds), '모집 분야를 선택해주세요.');
  throwErrorIfInvalid(_.isEmpty(technologyIds), '관심 스택을 선택해주세요.');

  return await request('POST', `/api/post`, createData);
};
