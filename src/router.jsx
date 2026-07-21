// A tiny client-side router built on the History API — no dependency needed for
// a handful of routes. Real paths (/blog, /blog/my-post) are served by the
// SPA rewrite in vercel.json, so deep links and refreshes work in production.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const RouterContext = createContext({ path: "/", navigate: () => {} });

function normalize(path) {
  if (!path) return "/";
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname));

  useEffect(() => {
    // Redirect legacy hash routes (the old site used #/proofs) to real paths.
    if (window.location.hash.startsWith("#/")) {
      const to = window.location.hash.slice(1);
      window.history.replaceState({}, "", to);
      setPath(normalize(to));
    }
    const onPop = () => setPath(normalize(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to) => {
    if (normalize(to) !== normalize(window.location.pathname)) {
      window.history.pushState({}, "", to);
      setPath(normalize(to));
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function useNavigate() {
  return useContext(RouterContext).navigate;
}

// Drop-in replacement for <a> that navigates without a full page reload.
// Modifier-clicks and middle-clicks fall through to normal browser behaviour.
export function Link({ to, children, className, ...props }) {
  const navigate = useNavigate();
  const onClick = (e) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={onClick} className={className} {...props}>
      {children}
    </a>
  );
}
