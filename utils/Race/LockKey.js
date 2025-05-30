const RACE_LOCK_KEY = "lock:";

function raceLockKey(table, id) {
  return RACE_LOCK_KEY + table + ":" + id;
}

module.exports = {
  RACE_LOCK_KEY,
  raceLockKey
}