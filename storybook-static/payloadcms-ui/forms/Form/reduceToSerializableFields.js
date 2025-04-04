const blacklistedKeys = ['validate', 'customComponents'];
const sanitizeField = incomingField => {
  const field = {
    ...incomingField
  } // shallow copy, as we only need to remove top-level keys
  ;
  for (const key of blacklistedKeys) {
    delete field[key];
  }
  return field;
};
/**
 * Takes in FormState and removes fields that are not serializable.
 * Returns FormState without blacklisted keys.
 */
export const reduceToSerializableFields = fields => {
  const result = {};
  for (const key in fields) {
    result[key] = sanitizeField(fields[key]);
  }
  return result;
};
//# sourceMappingURL=reduceToSerializableFields.js.map