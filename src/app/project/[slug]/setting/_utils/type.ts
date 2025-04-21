import { TRUST_GRADE } from '@/app/project/@setting/_utils/constant';
import { ArrayValue } from '@/utils/type';

export type TrustGradeSelectType = ArrayValue<typeof TRUST_GRADE.values>;
export type TrustGradeNameType = TrustGradeSelectType['name'];
export type TrustGradeValueType = TrustGradeSelectType['value'];
