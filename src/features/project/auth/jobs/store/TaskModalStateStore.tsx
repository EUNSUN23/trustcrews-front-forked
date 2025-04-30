import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { ModalState } from '@/utils/type';
import _ from 'lodash';
import { v4 } from 'uuid';
import { CreateTaskInput } from '@/features/project/auth/jobs/service/task/createTask';
import { UpdateTaskInput } from '@/features/project/auth/jobs/service/task/updateTask';
import { TASK_STATUS } from '@/features/project/auth/jobs/constants/task/taskStatus';
import { ProjectAuthCode } from '@/features/project/auth/global/types/projectAuth';
import { PROJECT_AUTH_CODE } from '@/features/project/auth/global/constants/projectAuthCode';

const {
  PS002: { code: TASK_PROCESSING },
  PS003: { code: TASK_COMPLETE },
} = TASK_STATUS;

const { CREW: CREW_AUTH } = PROJECT_AUTH_CODE;

export type TaskModalType = 'add' | 'mod';

interface TaskAddModalState extends ModalState {
  projectId: string;
  milestoneId: string;
}

export const taskAddModalStateStore = atom<TaskAddModalState>({
  key: 'taskAddModalStateStore',
  default: {
    isOpen: false,
    title: '업무 추가',
    projectId: '0',
    milestoneId: '0',
  },
});

export type TaskAddModalFieldKey = keyof TaskAddModalData;

export const isTaskAddModalFieldKey = (
  modalType: TaskModalType,
  _: string,
): _ is TaskAddModalFieldKey => {
  return modalType === 'add';
};

export type TaskAddModalData = Omit<CreateTaskInput, 'assignedUserId'> & {
  assignedUserId: string;
};

export const taskAddModalDataStateStore = atom<TaskAddModalData>({
  key: 'taskAddModalDataStateStore',
  default: {
    content: '',
    startDate: '',
    endDate: '',
    assignedUserId: '0',
    contentDetail: '',
  },
});

export interface TaskModModalState extends ModalState {
  workId: string;
  auth: ProjectAuthCode;
}

export const taskModModalStateStore = atom<TaskModModalState>({
  key: 'taskModModalStateStore',
  default: {
    isOpen: false,
    title: '업무 수정',
    workId: '0',
    auth: CREW_AUTH,
  },
});

export type TaskModModalFieldKey = keyof TaskModModalData;

export const isTaskModModalFieldKey = (
  modalType: TaskModalType,
  _: string,
): _ is TaskModModalFieldKey => {
  return modalType === 'mod';
};

export type TaskModModalData = Omit<UpdateTaskInput, 'assignedUserId'> & {
  assignedUserId: string;
};

export const taskModModalDataStateStore = atom<TaskModModalData>({
  key: 'taskModModalDataStateStore',
  default: {
    content: '',
    startDate: '',
    endDate: '',
    assignedUserId: '0',
    contentDetail: '',
    progressStatus: TASK_PROCESSING,
  },
});

export const taskModalDataFieldSelector = selectorFamily({
  key: 'taskModalDataFieldSelector',
  get:
    (param: { modalType: TaskModalType; fieldKey: TaskAddModalFieldKey }) =>
    ({ get }) => {
      const data = isTaskAddModalFieldKey(param.modalType, param.fieldKey)
        ? get(taskAddModalDataStateStore)
        : get(taskModModalDataStateStore);
      return data[param.fieldKey];
    },
  set:
    (param: { modalType: TaskModalType; fieldKey: TaskAddModalFieldKey }) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      if (isTaskAddModalFieldKey(param.modalType, param.fieldKey)) {
        const data = get(taskAddModalDataStateStore);
        set(taskAddModalDataStateStore, {
          ...data,
          [param.fieldKey]: newValue,
        });
      } else if (isTaskModModalFieldKey(param.modalType, param.fieldKey)) {
        const data = get(taskModModalDataStateStore);
        set(taskModModalDataStateStore, {
          ...data,
          [param.fieldKey]: newValue,
        });
      }
    },
});
/**
 * 업무 생성/수정 modal '할일목록' 필드 상태관리 :
 * (조회) contentDetail 필드(문자열) get
 *        -> 각 문자열을 TaskContentDetails 타입으로 변환 ({data: 할일 문자열, id: 랜덤생성한 할 일별 고유id})
 *        -> 하위 selector에서 id를 파라미터로 특정 할일 data 조회
 * (수정) 하위 selector에서 업데이트한 TaskContentDetails를 문자열로 변환 -> 업무 field set
 */
export const taskModalContentDetailSelector = selectorFamily({
  key: 'taskModalContentDetailSelector',
  get:
    (param: TaskModalType) =>
    ({ get }) => {
      const modalData =
        param === 'add'
          ? get(taskAddModalDataStateStore)
          : get(taskModModalDataStateStore);

      const contentDetailMap = new Map();

      if (!modalData.contentDetail) return contentDetailMap;

      const contentDetailArray = modalData.contentDetail.split('&');
      for (const item of contentDetailArray) {
        contentDetailMap.set(v4(), item);
      }

      return contentDetailMap;
    },
  set:
    (param: TaskModalType) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      const modalDataStore =
        param === 'add'
          ? taskAddModalDataStateStore
          : taskModModalDataStateStore;
      const modalData = get(modalDataStore);

      const updatedContentDetailArr = [];
      if (!_.isEmpty(newValue)) {
        for (const [_, value] of newValue) {
          updatedContentDetailArr.push(value);
        }
      }
      const updatedContentDetailString = updatedContentDetailArr.join('&');

      const updated = {
        ...modalData,
        contentDetail: updatedContentDetailString,
      };

      if (param === 'add') {
        set(taskAddModalDataStateStore, updated);
      } else if (param === 'mod') {
        set(taskModModalDataStateStore, updated as TaskModModalData);
      }
    },
});
/**
 * 업무 생성/수정 modal '할일목록' 각 아이템 상태관리 :
 * (조회) TaskContentDetails get -> id를 파라미터로 특정 할일 data 조회
 * (수정) 특정 할일 data 변경 -> TaskContentDetails에 변경내용 set
 */
export const taskContentDetailFieldSelector = selectorFamily({
  key: 'taskContentDetailFieldSelector',
  get:
    (param: { modalType: TaskModalType; idForEdit: string }) =>
    ({ get }) => {
      const contentDetailFields = get(
        taskModalContentDetailSelector(param.modalType),
      );
      return _.isEmpty(contentDetailFields)
        ? ''
        : contentDetailFields.get(param.idForEdit)!;
    },
  set:
    (param: { modalType: TaskModalType; idForEdit: string }) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      const contentDetails = get(
        taskModalContentDetailSelector(param.modalType),
      );

      const newContentDetail = new Map([[param.idForEdit, newValue]]);

      const updatedContentDetails = new Map([
        ...contentDetails,
        ...newContentDetail,
      ]);

      set(
        taskModalContentDetailSelector(param.modalType),
        updatedContentDetails,
      );
    },
});

/**
 * 업무 수정 modal '진행 상태' 필드 상태관리
 * : 수정/생성 form 모두 관리하는 selectorFamily로 관리할 수 없어서 분리
 */
export const taskProgressModFieldSelector = selector({
  key: 'taskProgressModFieldSelector',
  get: ({ get }) => {
    const modalData = get(taskModModalDataStateStore);
    return modalData.progressStatus;
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    const modalData = get(taskModModalDataStateStore);

    set(taskModModalDataStateStore, { ...modalData, progressStatus: newValue });
  },
});

export const taskModalEditDisabledSelector = selectorFamily({
  key: 'taskModalEditDisabledSelector',
  get:
    (param: TaskModalType) =>
    ({ get }) => {
      if (param === 'add') return false;

      const modalData = get(taskModModalDataStateStore);
      const progressStatusCode = modalData.progressStatus;
      return progressStatusCode === TASK_COMPLETE;
    },
});
