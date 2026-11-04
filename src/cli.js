function parseUserId(args) {
  const index = args.indexOf("--user");
  if (index === -1) return null;

  const userId = Number(args[index + 1]);
  return Number.isInteger(userId) ? userId : NaN;
}

module.exports = {
  parseUserId
};
