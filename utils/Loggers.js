module.exports = {
    error: (...log) => {
      if (process.env.QUIET_ERROR == "true") return;
      console.error(...log);
    },
    info: (...log) => {
      if (process.env.QUIET_INFO == "true") return;
      console.info(...log);
    }
  }