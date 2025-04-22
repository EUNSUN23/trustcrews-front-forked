import { baseBadgeVariants } from '@/utils/badge';
import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';

const ProjectRoleBadgeVariants = cva(
  'inline-flex items-center rounded-full font-medium',
  {
    variants: {
      auth: {
        PAUTH_1001: 'bg-[#FF513A] text-[#FFFFFF]',
        PAUTH_2001: 'bg-[#FFF9CF] text[#7B5C03]',
      },
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface ProjectRoleBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ProjectRoleBadgeVariants> {
  auth: ProjectAuthCode;
}

const ProjectRoleBadge = ({ size, auth, ...props }: ProjectRoleBadgeProps) => {
  return (
    <span
      {...props}
      className={cn(ProjectRoleBadgeVariants({ size, auth }), props.className)}
    >
      {props.children}
    </span>
  );
};

export default ProjectRoleBadge;
