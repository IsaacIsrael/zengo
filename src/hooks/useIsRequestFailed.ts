import useIsRequest from './useIsRequest';

const useIsRequestFailed = (action: string): boolean => {
  return useIsRequest('failed', action);
};

export default useIsRequestFailed;
