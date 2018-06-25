import debounce from 'lodash.debounce'


const sessionTimeout = (logoutFunc) => {
  const threshold = 1000 * 60 * 30; // 30 minute
  let logoutTimer = null;

  const resetTimer = () => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(logoutFunc, threshold);
  }

  const dreset = debounce(resetTimer, 1000);


  [
    'load',
    'mousemove',
    'mousedown',
    'click',
    'scroll',
    'keypress'
  ].forEach(event => {
    window.addEventListener(event, dreset);
  })

  logoutTimer = setTimeout(logoutFunc, threshold);
}

export default sessionTimeout;