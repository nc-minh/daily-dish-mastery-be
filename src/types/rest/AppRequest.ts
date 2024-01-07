import { Request as ExpressRequest } from 'express';
import URLParams from 'types/rest/URLParams';

/**
 * Interface to add extra modifiers to request.
 */
export default interface AppRequest extends ExpressRequest {
  startTime?: number;
  searchParams?: URLParams;
  appName: string;
}
