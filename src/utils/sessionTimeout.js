import throttle from 'lodash.throttle'


const sessionTimeout = (logoutFunc) => {
  const threshold = 1000 * 60 * 30; // 30 minute
  let logoutTimer;

  const resetTimer = () => {
    clearTimeoutFunc();
    setTimeoutFunc();
  }

  const clearTimeoutFunc = () => {
    if (logoutTimer) clearTimeout(logoutTimer);
  }
  const setTimeoutFunc = () => {
    logoutTimer = setTimeout(() => {
      clearTimeoutFunc();
      logoutFunc()
    }, threshold);
  }
  const treset = throttle(resetTimer, 1000);


  [
    'load',
    'mousemove',
    'mousedown',
    'click',
    'scroll',
    'keypress'
  ].forEach(event => {
    window.addEventListener(event, treset);
  })

  setTimeoutFunc();
}

export default sessionTimeout;