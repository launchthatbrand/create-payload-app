'use client';

export const findOptionsByValue = ({
  allowEdit,
  options,
  value
}) => {
  if (value || typeof value === 'number') {
    if (Array.isArray(value)) {
      return value.map(val => {
        let matchedOption;
        options.forEach(optGroup => {
          if (!matchedOption) {
            matchedOption = optGroup.options.find(option => {
              if (typeof val === 'object') {
                return option.value === val.value && option.relationTo === val.relationTo;
              }
              return val === option.value;
            });
          }
        });
        return matchedOption ? {
          allowEdit,
          ...matchedOption
        } : undefined;
      });
    }
    let matchedOption;
    options.forEach(optGroup => {
      if (!matchedOption) {
        matchedOption = optGroup.options.find(option => {
          if (typeof value === 'object') {
            return option.value === value.value && option.relationTo === value.relationTo;
          }
          return value === option.value;
        });
      }
    });
    return matchedOption ? {
      allowEdit,
      ...matchedOption
    } : undefined;
  }
  return undefined;
};
//# sourceMappingURL=findOptionsByValue.js.map