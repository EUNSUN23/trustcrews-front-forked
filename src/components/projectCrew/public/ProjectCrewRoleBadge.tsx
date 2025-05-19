import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';
import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/shared/styles/cn';
import { ProjectAuthCode } from '@/types/data/projectAuth';
import { PROJECT_AUTH_CODE } from '@/constants/data/projectAuthCode';

const { MANAGER: MANAGER_AUTH, CREW: CREW_AUTH } = PROJECT_AUTH_CODE;

const ProjectCrewRoleBadgeVariants = cva(
  'inline-flex items-center rounded-full font-medium',
  {
    variants: {
      auth: {
        [MANAGER_AUTH]: 'bg-[#FF513A] text-[#FFFFFF]',
        [CREW_AUTH]: 'bg-[#FFF9CF] text[#7B5C03]',
      },
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface ProjectCrewRoleBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ProjectCrewRoleBadgeVariants> {
  auth: ProjectAuthCode;
}

const ProjectCrewRoleBadge = ({
  size,
  auth,
  ...props
}: ProjectCrewRoleBadgeProps) => {
  return (
    <span
      {...props}
      className={cn(
        ProjectCrewRoleBadgeVariants({ size, auth }),
        props.className,
      )}
    >
      {props.children}
    </span>
  );
};

export default ProjectCrewRoleBadge;
