import { AnyAction } from 'redux';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ActionRequest = {
  action: AnyAction;
  status: RequestStatus;
  errorMessage?: string;
};
