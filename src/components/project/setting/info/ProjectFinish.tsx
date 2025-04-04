import Button from '@/components/ui/Button';
import { endProject as endProjectAPI } from '@/service/project/project';
import { useSetRecoilState } from 'recoil';
import { snackbarState } from '@/store/CommonStateStore';
import { useRouter } from 'next/navigation';

function ProjectFinish({ projectId }: { projectId: string }) {
  const setSnackbar = useSetRecoilState(snackbarState);
  const router = useRouter();

  const endProject = async () => {
    if (confirm('프로젝트를 종료하시겠습니까?')) {
      const res = await endProjectAPI(projectId);
      if (res.result === 'success') {
        setSnackbar({
          show: true,
          type: 'SUCCESS',
          content: '프로젝트를 종료했습니다.',
        });
        router.replace('/');
      } else if (res.result === 'fail') {
        setSnackbar({ show: true, type: 'ERROR', content: res.message });
      } else {
        setSnackbar({
          show: true,
          type: 'ERROR',
          content: '프로세스 수행중 에러가 발생했습니다.',
        });
      }
    }
  };

  return (
    <Button theme='danger' size='md' onClickHandler={endProject}>
      프로젝트 종료
    </Button>
  );
}

export default ProjectFinish;
