import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { ModalState } from '@/utils/type';
import _ from 'lodash';
import { v4 } from 'uuid';
import { CreateTaskInput } from '@/features/project/auth/myProject/jobs/service/task/createTask';
import { UpdateTaskInput } from '@/features/project/auth/myProject/jobs/service/task/updateTask';
import { TASK_STATUS } from '@/features/project/auth/myProject/jobs/constants/task/taskStatus';

const {
  PS002: { code: TASK_PROCESSING },
  PS003: { code: TASK_COMPLETE },
} = TASK_STATUS;

export const taskAddModalStateStore = atom<ModalState>({
  key: 'taskAddModalStateStore',
  default: {
    isOpen: false,
    title: '업무 추가',
  },
});
export const taskAddModalDataStateStore = atom<CreateTaskInput>({
  key: 'taskAddModalDataStateStore',
  default: {
    content: '',
    startDate: '',
    endDate: '',
    assignedUserId: 0n,
    contentDetail: '',
  },
});
export type TaskAddModalFieldKey = keyof CreateTaskInput;
export type TaskAddModalField<T> = CreateTaskInput[Extract<
  TaskAddModalFieldKey,
  T
>];
export const taskModModalStateStore = atom<ModalState>({
  key: 'taskModModalStateStore',
  default: {
    isOpen: false,
    title: '업무 수정',
  },
});

export const taskModModalDataStateStore = atom<UpdateTaskInput>({
  key: 'taskModModalDataStateStore',
  default: {
    // workId: 0n,
    content: '',
    startDate: '',
    endDate: '',
    assignedUserId: 0n,
    contentDetail: '',
    progressStatus: TASK_PROCESSING,
    // authMap: '',
  },
});
export type TaskModModalFieldKey = keyof UpdateTaskInput;
export type TaskModModalField<T> = UpdateTaskInput[Extract<
  TaskModModalFieldKey,
  T
>];
export type TaskModalType = 'add' | 'mod';

export const isTaskAddModalFieldKey = (
  modalType: TaskModalType,
  key: string,
): key is TaskAddModalFieldKey => {
  return modalType === 'add';
};

export const isTaskModModalFieldKey = (
  modalType: TaskModalType,
  key: string,
): key is TaskModModalFieldKey => {
  return modalType === 'mod';
};

export const taskModalDataFieldSelector = selectorFamily({
  key: 'taskModalDataFieldSelector',
  get:
    (param: { modalType: TaskModalType; fieldKey: TaskAddModalFieldKey }) =>
    ({ get }) => {
      if (isTaskAddModalFieldKey(param.modalType, param.fieldKey)) {
        const data = get(taskAddModalDataStateStore);
        return data[param.fieldKey] as TaskAddModalField<typeof param.fieldKey>;
      } else if (isTaskModModalFieldKey(param.modalType, param.fieldKey)) {
        const data = get(taskModModalDataStateStore);
        return data[param.fieldKey] as TaskModModalField<typeof param.fieldKey>;
      }
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
        for (const [key, value] of newValue) {
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
        set(taskModModalDataStateStore, updated as UpdateTaskInput);
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
