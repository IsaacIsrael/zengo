import useIsRequest from './useIsRequest';

const useIsRequestLoading = (action: string): boolean => {
  return useIsRequest('loading', action, false);
};

export default useIsRequestLoading;
