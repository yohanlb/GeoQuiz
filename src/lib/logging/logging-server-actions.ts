import { PROJECT_FEATURES } from '@lib/data/consts';

type FeatureName = keyof typeof PROJECT_FEATURES;

export const formatServerActionName = (
  actionName: string,
  additionalInfo?: string,
) =>
  additionalInfo
    ? `Server Action: ${actionName} - ${additionalInfo}`
    : `Server Action: ${actionName}`;

export const formatWithFeatureName = (
  messageToFormat: string,
  featureName?: FeatureName,
) => {
  return `[${featureName ?? ''}] ${messageToFormat}`;
};
