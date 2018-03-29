export default <Opts, Result>(fn: (opts: Opts) => Result) => {
  return async (opts: Opts): Promise<Result> => {
    return fn(opts);
  };
};
