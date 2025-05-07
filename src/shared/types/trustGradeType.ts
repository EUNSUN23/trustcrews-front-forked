export type TrustGradeName = 'level1' | 'level2' | 'level3' | 'level4';

export interface TrustGrade {
  name: TrustGradeName;
  minimumScore: number;
  maximumScore: number;
}
