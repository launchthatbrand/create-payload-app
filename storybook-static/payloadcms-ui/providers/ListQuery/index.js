'use client';

import { jsx as _jsx } from "react/jsx-runtime";
import { useRouter, useSearchParams } from 'next/navigation.js';
import { isNumber, transformColumnsToSearchParams } from 'payload/shared';
import * as qs from 'qs-esm';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useListDrawerContext } from '../../elements/ListDrawer/Provider.js';
import { useEffectEvent } from '../../hooks/useEffectEvent.js';
import { useRouteTransition } from '../../providers/RouteTransition/index.js';
import { parseSearchParams } from '../../utilities/parseSearchParams.js';
import { ListQueryContext, ListQueryModifiedContext } from './context.js';
export { useListQuery } from './context.js';
export const ListQueryProvider = ({
  children,
  collectionSlug,
  columns,
  data,
  defaultLimit,
  defaultSort,
  listPreferences,
  modifySearchParams,
  onQueryChange: onQueryChangeFromProps
}) => {
  'use no memo';

  const router = useRouter();
  const rawSearchParams = useSearchParams();
  const {
    startRouteTransition
  } = useRouteTransition();
  const [modified, setModified] = useState(false);
  const searchParams = useMemo(() => parseSearchParams(rawSearchParams), [rawSearchParams]);
  const contextRef = useRef({});
  contextRef.current.modified = modified;
  const {
    onQueryChange
  } = useListDrawerContext();
  const [currentQuery, setCurrentQuery] = useState(() => {
    if (modifySearchParams) {
      return searchParams;
    } else {
      return {};
    }
  });
  const refineListData = useCallback(
  // eslint-disable-next-line @typescript-eslint/require-await
  async (incomingQuery, modified_0) => {
    if (modified_0 !== undefined) {
      setModified(modified_0);
    } else {
      setModified(true);
    }
    let page = 'page' in incomingQuery ? incomingQuery.page : currentQuery?.page;
    if ('where' in incomingQuery || 'search' in incomingQuery) {
      page = '1';
    }
    const newQuery = {
      columns: 'columns' in incomingQuery ? incomingQuery.columns : currentQuery.columns,
      limit: 'limit' in incomingQuery ? incomingQuery.limit : currentQuery?.limit ?? String(defaultLimit),
      page,
      preset: 'preset' in incomingQuery ? incomingQuery.preset : currentQuery?.preset,
      search: 'search' in incomingQuery ? incomingQuery.search : currentQuery?.search,
      sort: 'sort' in incomingQuery ? incomingQuery.sort : currentQuery?.sort ?? defaultSort,
      where: 'where' in incomingQuery ? incomingQuery.where : currentQuery?.where
    };
    if (modifySearchParams) {
      startRouteTransition(() => router.replace(`${qs.stringify({
        ...newQuery,
        columns: JSON.stringify(newQuery.columns)
      }, {
        addQueryPrefix: true
      })}`));
    } else if (typeof onQueryChange === 'function' || typeof onQueryChangeFromProps === 'function') {
      const onChangeFn = onQueryChange || onQueryChangeFromProps;
      onChangeFn(newQuery);
    }
    setCurrentQuery(newQuery);
  }, [currentQuery?.columns, currentQuery?.limit, currentQuery?.page, currentQuery?.search, currentQuery?.sort, currentQuery?.where, currentQuery?.preset, startRouteTransition, defaultLimit, defaultSort, modifySearchParams, onQueryChange, onQueryChangeFromProps, router]);
  const handlePageChange = useCallback(async arg => {
    await refineListData({
      page: String(arg)
    });
  }, [refineListData]);
  const handlePerPageChange = React.useCallback(async arg_0 => {
    await refineListData({
      limit: String(arg_0),
      page: '1'
    });
  }, [refineListData]);
  const handleSearchChange = useCallback(async arg_1 => {
    const search = arg_1 === '' ? undefined : arg_1;
    await refineListData({
      search
    });
  }, [refineListData]);
  const handleSortChange = useCallback(async arg_2 => {
    await refineListData({
      sort: arg_2
    });
  }, [refineListData]);
  const handleWhereChange = useCallback(async arg_3 => {
    await refineListData({
      where: arg_3
    });
  }, [refineListData]);
  const syncQuery = useEffectEvent(() => {
    let shouldUpdateQueryString = false;
    const newQuery_0 = {
      ...(currentQuery || {})
    };
    // Allow the URL to override the default limit
    if (isNumber(defaultLimit) && !('limit' in currentQuery)) {
      newQuery_0.limit = String(defaultLimit);
      shouldUpdateQueryString = true;
    }
    // Allow the URL to override the default sort
    if (defaultSort && !('sort' in currentQuery)) {
      newQuery_0.sort = defaultSort;
      shouldUpdateQueryString = true;
    }
    // Only modify columns if they originated from preferences
    // We can assume they did if `listPreferences.columns` is defined
    if (columns && listPreferences?.columns && !('columns' in currentQuery)) {
      newQuery_0.columns = transformColumnsToSearchParams(columns);
      shouldUpdateQueryString = true;
    }
    if (shouldUpdateQueryString) {
      setCurrentQuery(newQuery_0);
      // Do not use router.replace here to avoid re-rendering on initial load
      window.history.replaceState(null, '', `?${qs.stringify({
        ...newQuery_0,
        columns: JSON.stringify(newQuery_0.columns)
      })}`);
    }
  });
  // If `defaultLimit` or `defaultSort` are updated externally, update the query
  // I.e. when HMR runs, these properties may be different
  useEffect(() => {
    if (modifySearchParams) {
      syncQuery();
    }
  }, [defaultSort, defaultLimit, modifySearchParams, columns]);
  return /*#__PURE__*/_jsx(ListQueryContext, {
    value: {
      collectionSlug,
      data,
      handlePageChange,
      handlePerPageChange,
      handleSearchChange,
      handleSortChange,
      handleWhereChange,
      query: currentQuery,
      refineListData,
      setModified,
      ...contextRef.current
    },
    children: /*#__PURE__*/_jsx(ListQueryModifiedContext, {
      value: modified,
      children: children
    })
  });
};
//# sourceMappingURL=index.js.map