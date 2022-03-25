// eslint-disable-next-line @typescript-eslint/ban-types
const timeout = <T>(sec: number, promise: Promise<T>, timeoutCallback?: Function): Promise<T> => {
  const timeoutPromise = new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);

      if (timeoutCallback) {
        timeoutCallback();
      }

      // eslint-disable-next-line prefer-promise-reject-errors
      reject(new Error('TimeOut'));
    }, sec * 1000);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeoutPromise]);
};

export default timeout;
