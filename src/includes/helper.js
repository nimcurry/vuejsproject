export default {
  formatTime(time) {
    const minute = Math.floor(time / 60) || 0;
    const seconds = Math.round((time - minute * 60) || 0);

    return `${minute}:${seconds < 10 ? 0 : ''}${seconds}`;
  },
};
