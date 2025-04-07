import FormRowWide from "@/components/ui/form/FormRowWide";
import Button from "@/components/ui/Button";
import {useRouter} from "next/navigation";
import useCreatePost from "@/hooks/post/useCreatePost";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {
    postFormStateStore,
    projectFormStateStore,
    projectPostFormState
} from "@/features/registerProjectPost/store/RegisterProjectPostStateStore";
import {useEffect} from "react";
import PostTitle from "@/features/registerProjectPost/PostTitle";
import ProjectName_Reg from "@/features/registerProjectPost/ProjectName_Reg";
import ProjectSubject_Reg from "@/features/registerProjectPost/ProjectSubject_Reg";
import ProjectRecruitPosition from "@/features/registerProjectPost/ProjectRecruitPosition";
import ProjectDate_Reg from "@/features/registerProjectPost/ProjectDate_Reg";
import ProjectTech from "@/features/registerProjectPost/ProjectTech";
import ProjectOwnerContact from "@/features/registerProjectPost/ProjectOwnerContact";
import ProjectIntro from "@/features/registerProjectPost/ProjectIntro";

export function RegisterProjectPost() {
    const router = useRouter();

    const { createPost, isCreating } = useCreatePost();

    const projectPostForm = useRecoilValue(projectPostFormState);

    const resetPostFormState = useResetRecoilState(postFormStateStore);
    const resetProjectFormState = useResetRecoilState(projectFormStateStore);

    useEffect(() => {
        return () => {
            resetPostFormState();
            resetProjectFormState();
        };
    }, [resetPostFormState, resetProjectFormState]);

    return (
        <div
            role='form'
            aria-label='게시글 및 프로젝트 생성'
            className='p-5 mobile:p-1 mb-8'
        >
            <PostTitle />
            <div className='grid pc:grid-cols-2 tablet:grid-cols-1 gap-y-10 place-content-between mobile:place-content-center'>
                <ProjectName_Reg />
                <ProjectSubject_Reg />
                <ProjectRecruitPosition />
                <ProjectDate_Reg />
                <ProjectTech />
                <ProjectOwnerContact />
            </div>
            <ProjectIntro />
            <FormRowWide className='space-x-2 text-center mt-10'>
                <Button theme='primary-hollow' onClickHandler={() => router.push('/')}>
                    취소
                </Button>
                <Button
                    disabled={isCreating}
                    onClickHandler={() => createPost(projectPostForm)}
                >
                    등록
                </Button>
            </FormRowWide>
        </div>
    );
}
