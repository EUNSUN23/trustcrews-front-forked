import { atom, DefaultValue, selectorFamily } from 'recoil';
import { ProjectSettingInfoUpdReqData } from '@/service/project/setting/info';
import { ProjectSettingBoardUpdReqData } from '@/service/project/setting/board';

/**
 * 프로젝트 설정 - 프로젝트 정보 상태 store/selector
 */
export const projectSettingInfoStateStore = atom<ProjectSettingInfoUpdReqData>({
  key: 'projectSettingInfoStateStore',
  default: {
    projectId: 0n,
    authMap: '',
    projectName: '',
    projectSubject: '',
    startDate: '',
    endDate: '',
    technologyIds: [],
  },
});

export type ProjectSettingInfoUpdKey = keyof ProjectSettingInfoUpdReqData;
export type ProjectSettingInfoUpdField<T> =
  ProjectSettingInfoUpdReqData[Extract<ProjectSettingInfoUpdKey, T>];
export const projectSettingInfoSelector = selectorFamily({
  key: 'projectSettingInfoSelector',
  get:
    (param: ProjectSettingInfoUpdKey) =>
    ({ get }) => {
      const res = get(projectSettingInfoStateStore);
      return res[param] as ProjectSettingInfoUpdField<typeof param>;
    },
  set:
    (param: ProjectSettingInfoUpdKey) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      const projectSettingInfoUpdReq = get(projectSettingInfoStateStore);
      const updated = { ...projectSettingInfoUpdReq, [param]: newValue };
      set(projectSettingInfoStateStore, updated);
    },
});

/**
 * 프로젝트 설정 - 프로젝트 게시글 정보 상태 store/selector
 */
export const projectSettingBoardInfoStateStore =
  atom<ProjectSettingBoardUpdReqData>({
    key: 'projectSettingBoardInfoStateStore',
    default: {
      projectId: 0n,
      boardId: 0n,
      authMap: '',
      title: '',
      content: '',
      recruitmentStatus: null,
      contact: '',
      positionIds: [],
    },
  });

export type ProjectSettingBoardUpdReqKey = keyof ProjectSettingBoardUpdReqData;
export type ProjectSettingBoardInfoUpdField<T> =
  ProjectSettingBoardUpdReqData[Extract<ProjectSettingBoardUpdReqKey, T>];
export const projectSettingBoardInfoSelector = selectorFamily({
  key: 'projectSettingBoardInfoSelector',
  get:
    (param: ProjectSettingBoardUpdReqKey) =>
    ({ get }) => {
      const projectSettingBoardInfoUpdReqData = get(
        projectSettingBoardInfoStateStore,
      );
      return projectSettingBoardInfoUpdReqData[
        param
      ] as ProjectSettingBoardInfoUpdField<typeof param>;
    },
  set:
    (param: ProjectSettingBoardUpdReqKey) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      const projectSettingBoardInfoUpdReqData = get(
        projectSettingBoardInfoStateStore,
      );
      const updated = {
        ...projectSettingBoardInfoUpdReqData,
        [param]: newValue,
      };
      set(projectSettingBoardInfoStateStore, updated);
    },
});
