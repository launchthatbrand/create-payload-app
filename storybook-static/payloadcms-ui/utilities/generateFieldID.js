export const generateFieldID = (path, editDepth, uuid) => {
  return `field-${path?.replace(/\./g, '__')}${editDepth > 1 ? `-${editDepth}` : ''}${uuid ? `-${uuid}` : ''}`;
};
//# sourceMappingURL=generateFieldID.js.map