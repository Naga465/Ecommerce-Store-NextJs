export const all = 0;

export const debounce = (delayFunc: Function, delay: number) => {
    let time: NodeJS.Timeout;
    return (...args: any) => {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        delayFunc.apply({}, args);
      }, delay);
    };
  };
  