import _ from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { RequestStatus } from '../types/Request';
import usePrevious from './usePrevious';

const useIsRequest = (desiredStatus: RequestStatus, action: string, showAfterFinished = true): boolean => {
  const status = useSelector<RootState, RequestStatus>(
    ({ requests }) => _.get(requests, `${action}.status`, 'idle') as RequestStatus,
  );
  const previousStatus = usePrevious(status);

  return status === desiredStatus || (previousStatus === desiredStatus && status === 'idle' && showAfterFinished);
};

export default useIsRequest;
