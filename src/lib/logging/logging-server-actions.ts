import { Logger } from '@logtail/next';

export const log = new Logger();

export const formatServerActionName = (
  actionName: string,
  additionalInfo?: string,
) =>
  additionalInfo
    ? `Server Action: ${actionName} - ${additionalInfo}`
    : `Server Action: ${actionName}`;
