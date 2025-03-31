import { atom } from 'recoil';
import { AlertType } from '@/service/project/alert/constant';
import { AlertMenu } from '@/service/project/alert/type';

export const projectNoticeActiveMenuStateStore = atom<AlertMenu>({
  key: 'projectNoticeActiveMenuState',
  default: AlertType.PRA2001,
});
