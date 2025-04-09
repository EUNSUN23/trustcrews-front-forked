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
import PostTitleField from "@/features/registerProjectPost/fields/PostTitleField";
import NameField from "@/features/registerProjectPost/fields/NameField";
import SubjectField from "@/features/registerProjectPost/fields/SubjectField";
import PositionField from "@/features/registerProjectPost/fields/PositionField";
import DateField from "@/features/registerProjectPost/fields/DateField";
import TechStackField from "@/features/registerProjectPost/fields/TechStackField";
import ContactField from "@/features/registerProjectPost/fields/ContactField";
import IntroField from "@/features/registerProjectPost/fields/IntroField";

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
            <PostTitleField />
            <div className='grid pc:grid-cols-2 tablet:grid-cols-1 gap-y-10 place-content-between mobile:place-content-center'>
                <NameField />
                <SubjectField />
                <PositionField />
                <DateField />
                <TechStackField />
                <ContactField />
            </div>
            <IntroField />
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
