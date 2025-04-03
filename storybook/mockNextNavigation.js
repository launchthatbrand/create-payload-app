// Mock Next.js navigation hooks
export function useRouter() {
  return {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: () => Promise.resolve(true),
    replace: () => Promise.resolve(true),
    reload: () => {},
    back: () => {},
    prefetch: () => Promise.resolve(true),
    beforePopState: () => {},
    events: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
    isFallback: false,
    isReady: true,
  }
}

export function usePathname() {
  return '/'
}

export function useSearchParams() {
  return new URLSearchParams()
}

export function useParams() {
  return {}
}

// Mock navigation functions
export const redirect = () => {}
export const notFound = () => {}

// Default export for module aliasing
export default {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
  redirect,
  notFound,
}
