'use client';

import { dequal } from 'dequal/lite'; // lite: no need for Map and Set support
import { mergeErrorPaths } from './mergeErrorPaths.js';
/**
 * Merges certain properties from the server state into the client state. These do not include values,
 * as we do not want to update them on the client like that, which would cause flickering.
 *
 * We want to use this to update the error state, and other properties that are not user input, as the error state
 * is the thing we want to keep in sync with the server (where it's calculated) on the client.
 */
export const mergeServerFormState = ({
  acceptValues,
  existingState,
  incomingState
}) => {
  let changed = false;
  const newState = {};
  if (existingState) {
    const serverPropsToAccept = ['passesCondition', 'valid', 'errorMessage', 'errorPaths', 'rows', 'customComponents', 'requiresRender'];
    if (acceptValues) {
      serverPropsToAccept.push('value');
      serverPropsToAccept.push('initialValue');
    }
    for (const [path, newFieldState] of Object.entries(existingState)) {
      if (!incomingState[path]) {
        continue;
      }
      let fieldChanged = false;
      /**
      * Handle error paths
      */
      const errorPathsResult = mergeErrorPaths(newFieldState.errorPaths, incomingState[path].errorPaths);
      if (errorPathsResult.result) {
        if (errorPathsResult.changed) {
          changed = errorPathsResult.changed;
        }
        newFieldState.errorPaths = errorPathsResult.result;
      }
      /**
      * Handle filterOptions
      */
      if (incomingState[path]?.filterOptions || newFieldState.filterOptions) {
        if (!dequal(incomingState[path]?.filterOptions, newFieldState.filterOptions)) {
          changed = true;
          fieldChanged = true;
          newFieldState.filterOptions = incomingState[path].filterOptions;
        }
      }
      /**
      * Handle adding all the remaining props that should be updated in the local form state from the server form state
      */
      serverPropsToAccept.forEach(prop => {
        if (!dequal(incomingState[path]?.[prop], newFieldState[prop])) {
          changed = true;
          fieldChanged = true;
          if (!(prop in incomingState[path])) {
            // Regarding excluding the customComponents prop from being deleted: the incoming state might not have been rendered, as rendering components for every form onchange is expensive.
            // Thus, we simply re-use the initial render state
            if (prop !== 'customComponents') {
              delete newFieldState[prop];
            }
          } else {
            newFieldState[prop] = incomingState[path][prop];
          }
        }
      });
      if (newFieldState.valid !== false) {
        newFieldState.valid = true;
      }
      if (newFieldState.passesCondition !== false) {
        newFieldState.passesCondition = true;
      }
      // Conditions don't work if we don't memcopy the new state, as the object references would otherwise be the same
      newState[path] = fieldChanged ? {
        ...newFieldState
      } : newFieldState;
    }
    // Now loop over values that are part of incoming state but not part of existing state, and add them to the new state.
    // This can happen if a new array row was added. In our local state, we simply add out stubbed `array` and `array.[index].id` entries to the local form state.
    // However, all other array sub-fields are not added to the local state - those will be added by the server and may be incoming here.
    for (const [path, field] of Object.entries(incomingState)) {
      if (!existingState[path]) {
        changed = true;
        newState[path] = field;
      }
    }
  }
  return {
    changed,
    newState
  };
};
//# sourceMappingURL=mergeServerFormState.js.map