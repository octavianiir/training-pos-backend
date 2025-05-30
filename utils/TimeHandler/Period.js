function getPeriod(year) {
  const year_now = year ?? new Date().getFullYear();
  const start_now = findPeriod(year_now, 2024);
  return start_now;
}

function findPeriod(year, start) {
  if (start <= year <= start+5) return [start, start+5];
  if (year > start+5) return findPeriod(year, start+5);
  if (year < start) return findPeriod(year, start-5);
}

module.exports.getPeriod = getPeriod;