import useIsRequest from './useIsRequest';

const useIsRequestSucceeded = (action: string): boolean => {
  return useIsRequest('succeeded', action);
};

export default useIsRequestSucceeded;
