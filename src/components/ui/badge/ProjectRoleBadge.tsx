import { ProjectAuthMap } from '@/utils/type';
import { BadgeVariants } from '@/utils/badge';
import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const PROJECT_ROLE_COLOR = {
  MANAGER: 'bg-[#FF513A] text-[#FFFFFF]',
  CREW: 'bg-[#FFF9CF] text[#7B5C03]',
} as const;
const { MANAGER, CREW } = PROJECT_ROLE_COLOR;

const projectRoleBadgeColorClass = (projectAuth: ProjectAuthMap) =>
  clsx({
    [MANAGER]: projectAuth.code === 'PAUTH_1001',
    [CREW]: projectAuth.name === 'PAUTH_2001',
  });

const ProjectRoleBadgeVariants = (projectAuth: ProjectAuthMap) =>
  BadgeVariants(
    `inline-flex items-center rounded-full font-medium`,
    projectRoleBadgeColorClass(projectAuth),
  );

interface ProjectRoleBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<ReturnType<typeof ProjectRoleBadgeVariants>> {
  projectAuth: ProjectAuthMap;
}

function ProjectRoleBadge({
  projectAuth,
  size,
  ...props
}: ProjectRoleBadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        ProjectRoleBadgeVariants(projectAuth)({ size }),
        props.className,
      )}
    >
      {projectAuth.name}
    </span>
  );
}

export default ProjectRoleBadge;
