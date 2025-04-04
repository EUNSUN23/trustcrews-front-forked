'use client';

import { useRecoilState } from 'recoil';
import { projectNoticeActiveMenuStateStore } from '@/store/project/alert/AlertNavTabStateStore';
import Select from '@/components/ui/selector/Select';
import { classNames } from '@/utils/common';
import { AlertType } from '@/service/project/alert/constant';
import { AlertMenu } from '@/service/project/alert/type';

export default function AlertNavTab() {
  const [{ code: activeCode, name: activeName }, setActiveNoticeMenu] =
    useRecoilState(projectNoticeActiveMenuStateStore);

  const alertNavTabList = Object.values(AlertType)
    .filter((v) => v.code !== 'PRA1001' && v.code !== 'PRA3001')
    .reverse();

  return (
    <nav
      className='flex flex-1 flex-col tablet:max-w-[10rem] mobile:mb-8'
      aria-label='Sidebar'
    >
      <ul role='list' className='mobile:hidden tablet:-mx-2 tablet:space-y-1'>
        {alertNavTabList.map((v) => (
          <li key={v.code}>
            <div
              className={classNames(
                v.code === activeCode
                  ? 'bg-gray-50 text-primary'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                'group flex items-center rounded-md p-5 pl-3 text-xl text-center leading-6 font-medium cursor-pointer',
              )}
              onClick={() => setActiveNoticeMenu(v as AlertMenu)}
            >
              {v.name}
            </div>
          </li>
        ))}
      </ul>
      <div className='mobile:block hidden'>
        <Select
          items={alertNavTabList.map((v) => ({
            name: v.name,
            value: v.code,
          }))}
          label=''
          setValue={(item) =>
            setActiveNoticeMenu({
              code: item.value,
              name: item.name,
              parent: null,
            } as AlertMenu)
          }
          value={{ name: activeName, value: activeCode }}
        />
      </div>
    </nav>
  );
}
