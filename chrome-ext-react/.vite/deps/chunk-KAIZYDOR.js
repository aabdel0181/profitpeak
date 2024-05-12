import {
  __toESM,
  require_react
} from "./chunk-5VW2NNEB.js";

// node_modules/@mantine/hooks/esm/utils/clamp/clamp.mjs
function clamp(value, min, max) {
  if (min === void 0 && max === void 0) {
    return value;
  }
  if (min !== void 0 && max === void 0) {
    return Math.max(value, min);
  }
  if (min === void 0 && max !== void 0) {
    return Math.min(value, max);
  }
  return Math.min(Math.max(value, min), max);
}

// node_modules/@mantine/hooks/esm/utils/lower-first/lower-first.mjs
function lowerFirst(value) {
  return typeof value !== "string" ? "" : value.charAt(0).toLowerCase() + value.slice(1);
}

// node_modules/@mantine/hooks/esm/utils/random-id/random-id.mjs
function randomId() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}

// node_modules/@mantine/hooks/esm/utils/range/range.mjs
function range(start, end) {
  const length = Math.abs(end - start) + 1;
  const reversed = start > end;
  if (!reversed) {
    return Array.from({ length }, (_, index) => index + start);
  }
  return Array.from({ length }, (_, index) => start - index);
}

// node_modules/@mantine/hooks/esm/utils/shallow-equal/shallow-equal.mjs
function shallowEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }
  const keys = Object.keys(a);
  const { length } = keys;
  if (length !== Object.keys(b).length) {
    return false;
  }
  for (let i = 0; i < length; i += 1) {
    const key = keys[i];
    if (!(key in b)) {
      return false;
    }
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

// node_modules/@mantine/hooks/esm/utils/upper-first/upper-first.mjs
function upperFirst(value) {
  return typeof value !== "string" ? "" : value.charAt(0).toUpperCase() + value.slice(1);
}

// node_modules/@mantine/hooks/esm/use-callback-ref/use-callback-ref.mjs
var import_react = __toESM(require_react(), 1);
function useCallbackRef(callback) {
  const callbackRef = (0, import_react.useRef)(callback);
  (0, import_react.useEffect)(() => {
    callbackRef.current = callback;
  });
  return (0, import_react.useMemo)(() => (...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }, []);
}

// node_modules/@mantine/hooks/esm/use-debounced-callback/use-debounced-callback.mjs
var import_react2 = __toESM(require_react(), 1);
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = (0, import_react2.useRef)(0);
  (0, import_react2.useEffect)(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return (0, import_react2.useCallback)(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}

// node_modules/@mantine/hooks/esm/use-click-outside/use-click-outside.mjs
var import_react3 = __toESM(require_react(), 1);
var DEFAULT_EVENTS = ["mousedown", "touchstart"];
function useClickOutside(handler, events, nodes) {
  const ref = (0, import_react3.useRef)();
  (0, import_react3.useEffect)(() => {
    const listener = (event) => {
      const { target } = event ?? {};
      if (Array.isArray(nodes)) {
        const shouldIgnore = (target == null ? void 0 : target.hasAttribute("data-ignore-outside-clicks")) || !document.body.contains(target) && target.tagName !== "HTML";
        const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node));
        shouldTrigger && !shouldIgnore && handler();
      } else if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };
    (events || DEFAULT_EVENTS).forEach((fn) => document.addEventListener(fn, listener));
    return () => {
      (events || DEFAULT_EVENTS).forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [ref, handler, nodes]);
  return ref;
}

// node_modules/@mantine/hooks/esm/use-clipboard/use-clipboard.mjs
var import_react4 = __toESM(require_react(), 1);
function useClipboard({ timeout = 2e3 } = {}) {
  const [error, setError] = (0, import_react4.useState)(null);
  const [copied, setCopied] = (0, import_react4.useState)(false);
  const [copyTimeout, setCopyTimeout] = (0, import_react4.useState)(null);
  const handleCopyResult = (value) => {
    window.clearTimeout(copyTimeout);
    setCopyTimeout(window.setTimeout(() => setCopied(false), timeout));
    setCopied(value);
  };
  const copy = (valueToCopy) => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(valueToCopy).then(() => handleCopyResult(true)).catch((err) => setError(err));
    } else {
      setError(new Error("useClipboard: navigator.clipboard is not supported"));
    }
  };
  const reset = () => {
    setCopied(false);
    setError(null);
    window.clearTimeout(copyTimeout);
  };
  return { copy, reset, error, copied };
}

// node_modules/@mantine/hooks/esm/use-media-query/use-media-query.mjs
var import_react5 = __toESM(require_react(), 1);
function attachMediaListener(query, callback) {
  try {
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}
function getInitialValue(query, initialValue) {
  if (typeof initialValue === "boolean") {
    return initialValue;
  }
  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }
  return false;
}
function useMediaQuery(query, initialValue, { getInitialValueInEffect } = {
  getInitialValueInEffect: true
}) {
  const [matches, setMatches] = (0, import_react5.useState)(
    getInitialValueInEffect ? initialValue : getInitialValue(query)
  );
  const queryRef = (0, import_react5.useRef)();
  (0, import_react5.useEffect)(() => {
    if ("matchMedia" in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, (event) => setMatches(event.matches));
    }
    return void 0;
  }, [query]);
  return matches;
}

// node_modules/@mantine/hooks/esm/use-color-scheme/use-color-scheme.mjs
function useColorScheme(initialValue, options) {
  return useMediaQuery("(prefers-color-scheme: dark)", initialValue === "dark", options) ? "dark" : "light";
}

// node_modules/@mantine/hooks/esm/use-counter/use-counter.mjs
var import_react6 = __toESM(require_react(), 1);
var DEFAULT_OPTIONS = {
  min: -Infinity,
  max: Infinity
};
function useCounter(initialValue = 0, options) {
  const { min, max } = { ...DEFAULT_OPTIONS, ...options };
  const [count, setCount] = (0, import_react6.useState)(clamp(initialValue, min, max));
  const increment = () => setCount((current) => clamp(current + 1, min, max));
  const decrement = () => setCount((current) => clamp(current - 1, min, max));
  const set = (value) => setCount(clamp(value, min, max));
  const reset = () => setCount(clamp(initialValue, min, max));
  return [count, { increment, decrement, set, reset }];
}

// node_modules/@mantine/hooks/esm/use-debounced-state/use-debounced-state.mjs
var import_react7 = __toESM(require_react(), 1);
function useDebouncedState(defaultValue, wait, options = { leading: false }) {
  const [value, setValue] = (0, import_react7.useState)(defaultValue);
  const timeoutRef = (0, import_react7.useRef)(null);
  const leadingRef = (0, import_react7.useRef)(true);
  const clearTimeout2 = () => window.clearTimeout(timeoutRef.current);
  (0, import_react7.useEffect)(() => clearTimeout2, []);
  const debouncedSetValue = (0, import_react7.useCallback)(
    (newValue) => {
      clearTimeout2();
      if (leadingRef.current && options.leading) {
        setValue(newValue);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          leadingRef.current = true;
          setValue(newValue);
        }, wait);
      }
      leadingRef.current = false;
    },
    [options.leading]
  );
  return [value, debouncedSetValue];
}

// node_modules/@mantine/hooks/esm/use-debounced-value/use-debounced-value.mjs
var import_react8 = __toESM(require_react(), 1);
function useDebouncedValue(value, wait, options = { leading: false }) {
  const [_value, setValue] = (0, import_react8.useState)(value);
  const mountedRef = (0, import_react8.useRef)(false);
  const timeoutRef = (0, import_react8.useRef)(null);
  const cooldownRef = (0, import_react8.useRef)(false);
  const cancel = () => window.clearTimeout(timeoutRef.current);
  (0, import_react8.useEffect)(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setValue(value);
      } else {
        cancel();
        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          setValue(value);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);
  (0, import_react8.useEffect)(() => {
    mountedRef.current = true;
    return cancel;
  }, []);
  return [_value, cancel];
}

// node_modules/@mantine/hooks/esm/use-isomorphic-effect/use-isomorphic-effect.mjs
var import_react9 = __toESM(require_react(), 1);
var useIsomorphicEffect = typeof document !== "undefined" ? import_react9.useLayoutEffect : import_react9.useEffect;

// node_modules/@mantine/hooks/esm/use-document-title/use-document-title.mjs
function useDocumentTitle(title) {
  useIsomorphicEffect(() => {
    if (typeof title === "string" && title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
}

// node_modules/@mantine/hooks/esm/use-document-visibility/use-document-visibility.mjs
var import_react10 = __toESM(require_react(), 1);
function useDocumentVisibility() {
  const [documentVisibility, setDocumentVisibility] = (0, import_react10.useState)("visible");
  (0, import_react10.useEffect)(() => {
    const listener = () => setDocumentVisibility(document.visibilityState);
    document.addEventListener("visibilitychange", listener);
    return () => document.removeEventListener("visibilitychange", listener);
  }, []);
  return documentVisibility;
}

// node_modules/@mantine/hooks/esm/use-focus-return/use-focus-return.mjs
var import_react12 = __toESM(require_react(), 1);

// node_modules/@mantine/hooks/esm/use-did-update/use-did-update.mjs
var import_react11 = __toESM(require_react(), 1);
function useDidUpdate(fn, dependencies) {
  const mounted = (0, import_react11.useRef)(false);
  (0, import_react11.useEffect)(
    () => () => {
      mounted.current = false;
    },
    []
  );
  (0, import_react11.useEffect)(() => {
    if (mounted.current) {
      return fn();
    }
    mounted.current = true;
    return void 0;
  }, dependencies);
}

// node_modules/@mantine/hooks/esm/use-focus-return/use-focus-return.mjs
function useFocusReturn({ opened, shouldReturnFocus = true }) {
  const lastActiveElement = (0, import_react12.useRef)();
  const returnFocus = () => {
    var _a;
    if (lastActiveElement.current && "focus" in lastActiveElement.current && typeof lastActiveElement.current.focus === "function") {
      (_a = lastActiveElement.current) == null ? void 0 : _a.focus({ preventScroll: true });
    }
  };
  useDidUpdate(() => {
    let timeout = -1;
    const clearFocusTimeout = (event) => {
      if (event.key === "Tab") {
        window.clearTimeout(timeout);
      }
    };
    document.addEventListener("keydown", clearFocusTimeout);
    if (opened) {
      lastActiveElement.current = document.activeElement;
    } else if (shouldReturnFocus) {
      timeout = window.setTimeout(returnFocus, 10);
    }
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("keydown", clearFocusTimeout);
    };
  }, [opened, shouldReturnFocus]);
  return returnFocus;
}

// node_modules/@mantine/hooks/esm/use-focus-trap/use-focus-trap.mjs
var import_react13 = __toESM(require_react(), 1);

// node_modules/@mantine/hooks/esm/use-focus-trap/create-aria-hider.mjs
function createAriaHider(containerNode, selector = "body > :not(script)") {
  const id = randomId();
  const rootNodes = Array.from(
    document.querySelectorAll(selector)
  ).map((node) => {
    var _a;
    if (((_a = node == null ? void 0 : node.shadowRoot) == null ? void 0 : _a.contains(containerNode)) || node.contains(containerNode)) {
      return void 0;
    }
    const ariaHidden = node.getAttribute("aria-hidden");
    const prevAriaHidden = node.getAttribute("data-hidden");
    const prevFocusId = node.getAttribute("data-focus-id");
    node.setAttribute("data-focus-id", id);
    if (ariaHidden === null || ariaHidden === "false") {
      node.setAttribute("aria-hidden", "true");
    } else if (!prevAriaHidden && !prevFocusId) {
      node.setAttribute("data-hidden", ariaHidden);
    }
    return {
      node,
      ariaHidden: prevAriaHidden || null
    };
  });
  return () => {
    rootNodes.forEach((item) => {
      if (!item || id !== item.node.getAttribute("data-focus-id")) {
        return;
      }
      if (item.ariaHidden === null) {
        item.node.removeAttribute("aria-hidden");
      } else {
        item.node.setAttribute("aria-hidden", item.ariaHidden);
      }
      item.node.removeAttribute("data-focus-id");
      item.node.removeAttribute("data-hidden");
    });
  };
}

// node_modules/@mantine/hooks/esm/use-focus-trap/tabbable.mjs
var TABBABLE_NODES = /input|select|textarea|button|object/;
var FOCUS_SELECTOR = "a, input, select, textarea, button, object, [tabindex]";
function hidden(element) {
  if (false) {
    return false;
  }
  return element.style.display === "none";
}
function visible(element) {
  const isHidden = element.getAttribute("aria-hidden") || element.getAttribute("hidden") || element.getAttribute("type") === "hidden";
  if (isHidden) {
    return false;
  }
  let parentElement = element;
  while (parentElement) {
    if (parentElement === document.body || parentElement.nodeType === 11) {
      break;
    }
    if (hidden(parentElement)) {
      return false;
    }
    parentElement = parentElement.parentNode;
  }
  return true;
}
function getElementTabIndex(element) {
  let tabIndex = element.getAttribute("tabindex");
  if (tabIndex === null) {
    tabIndex = void 0;
  }
  return parseInt(tabIndex, 10);
}
function focusable(element) {
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element));
  const res = (
    // @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition
    TABBABLE_NODES.test(nodeName) && !element.disabled || (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN)
  );
  return res && visible(element);
}
function tabbable(element) {
  const tabIndex = getElementTabIndex(element);
  const isTabIndexNaN = Number.isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element);
}
function findTabbableDescendants(element) {
  return Array.from(element.querySelectorAll(FOCUS_SELECTOR)).filter(tabbable);
}

// node_modules/@mantine/hooks/esm/use-focus-trap/scope-tab.mjs
function scopeTab(node, event) {
  const tabbable2 = findTabbableDescendants(node);
  if (!tabbable2.length) {
    event.preventDefault();
    return;
  }
  const finalTabbable = tabbable2[event.shiftKey ? 0 : tabbable2.length - 1];
  const root = node.getRootNode();
  let leavingFinalTabbable = finalTabbable === root.activeElement || node === root.activeElement;
  const activeElement = root.activeElement;
  const activeElementIsRadio = activeElement.tagName === "INPUT" && activeElement.getAttribute("type") === "radio";
  if (activeElementIsRadio) {
    const activeRadioGroup = tabbable2.filter(
      (element) => element.getAttribute("type") === "radio" && element.getAttribute("name") === activeElement.getAttribute("name")
    );
    leavingFinalTabbable = activeRadioGroup.includes(finalTabbable);
  }
  if (!leavingFinalTabbable) {
    return;
  }
  event.preventDefault();
  const target = tabbable2[event.shiftKey ? tabbable2.length - 1 : 0];
  if (target) {
    target.focus();
  }
}

// node_modules/@mantine/hooks/esm/use-focus-trap/use-focus-trap.mjs
function useFocusTrap(active = true) {
  const ref = (0, import_react13.useRef)();
  const restoreAria = (0, import_react13.useRef)(null);
  const focusNode = (node) => {
    let focusElement = node.querySelector("[data-autofocus]");
    if (!focusElement) {
      const children = Array.from(node.querySelectorAll(FOCUS_SELECTOR));
      focusElement = children.find(tabbable) || children.find(focusable) || null;
      if (!focusElement && focusable(node))
        focusElement = node;
    }
    if (focusElement) {
      focusElement.focus({ preventScroll: true });
    } else if (true) {
      console.warn(
        "[@mantine/hooks/use-focus-trap] Failed to find focusable element within provided node",
        node
      );
    }
  };
  const setRef = (0, import_react13.useCallback)(
    (node) => {
      if (!active) {
        return;
      }
      if (node === null) {
        if (restoreAria.current) {
          restoreAria.current();
          restoreAria.current = null;
        }
        return;
      }
      restoreAria.current = createAriaHider(node);
      if (ref.current === node) {
        return;
      }
      if (node) {
        setTimeout(() => {
          if (node.getRootNode()) {
            focusNode(node);
          } else if (true) {
            console.warn("[@mantine/hooks/use-focus-trap] Ref node is not part of the dom", node);
          }
        });
        ref.current = node;
      } else {
        ref.current = null;
      }
    },
    [active]
  );
  (0, import_react13.useEffect)(() => {
    if (!active) {
      return void 0;
    }
    ref.current && setTimeout(() => focusNode(ref.current));
    const handleKeyDown = (event) => {
      if (event.key === "Tab" && ref.current) {
        scopeTab(ref.current, event);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (restoreAria.current) {
        restoreAria.current();
      }
    };
  }, [active]);
  return setRef;
}

// node_modules/@mantine/hooks/esm/use-force-update/use-force-update.mjs
var import_react14 = __toESM(require_react(), 1);
var reducer = (value) => (value + 1) % 1e6;
function useForceUpdate() {
  const [, update] = (0, import_react14.useReducer)(reducer, 0);
  return update;
}

// node_modules/@mantine/hooks/esm/use-id/use-id.mjs
var import_react16 = __toESM(require_react(), 1);

// node_modules/@mantine/hooks/esm/use-id/use-react-id.mjs
var import_react15 = __toESM(require_react(), 1);
var __useId = import_react15.default["useId".toString()] || (() => void 0);
function useReactId() {
  const id = __useId();
  return id ? `mantine-${id.replace(/:/g, "")}` : "";
}

// node_modules/@mantine/hooks/esm/use-id/use-id.mjs
function useId(staticId) {
  const reactId = useReactId();
  const [uuid, setUuid] = (0, import_react16.useState)(reactId);
  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);
  if (typeof staticId === "string") {
    return staticId;
  }
  if (typeof window === "undefined") {
    return reactId;
  }
  return uuid;
}

// node_modules/@mantine/hooks/esm/use-idle/use-idle.mjs
var import_react17 = __toESM(require_react(), 1);
var DEFAULT_EVENTS2 = [
  "keypress",
  "mousemove",
  "touchmove",
  "click",
  "scroll"
];
var DEFAULT_OPTIONS2 = {
  events: DEFAULT_EVENTS2,
  initialState: true
};
function useIdle(timeout, options) {
  const { events, initialState } = { ...DEFAULT_OPTIONS2, ...options };
  const [idle, setIdle] = (0, import_react17.useState)(initialState);
  const timer = (0, import_react17.useRef)();
  (0, import_react17.useEffect)(() => {
    const handleEvents = () => {
      setIdle(false);
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => {
        setIdle(true);
      }, timeout);
    };
    events.forEach((event) => document.addEventListener(event, handleEvents));
    return () => {
      events.forEach((event) => document.removeEventListener(event, handleEvents));
    };
  }, [timeout]);
  return idle;
}

// node_modules/@mantine/hooks/esm/use-interval/use-interval.mjs
var import_react18 = __toESM(require_react(), 1);
function useInterval(fn, interval) {
  const [active, setActive] = (0, import_react18.useState)(false);
  const intervalRef = (0, import_react18.useRef)();
  const fnRef = (0, import_react18.useRef)();
  (0, import_react18.useEffect)(() => {
    fnRef.current = fn;
  }, [fn]);
  const start = () => {
    setActive((old) => {
      if (!old && !intervalRef.current) {
        intervalRef.current = window.setInterval(fnRef.current, interval);
      }
      return true;
    });
  };
  const stop = () => {
    setActive(false);
    window.clearInterval(intervalRef.current);
    intervalRef.current = void 0;
  };
  const toggle = () => {
    if (active) {
      stop();
    } else {
      start();
    }
  };
  return { start, stop, toggle, active };
}

// node_modules/@mantine/hooks/esm/use-list-state/use-list-state.mjs
var import_react19 = __toESM(require_react(), 1);
function useListState(initialValue = []) {
  const [state, setState] = (0, import_react19.useState)(initialValue);
  const append = (...items) => setState((current) => [...current, ...items]);
  const prepend = (...items) => setState((current) => [...items, ...current]);
  const insert = (index, ...items) => setState((current) => [...current.slice(0, index), ...items, ...current.slice(index)]);
  const apply = (fn) => setState((current) => current.map((item, index) => fn(item, index)));
  const remove = (...indices) => setState((current) => current.filter((_, index) => !indices.includes(index)));
  const pop = () => setState((current) => {
    const cloned = [...current];
    cloned.pop();
    return cloned;
  });
  const shift = () => setState((current) => {
    const cloned = [...current];
    cloned.shift();
    return cloned;
  });
  const reorder = ({ from, to }) => setState((current) => {
    const cloned = [...current];
    const item = current[from];
    cloned.splice(from, 1);
    cloned.splice(to, 0, item);
    return cloned;
  });
  const swap = ({ from, to }) => setState((current) => {
    const cloned = [...current];
    const fromItem = cloned[from];
    const toItem = cloned[to];
    cloned.splice(to, 1, fromItem);
    cloned.splice(from, 1, toItem);
    return cloned;
  });
  const setItem = (index, item) => setState((current) => {
    const cloned = [...current];
    cloned[index] = item;
    return cloned;
  });
  const setItemProp = (index, prop, value) => setState((current) => {
    const cloned = [...current];
    cloned[index] = { ...cloned[index], [prop]: value };
    return cloned;
  });
  const applyWhere = (condition, fn) => setState(
    (current) => current.map((item, index) => condition(item, index) ? fn(item, index) : item)
  );
  const filter = (fn) => {
    setState((current) => current.filter(fn));
  };
  return [
    state,
    {
      setState,
      append,
      prepend,
      insert,
      pop,
      shift,
      apply,
      applyWhere,
      remove,
      reorder,
      swap,
      setItem,
      setItemProp,
      filter
    }
  ];
}

// node_modules/@mantine/hooks/esm/use-local-storage/create-storage.mjs
var import_react21 = __toESM(require_react(), 1);

// node_modules/@mantine/hooks/esm/use-window-event/use-window-event.mjs
var import_react20 = __toESM(require_react(), 1);
function useWindowEvent(type, listener, options) {
  (0, import_react20.useEffect)(() => {
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener, options);
  }, [type, listener]);
}

// node_modules/@mantine/hooks/esm/use-local-storage/create-storage.mjs
function serializeJSON(value, hookName = "use-local-storage") {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error(`@mantine/hooks ${hookName}: Failed to serialize the value`);
  }
}
function deserializeJSON(value) {
  try {
    return value && JSON.parse(value);
  } catch {
    return value;
  }
}
function createStorageHandler(type) {
  const getItem = (key) => {
    try {
      return window[type].getItem(key);
    } catch (error) {
      console.warn("use-local-storage: Failed to get value from storage, localStorage is blocked");
      return null;
    }
  };
  const setItem = (key, value) => {
    try {
      window[type].setItem(key, value);
    } catch (error) {
      console.warn("use-local-storage: Failed to set value to storage, localStorage is blocked");
    }
  };
  const removeItem = (key) => {
    try {
      window[type].removeItem(key);
    } catch (error) {
      console.warn(
        "use-local-storage: Failed to remove value from storage, localStorage is blocked"
      );
    }
  };
  return { getItem, setItem, removeItem };
}
function createStorage(type, hookName) {
  const eventName = type === "localStorage" ? "mantine-local-storage" : "mantine-session-storage";
  const { getItem, setItem, removeItem } = createStorageHandler(type);
  return function useStorage({
    key,
    defaultValue,
    getInitialValueInEffect = true,
    deserialize = deserializeJSON,
    serialize = (value) => serializeJSON(value, hookName)
  }) {
    const readStorageValue = (0, import_react21.useCallback)(
      (skipStorage) => {
        let storageBlockedOrSkipped;
        try {
          storageBlockedOrSkipped = typeof window === "undefined" || !(type in window) || window[type] === null || !!skipStorage;
        } catch (_e) {
          storageBlockedOrSkipped = true;
        }
        if (storageBlockedOrSkipped) {
          return defaultValue;
        }
        const storageValue = getItem(key);
        return storageValue !== null ? deserialize(storageValue) : defaultValue;
      },
      [key, deserialize, defaultValue]
    );
    const [value, setValue] = (0, import_react21.useState)(readStorageValue(getInitialValueInEffect));
    const setStorageValue = (0, import_react21.useCallback)(
      (val) => {
        if (val instanceof Function) {
          setValue((current) => {
            const result = val(current);
            setItem(key, serialize(result));
            window.dispatchEvent(
              new CustomEvent(eventName, { detail: { key, value: val(current) } })
            );
            return result;
          });
        } else {
          setItem(key, serialize(val));
          window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val } }));
          setValue(val);
        }
      },
      [key, serialize]
    );
    const removeStorageValue = (0, import_react21.useCallback)(() => {
      removeItem(key);
      window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: defaultValue } }));
    }, [defaultValue, key]);
    useWindowEvent("storage", (event) => {
      if (event.storageArea === window[type] && event.key === key) {
        setValue(deserialize(event.newValue ?? void 0));
      }
    });
    useWindowEvent(eventName, (event) => {
      if (event.detail.key === key) {
        setValue(event.detail.value);
      }
    });
    (0, import_react21.useEffect)(() => {
      if (defaultValue !== void 0 && value === void 0) {
        setStorageValue(defaultValue);
      }
    }, [defaultValue, value, setStorageValue]);
    (0, import_react21.useEffect)(() => {
      const val = readStorageValue();
      val !== void 0 && setStorageValue(val);
    }, [readStorageValue, setStorageValue]);
    return [value === void 0 ? defaultValue : value, setStorageValue, removeStorageValue];
  };
}
function readValue(type) {
  const { getItem } = createStorageHandler(type);
  return function read({
    key,
    defaultValue,
    deserialize = deserializeJSON
  }) {
    let storageBlockedOrSkipped;
    try {
      storageBlockedOrSkipped = typeof window === "undefined" || !(type in window) || window[type] === null;
    } catch (_e) {
      storageBlockedOrSkipped = true;
    }
    if (storageBlockedOrSkipped) {
      return defaultValue;
    }
    const storageValue = getItem(key);
    return storageValue !== null ? deserialize(storageValue) : defaultValue;
  };
}

// node_modules/@mantine/hooks/esm/use-local-storage/use-local-storage.mjs
function useLocalStorage(props) {
  return createStorage("localStorage", "use-local-storage")(props);
}
var readLocalStorageValue = readValue("localStorage");

// node_modules/@mantine/hooks/esm/use-session-storage/use-session-storage.mjs
function useSessionStorage(props) {
  return createStorage("sessionStorage", "use-session-storage")(props);
}
var readSessionStorageValue = readValue("sessionStorage");

// node_modules/@mantine/hooks/esm/use-merged-ref/use-merged-ref.mjs
var import_react22 = __toESM(require_react(), 1);
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}
function useMergedRef(...refs) {
  return (0, import_react22.useCallback)(mergeRefs(...refs), refs);
}

// node_modules/@mantine/hooks/esm/use-mouse/use-mouse.mjs
var import_react23 = __toESM(require_react(), 1);
function useMouse(options = { resetOnExit: false }) {
  const [position, setPosition] = (0, import_react23.useState)({ x: 0, y: 0 });
  const ref = (0, import_react23.useRef)();
  const setMousePosition = (event) => {
    if (ref.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.round(event.pageX - rect.left - (window.pageXOffset || window.scrollX))
      );
      const y = Math.max(
        0,
        Math.round(event.pageY - rect.top - (window.pageYOffset || window.scrollY))
      );
      setPosition({ x, y });
    } else {
      setPosition({ x: event.clientX, y: event.clientY });
    }
  };
  const resetMousePosition = () => setPosition({ x: 0, y: 0 });
  (0, import_react23.useEffect)(() => {
    const element = (ref == null ? void 0 : ref.current) ? ref.current : document;
    element.addEventListener("mousemove", setMousePosition);
    if (options.resetOnExit)
      element.addEventListener("mouseleave", resetMousePosition);
    return () => {
      element.removeEventListener("mousemove", setMousePosition);
      if (options.resetOnExit)
        element.removeEventListener("mouseleave", resetMousePosition);
    };
  }, [ref.current]);
  return { ref, ...position };
}

// node_modules/@mantine/hooks/esm/use-move/use-move.mjs
var import_react24 = __toESM(require_react(), 1);
function clampUseMovePosition(position) {
  return {
    x: clamp(position.x, 0, 1),
    y: clamp(position.y, 0, 1)
  };
}
function useMove(onChange, handlers, dir = "ltr") {
  const ref = (0, import_react24.useRef)(null);
  const mounted = (0, import_react24.useRef)(false);
  const isSliding = (0, import_react24.useRef)(false);
  const frame = (0, import_react24.useRef)(0);
  const [active, setActive] = (0, import_react24.useState)(false);
  (0, import_react24.useEffect)(() => {
    mounted.current = true;
  }, []);
  (0, import_react24.useEffect)(() => {
    var _a, _b;
    const onScrub = ({ x, y }) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        if (mounted.current && ref.current) {
          ref.current.style.userSelect = "none";
          const rect = ref.current.getBoundingClientRect();
          if (rect.width && rect.height) {
            const _x = clamp((x - rect.left) / rect.width, 0, 1);
            onChange({
              x: dir === "ltr" ? _x : 1 - _x,
              y: clamp((y - rect.top) / rect.height, 0, 1)
            });
          }
        }
      });
    };
    const bindEvents = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopScrubbing);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", stopScrubbing);
    };
    const unbindEvents = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopScrubbing);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", stopScrubbing);
    };
    const startScrubbing = () => {
      if (!isSliding.current && mounted.current) {
        isSliding.current = true;
        typeof (handlers == null ? void 0 : handlers.onScrubStart) === "function" && handlers.onScrubStart();
        setActive(true);
        bindEvents();
      }
    };
    const stopScrubbing = () => {
      if (isSliding.current && mounted.current) {
        isSliding.current = false;
        setActive(false);
        unbindEvents();
        setTimeout(() => {
          typeof (handlers == null ? void 0 : handlers.onScrubEnd) === "function" && handlers.onScrubEnd();
        }, 0);
      }
    };
    const onMouseDown = (event) => {
      startScrubbing();
      event.preventDefault();
      onMouseMove(event);
    };
    const onMouseMove = (event) => onScrub({ x: event.clientX, y: event.clientY });
    const onTouchStart = (event) => {
      if (event.cancelable) {
        event.preventDefault();
      }
      startScrubbing();
      onTouchMove(event);
    };
    const onTouchMove = (event) => {
      if (event.cancelable) {
        event.preventDefault();
      }
      onScrub({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
    };
    (_a = ref.current) == null ? void 0 : _a.addEventListener("mousedown", onMouseDown);
    (_b = ref.current) == null ? void 0 : _b.addEventListener("touchstart", onTouchStart, { passive: false });
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousedown", onMouseDown);
        ref.current.removeEventListener("touchstart", onTouchStart);
      }
    };
  }, [dir, onChange]);
  return { ref, active };
}

// node_modules/@mantine/hooks/esm/use-pagination/use-pagination.mjs
var import_react26 = __toESM(require_react(), 1);

// node_modules/@mantine/hooks/esm/use-uncontrolled/use-uncontrolled.mjs
var import_react25 = __toESM(require_react(), 1);
function useUncontrolled({
  value,
  defaultValue,
  finalValue,
  onChange = () => {
  }
}) {
  const [uncontrolledValue, setUncontrolledValue] = (0, import_react25.useState)(
    defaultValue !== void 0 ? defaultValue : finalValue
  );
  const handleUncontrolledChange = (val, ...payload) => {
    setUncontrolledValue(val);
    onChange == null ? void 0 : onChange(val, ...payload);
  };
  if (value !== void 0) {
    return [value, onChange, true];
  }
  return [uncontrolledValue, handleUncontrolledChange, false];
}

// node_modules/@mantine/hooks/esm/use-pagination/use-pagination.mjs
function range2(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}
var DOTS = "dots";
function usePagination({
  total,
  siblings = 1,
  boundaries = 1,
  page,
  initialPage = 1,
  onChange
}) {
  const _total = Math.max(Math.trunc(total), 0);
  const [activePage, setActivePage] = useUncontrolled({
    value: page,
    onChange,
    defaultValue: initialPage,
    finalValue: initialPage
  });
  const setPage = (pageNumber) => {
    if (pageNumber <= 0) {
      setActivePage(1);
    } else if (pageNumber > _total) {
      setActivePage(_total);
    } else {
      setActivePage(pageNumber);
    }
  };
  const next = () => setPage(activePage + 1);
  const previous = () => setPage(activePage - 1);
  const first = () => setPage(1);
  const last = () => setPage(_total);
  const paginationRange = (0, import_react26.useMemo)(() => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= _total) {
      return range2(1, _total);
    }
    const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
    const rightSiblingIndex = Math.min(activePage + siblings, _total - boundaries);
    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < _total - (boundaries + 1);
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return [...range2(1, leftItemCount), DOTS, ...range2(_total - (boundaries - 1), _total)];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return [...range2(1, boundaries), DOTS, ...range2(_total - rightItemCount, _total)];
    }
    return [
      ...range2(1, boundaries),
      DOTS,
      ...range2(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range2(_total - boundaries + 1, _total)
    ];
  }, [_total, siblings, activePage]);
  return {
    range: paginationRange,
    active: activePage,
    setPage,
    next,
    previous,
    first,
    last
  };
}

// node_modules/@mantine/hooks/esm/use-queue/use-queue.mjs
var import_react27 = __toESM(require_react(), 1);
function useQueue({ initialValues = [], limit }) {
  const [{ state, queue }, setState] = (0, import_react27.useState)({
    state: initialValues.slice(0, limit),
    queue: initialValues.slice(limit)
  });
  const add = (...items) => setState((current) => {
    const results = [...current.state, ...current.queue, ...items];
    return {
      state: results.slice(0, limit),
      queue: results.slice(limit)
    };
  });
  const update = (fn) => setState((current) => {
    const results = fn([...current.state, ...current.queue]);
    return {
      state: results.slice(0, limit),
      queue: results.slice(limit)
    };
  });
  const cleanQueue = () => setState((current) => ({ state: current.state, queue: [] }));
  return {
    state,
    queue,
    add,
    update,
    cleanQueue
  };
}

// node_modules/@mantine/hooks/esm/use-page-leave/use-page-leave.mjs
var import_react28 = __toESM(require_react(), 1);
function usePageLeave(onPageLeave) {
  (0, import_react28.useEffect)(() => {
    document.documentElement.addEventListener("mouseleave", onPageLeave);
    return () => document.documentElement.removeEventListener("mouseleave", onPageLeave);
  }, []);
}

// node_modules/@mantine/hooks/esm/use-reduced-motion/use-reduced-motion.mjs
function useReducedMotion(initialValue, options) {
  return useMediaQuery("(prefers-reduced-motion: reduce)", initialValue, options);
}

// node_modules/@mantine/hooks/esm/use-scroll-into-view/use-scroll-into-view.mjs
var import_react29 = __toESM(require_react(), 1);

// node_modules/@mantine/hooks/esm/use-scroll-into-view/utils/ease-in-out-quad.mjs
var easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// node_modules/@mantine/hooks/esm/use-scroll-into-view/utils/get-relative-position.mjs
var getRelativePosition = ({
  axis,
  target,
  parent,
  alignment,
  offset,
  isList
}) => {
  if (!target || !parent && typeof document === "undefined") {
    return 0;
  }
  const isCustomParent = !!parent;
  const parentElement = parent || document.body;
  const parentPosition = parentElement.getBoundingClientRect();
  const targetPosition = target.getBoundingClientRect();
  const getDiff = (property) => targetPosition[property] - parentPosition[property];
  if (axis === "y") {
    const diff = getDiff("top");
    if (diff === 0)
      return 0;
    if (alignment === "start") {
      const distance = diff - offset;
      const shouldScroll = distance <= targetPosition.height * (isList ? 0 : 1) || !isList;
      return shouldScroll ? distance : 0;
    }
    const parentHeight = isCustomParent ? parentPosition.height : window.innerHeight;
    if (alignment === "end") {
      const distance = diff + offset - parentHeight + targetPosition.height;
      const shouldScroll = distance >= -targetPosition.height * (isList ? 0 : 1) || !isList;
      return shouldScroll ? distance : 0;
    }
    if (alignment === "center") {
      return diff - parentHeight / 2 + targetPosition.height / 2;
    }
    return 0;
  }
  if (axis === "x") {
    const diff = getDiff("left");
    if (diff === 0)
      return 0;
    if (alignment === "start") {
      const distance = diff - offset;
      const shouldScroll = distance <= targetPosition.width || !isList;
      return shouldScroll ? distance : 0;
    }
    const parentWidth = isCustomParent ? parentPosition.width : window.innerWidth;
    if (alignment === "end") {
      const distance = diff + offset - parentWidth + targetPosition.width;
      const shouldScroll = distance >= -targetPosition.width || !isList;
      return shouldScroll ? distance : 0;
    }
    if (alignment === "center") {
      return diff - parentWidth / 2 + targetPosition.width / 2;
    }
    return 0;
  }
  return 0;
};

// node_modules/@mantine/hooks/esm/use-scroll-into-view/utils/get-scroll-start.mjs
var getScrollStart = ({ axis, parent }) => {
  if (!parent && typeof document === "undefined") {
    return 0;
  }
  const method = axis === "y" ? "scrollTop" : "scrollLeft";
  if (parent) {
    return parent[method];
  }
  const { body, documentElement } = document;
  return body[method] + documentElement[method];
};

// node_modules/@mantine/hooks/esm/use-scroll-into-view/utils/set-scroll-param.mjs
var setScrollParam = ({ axis, parent, distance }) => {
  if (!parent && typeof document === "undefined") {
    return;
  }
  const method = axis === "y" ? "scrollTop" : "scrollLeft";
  if (parent) {
    parent[method] = distance;
  } else {
    const { body, documentElement } = document;
    body[method] = distance;
    documentElement[method] = distance;
  }
};

// node_modules/@mantine/hooks/esm/use-scroll-into-view/use-scroll-into-view.mjs
function useScrollIntoView({
  duration = 1250,
  axis = "y",
  onScrollFinish,
  easing = easeInOutQuad,
  offset = 0,
  cancelable = true,
  isList = false
} = {}) {
  const frameID = (0, import_react29.useRef)(0);
  const startTime = (0, import_react29.useRef)(0);
  const shouldStop = (0, import_react29.useRef)(false);
  const scrollableRef = (0, import_react29.useRef)(null);
  const targetRef = (0, import_react29.useRef)(null);
  const reducedMotion = useReducedMotion();
  const cancel = () => {
    if (frameID.current) {
      cancelAnimationFrame(frameID.current);
    }
  };
  const scrollIntoView = (0, import_react29.useCallback)(
    ({ alignment = "start" } = {}) => {
      shouldStop.current = false;
      if (frameID.current) {
        cancel();
      }
      const start = getScrollStart({ parent: scrollableRef.current, axis }) ?? 0;
      const change = getRelativePosition({
        parent: scrollableRef.current,
        target: targetRef.current,
        axis,
        alignment,
        offset,
        isList
      }) - (scrollableRef.current ? 0 : start);
      function animateScroll() {
        if (startTime.current === 0) {
          startTime.current = performance.now();
        }
        const now = performance.now();
        const elapsed = now - startTime.current;
        const t = reducedMotion || duration === 0 ? 1 : elapsed / duration;
        const distance = start + change * easing(t);
        setScrollParam({
          parent: scrollableRef.current,
          axis,
          distance
        });
        if (!shouldStop.current && t < 1) {
          frameID.current = requestAnimationFrame(animateScroll);
        } else {
          typeof onScrollFinish === "function" && onScrollFinish();
          startTime.current = 0;
          frameID.current = 0;
          cancel();
        }
      }
      animateScroll();
    },
    [axis, duration, easing, isList, offset, onScrollFinish, reducedMotion]
  );
  const handleStop = () => {
    if (cancelable) {
      shouldStop.current = true;
    }
  };
  useWindowEvent("wheel", handleStop, {
    passive: true
  });
  useWindowEvent("touchmove", handleStop, {
    passive: true
  });
  (0, import_react29.useEffect)(() => cancel, []);
  return {
    scrollableRef,
    targetRef,
    scrollIntoView,
    cancel
  };
}

// node_modules/@mantine/hooks/esm/use-resize-observer/use-resize-observer.mjs
var import_react30 = __toESM(require_react(), 1);
var defaultState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};
function useResizeObserver(options) {
  const frameID = (0, import_react30.useRef)(0);
  const ref = (0, import_react30.useRef)(null);
  const [rect, setRect] = (0, import_react30.useState)(defaultState);
  const observer = (0, import_react30.useMemo)(
    () => typeof window !== "undefined" ? new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        cancelAnimationFrame(frameID.current);
        frameID.current = requestAnimationFrame(() => {
          if (ref.current) {
            setRect(entry.contentRect);
          }
        });
      }
    }) : null,
    []
  );
  (0, import_react30.useEffect)(() => {
    if (ref.current) {
      observer == null ? void 0 : observer.observe(ref.current, options);
    }
    return () => {
      observer == null ? void 0 : observer.disconnect();
      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, [ref.current]);
  return [ref, rect];
}
function useElementSize(options) {
  const [ref, { width, height }] = useResizeObserver(options);
  return { ref, width, height };
}

// node_modules/@mantine/hooks/esm/use-shallow-effect/use-shallow-effect.mjs
var import_react31 = __toESM(require_react(), 1);
function shallowCompare(prevValue, currValue) {
  if (!prevValue || !currValue) {
    return false;
  }
  if (prevValue === currValue) {
    return true;
  }
  if (prevValue.length !== currValue.length) {
    return false;
  }
  for (let i = 0; i < prevValue.length; i += 1) {
    if (!shallowEqual(prevValue[i], currValue[i])) {
      return false;
    }
  }
  return true;
}
function useShallowCompare(dependencies) {
  const ref = (0, import_react31.useRef)([]);
  const updateRef = (0, import_react31.useRef)(0);
  if (!shallowCompare(ref.current, dependencies)) {
    ref.current = dependencies;
    updateRef.current += 1;
  }
  return [updateRef.current];
}
function useShallowEffect(cb, dependencies) {
  (0, import_react31.useEffect)(cb, useShallowCompare(dependencies));
}

// node_modules/@mantine/hooks/esm/use-toggle/use-toggle.mjs
var import_react32 = __toESM(require_react(), 1);
function useToggle(options = [false, true]) {
  const [[option], toggle] = (0, import_react32.useReducer)((state, action) => {
    const value = action instanceof Function ? action(state[0]) : action;
    const index = Math.abs(state.indexOf(value));
    return state.slice(index).concat(state.slice(0, index));
  }, options);
  return [option, toggle];
}

// node_modules/@mantine/hooks/esm/use-viewport-size/use-viewport-size.mjs
var import_react33 = __toESM(require_react(), 1);
var eventListerOptions = {
  passive: true
};
function useViewportSize() {
  const [windowSize, setWindowSize] = (0, import_react33.useState)({
    width: 0,
    height: 0
  });
  const setSize = (0, import_react33.useCallback)(() => {
    setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 });
  }, []);
  useWindowEvent("resize", setSize, eventListerOptions);
  useWindowEvent("orientationchange", setSize, eventListerOptions);
  (0, import_react33.useEffect)(setSize, []);
  return windowSize;
}

// node_modules/@mantine/hooks/esm/use-window-scroll/use-window-scroll.mjs
var import_react34 = __toESM(require_react(), 1);
function getScrollPosition() {
  return typeof window !== "undefined" ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 };
}
function scrollTo({ x, y }) {
  if (typeof window !== "undefined") {
    const scrollOptions = { behavior: "smooth" };
    if (typeof x === "number") {
      scrollOptions.left = x;
    }
    if (typeof y === "number") {
      scrollOptions.top = y;
    }
    window.scrollTo(scrollOptions);
  }
}
function useWindowScroll() {
  const [position, setPosition] = (0, import_react34.useState)({ x: 0, y: 0 });
  useWindowEvent("scroll", () => setPosition(getScrollPosition()));
  useWindowEvent("resize", () => setPosition(getScrollPosition()));
  (0, import_react34.useEffect)(() => {
    setPosition(getScrollPosition());
  }, []);
  return [position, scrollTo];
}

// node_modules/@mantine/hooks/esm/use-intersection/use-intersection.mjs
var import_react35 = __toESM(require_react(), 1);
function useIntersection(options) {
  const [entry, setEntry] = (0, import_react35.useState)(null);
  const observer = (0, import_react35.useRef)(null);
  const ref = (0, import_react35.useCallback)(
    (element) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
      if (element === null) {
        setEntry(null);
        return;
      }
      observer.current = new IntersectionObserver(([_entry]) => {
        setEntry(_entry);
      }, options);
      observer.current.observe(element);
    },
    [options == null ? void 0 : options.rootMargin, options == null ? void 0 : options.root, options == null ? void 0 : options.threshold]
  );
  return { ref, entry };
}

// node_modules/@mantine/hooks/esm/use-hash/use-hash.mjs
var import_react36 = __toESM(require_react(), 1);
function useHash({ getInitialValueInEffect = true } = {}) {
  const [hash, setHashValue] = (0, import_react36.useState)(
    getInitialValueInEffect ? "" : window.location.hash || ""
  );
  const setHash = (value) => {
    const valueWithHash = value.startsWith("#") ? value : `#${value}`;
    window.location.hash = valueWithHash;
    setHashValue(valueWithHash);
  };
  useWindowEvent("hashchange", () => {
    const newHash = window.location.hash;
    if (hash !== newHash) {
      setHashValue(hash);
    }
  });
  (0, import_react36.useEffect)(() => {
    if (getInitialValueInEffect) {
      setHashValue(window.location.hash);
    }
  }, []);
  return [hash, setHash];
}

// node_modules/@mantine/hooks/esm/use-hotkeys/use-hotkeys.mjs
var import_react37 = __toESM(require_react(), 1);

// node_modules/@mantine/hooks/esm/use-hotkeys/parse-hotkey.mjs
function parseHotkey(hotkey) {
  const keys = hotkey.toLowerCase().split("+").map((part) => part.trim());
  const modifiers = {
    alt: keys.includes("alt"),
    ctrl: keys.includes("ctrl"),
    meta: keys.includes("meta"),
    mod: keys.includes("mod"),
    shift: keys.includes("shift")
  };
  const reservedKeys = ["alt", "ctrl", "meta", "shift", "mod"];
  const freeKey = keys.find((key) => !reservedKeys.includes(key));
  return {
    ...modifiers,
    key: freeKey
  };
}
function isExactHotkey(hotkey, event) {
  const { alt, ctrl, meta, mod, shift, key } = hotkey;
  const { altKey, ctrlKey, metaKey, shiftKey, key: pressedKey } = event;
  if (alt !== altKey) {
    return false;
  }
  if (mod) {
    if (!ctrlKey && !metaKey) {
      return false;
    }
  } else {
    if (ctrl !== ctrlKey) {
      return false;
    }
    if (meta !== metaKey) {
      return false;
    }
  }
  if (shift !== shiftKey) {
    return false;
  }
  if (key && (pressedKey.toLowerCase() === key.toLowerCase() || event.code.replace("Key", "").toLowerCase() === key.toLowerCase())) {
    return true;
  }
  return false;
}
function getHotkeyMatcher(hotkey) {
  return (event) => isExactHotkey(parseHotkey(hotkey), event);
}
function getHotkeyHandler(hotkeys) {
  return (event) => {
    const _event = "nativeEvent" in event ? event.nativeEvent : event;
    hotkeys.forEach(([hotkey, handler, options = { preventDefault: true }]) => {
      if (getHotkeyMatcher(hotkey)(_event)) {
        if (options.preventDefault) {
          event.preventDefault();
        }
        handler(_event);
      }
    });
  };
}

// node_modules/@mantine/hooks/esm/use-hotkeys/use-hotkeys.mjs
function shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable = false) {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }
    return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName);
  }
  return true;
}
function useHotkeys(hotkeys, tagsToIgnore = ["INPUT", "TEXTAREA", "SELECT"], triggerOnContentEditable = false) {
  (0, import_react37.useEffect)(() => {
    const keydownListener = (event) => {
      hotkeys.forEach(([hotkey, handler, options = { preventDefault: true }]) => {
        if (getHotkeyMatcher(hotkey)(event) && shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)) {
          if (options.preventDefault) {
            event.preventDefault();
          }
          handler(event);
        }
      });
    };
    document.documentElement.addEventListener("keydown", keydownListener);
    return () => document.documentElement.removeEventListener("keydown", keydownListener);
  }, [hotkeys]);
}

// node_modules/@mantine/hooks/esm/use-fullscreen/use-fullscreen.mjs
var import_react38 = __toESM(require_react(), 1);
function getFullscreenElement() {
  const _document = window.document;
  const fullscreenElement = _document.fullscreenElement || _document.webkitFullscreenElement || _document.mozFullScreenElement || _document.msFullscreenElement;
  return fullscreenElement;
}
async function exitFullscreen() {
  const _document = window.document;
  if (typeof _document.exitFullscreen === "function")
    return _document.exitFullscreen();
  if (typeof _document.msExitFullscreen === "function")
    return _document.msExitFullscreen();
  if (typeof _document.webkitExitFullscreen === "function")
    return _document.webkitExitFullscreen();
  if (typeof _document.mozCancelFullScreen === "function")
    return _document.mozCancelFullScreen();
  return null;
}
async function enterFullScreen(element) {
  var _a, _b, _c, _d, _e;
  const _element = element;
  return ((_a = _element.requestFullscreen) == null ? void 0 : _a.call(_element)) || ((_b = _element.msRequestFullscreen) == null ? void 0 : _b.call(_element)) || ((_c = _element.webkitEnterFullscreen) == null ? void 0 : _c.call(_element)) || ((_d = _element.webkitRequestFullscreen) == null ? void 0 : _d.call(_element)) || ((_e = _element.mozRequestFullscreen) == null ? void 0 : _e.call(_element));
}
var prefixes = ["", "webkit", "moz", "ms"];
function addEvents(element, {
  onFullScreen,
  onError
}) {
  prefixes.forEach((prefix) => {
    element.addEventListener(`${prefix}fullscreenchange`, onFullScreen);
    element.addEventListener(`${prefix}fullscreenerror`, onError);
  });
  return () => {
    prefixes.forEach((prefix) => {
      element.removeEventListener(`${prefix}fullscreenchange`, onFullScreen);
      element.removeEventListener(`${prefix}fullscreenerror`, onError);
    });
  };
}
function useFullscreen() {
  const [fullscreen, setFullscreen] = (0, import_react38.useState)(false);
  const _ref = (0, import_react38.useRef)();
  const handleFullscreenChange = (0, import_react38.useCallback)(
    (event) => {
      setFullscreen(event.target === getFullscreenElement());
    },
    [setFullscreen]
  );
  const handleFullscreenError = (0, import_react38.useCallback)(
    (event) => {
      setFullscreen(false);
      console.error(
        `[@mantine/hooks] use-fullscreen: Error attempting full-screen mode method: ${event} (${event.target})`
      );
    },
    [setFullscreen]
  );
  const toggle = (0, import_react38.useCallback)(async () => {
    if (!getFullscreenElement()) {
      await enterFullScreen(_ref.current);
    } else {
      await exitFullscreen();
    }
  }, []);
  const ref = (0, import_react38.useCallback)((element) => {
    if (element === null) {
      _ref.current = window.document.documentElement;
    } else {
      _ref.current = element;
    }
  }, []);
  (0, import_react38.useEffect)(() => {
    if (!_ref.current && window.document) {
      _ref.current = window.document.documentElement;
      return addEvents(_ref.current, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError
      });
    }
    if (_ref.current) {
      return addEvents(_ref.current, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError
      });
    }
    return void 0;
  }, []);
  return { ref, toggle, fullscreen };
}

// node_modules/@mantine/hooks/esm/use-logger/use-logger.mjs
var import_react39 = __toESM(require_react(), 1);
function useLogger(componentName, props) {
  (0, import_react39.useEffect)(() => {
    console.log(`${componentName} mounted`, ...props);
    return () => console.log(`${componentName} unmounted`);
  }, []);
  useDidUpdate(() => {
    console.log(`${componentName} updated`, ...props);
  }, props);
  return null;
}

// node_modules/@mantine/hooks/esm/use-hover/use-hover.mjs
var import_react40 = __toESM(require_react(), 1);
function useHover() {
  const [hovered, setHovered] = (0, import_react40.useState)(false);
  const ref = (0, import_react40.useRef)(null);
  const onMouseEnter = (0, import_react40.useCallback)(() => setHovered(true), []);
  const onMouseLeave = (0, import_react40.useCallback)(() => setHovered(false), []);
  (0, import_react40.useEffect)(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseenter", onMouseEnter);
      ref.current.addEventListener("mouseleave", onMouseLeave);
      return () => {
        var _a, _b;
        (_a = ref.current) == null ? void 0 : _a.removeEventListener("mouseenter", onMouseEnter);
        (_b = ref.current) == null ? void 0 : _b.removeEventListener("mouseleave", onMouseLeave);
      };
    }
    return void 0;
  }, []);
  return { ref, hovered };
}

// node_modules/@mantine/hooks/esm/use-validated-state/use-validated-state.mjs
var import_react41 = __toESM(require_react(), 1);
function useValidatedState(initialValue, validation, initialValidationState) {
  const [value, setValue] = (0, import_react41.useState)(initialValue);
  const [lastValidValue, setLastValidValue] = (0, import_react41.useState)(
    validation(initialValue) ? initialValue : void 0
  );
  const [valid, setValid] = (0, import_react41.useState)(
    typeof initialValidationState === "boolean" ? initialValidationState : validation(initialValue)
  );
  const onChange = (val) => {
    if (validation(val)) {
      setLastValidValue(val);
      setValid(true);
    } else {
      setValid(false);
    }
    setValue(val);
  };
  return [{ value, lastValidValue, valid }, onChange];
}

// node_modules/@mantine/hooks/esm/use-os/use-os.mjs
var import_react42 = __toESM(require_react(), 1);
function getOS() {
  if (typeof window === "undefined") {
    return "undetermined";
  }
  const { userAgent } = window.navigator;
  const macosPlatforms = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;
  const windowsPlatforms = /(Win32)|(Win64)|(Windows)|(WinCE)/i;
  const iosPlatforms = /(iPhone)|(iPad)|(iPod)/i;
  if (macosPlatforms.test(userAgent)) {
    return "macos";
  }
  if (iosPlatforms.test(userAgent)) {
    return "ios";
  }
  if (windowsPlatforms.test(userAgent)) {
    return "windows";
  }
  if (/Android/i.test(userAgent)) {
    return "android";
  }
  if (/Linux/i.test(userAgent)) {
    return "linux";
  }
  return "undetermined";
}
function useOs(options = { getValueInEffect: true }) {
  const [value, setValue] = (0, import_react42.useState)(options.getValueInEffect ? "undetermined" : getOS());
  useIsomorphicEffect(() => {
    if (options.getValueInEffect) {
      setValue(getOS);
    }
  }, []);
  return value;
}

// node_modules/@mantine/hooks/esm/use-set-state/use-set-state.mjs
var import_react43 = __toESM(require_react(), 1);
function useSetState(initialState) {
  const [state, _setState] = (0, import_react43.useState)(initialState);
  const setState = (0, import_react43.useCallback)(
    (statePartial) => _setState((current) => ({
      ...current,
      ...typeof statePartial === "function" ? statePartial(current) : statePartial
    })),
    []
  );
  return [state, setState];
}

// node_modules/@mantine/hooks/esm/use-input-state/use-input-state.mjs
var import_react44 = __toESM(require_react(), 1);
function getInputOnChange(setValue) {
  return (val) => {
    if (!val) {
      setValue(val);
    } else if (typeof val === "function") {
      setValue(val);
    } else if (typeof val === "object" && "nativeEvent" in val) {
      const { currentTarget } = val;
      if (currentTarget.type === "checkbox") {
        setValue(currentTarget.checked);
      } else {
        setValue(currentTarget.value);
      }
    } else {
      setValue(val);
    }
  };
}
function useInputState(initialState) {
  const [value, setValue] = (0, import_react44.useState)(initialState);
  return [value, getInputOnChange(setValue)];
}

// node_modules/@mantine/hooks/esm/use-event-listener/use-event-listener.mjs
var import_react45 = __toESM(require_react(), 1);
function useEventListener(type, listener, options) {
  const ref = (0, import_react45.useRef)();
  (0, import_react45.useEffect)(() => {
    if (ref.current) {
      ref.current.addEventListener(type, listener, options);
      return () => {
        var _a;
        return (_a = ref.current) == null ? void 0 : _a.removeEventListener(type, listener, options);
      };
    }
    return void 0;
  }, [listener, options]);
  return ref;
}

// node_modules/@mantine/hooks/esm/use-disclosure/use-disclosure.mjs
var import_react46 = __toESM(require_react(), 1);
function useDisclosure(initialState = false, callbacks) {
  const { onOpen, onClose } = callbacks || {};
  const [opened, setOpened] = (0, import_react46.useState)(initialState);
  const open = (0, import_react46.useCallback)(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        onOpen == null ? void 0 : onOpen();
        return true;
      }
      return isOpened;
    });
  }, [onOpen]);
  const close = (0, import_react46.useCallback)(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        onClose == null ? void 0 : onClose();
        return false;
      }
      return isOpened;
    });
  }, [onClose]);
  const toggle = (0, import_react46.useCallback)(() => {
    opened ? close() : open();
  }, [close, open, opened]);
  return [opened, { open, close, toggle }];
}

// node_modules/@mantine/hooks/esm/use-focus-within/use-focus-within.mjs
var import_react47 = __toESM(require_react(), 1);
function containsRelatedTarget(event) {
  if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof HTMLElement) {
    return event.currentTarget.contains(event.relatedTarget);
  }
  return false;
}
function useFocusWithin({
  onBlur,
  onFocus
} = {}) {
  const ref = (0, import_react47.useRef)();
  const [focused, _setFocused] = (0, import_react47.useState)(false);
  const focusedRef = (0, import_react47.useRef)(false);
  const setFocused = (value) => {
    _setFocused(value);
    focusedRef.current = value;
  };
  const handleFocusIn = (event) => {
    if (!focusedRef.current) {
      setFocused(true);
      onFocus == null ? void 0 : onFocus(event);
    }
  };
  const handleFocusOut = (event) => {
    if (focusedRef.current && !containsRelatedTarget(event)) {
      setFocused(false);
      onBlur == null ? void 0 : onBlur(event);
    }
  };
  (0, import_react47.useEffect)(() => {
    if (ref.current) {
      ref.current.addEventListener("focusin", handleFocusIn);
      ref.current.addEventListener("focusout", handleFocusOut);
      return () => {
        var _a, _b;
        (_a = ref.current) == null ? void 0 : _a.removeEventListener("focusin", handleFocusIn);
        (_b = ref.current) == null ? void 0 : _b.removeEventListener("focusout", handleFocusOut);
      };
    }
    return void 0;
  }, [handleFocusIn, handleFocusOut]);
  return { ref, focused };
}

// node_modules/@mantine/hooks/esm/use-network/use-network.mjs
var import_react48 = __toESM(require_react(), 1);
function getConnection() {
  if (typeof navigator === "undefined") {
    return {};
  }
  const _navigator = navigator;
  const connection = _navigator.connection || _navigator.mozConnection || _navigator.webkitConnection;
  if (!connection) {
    return {};
  }
  return {
    downlink: connection == null ? void 0 : connection.downlink,
    downlinkMax: connection == null ? void 0 : connection.downlinkMax,
    effectiveType: connection == null ? void 0 : connection.effectiveType,
    rtt: connection == null ? void 0 : connection.rtt,
    saveData: connection == null ? void 0 : connection.saveData,
    type: connection == null ? void 0 : connection.type
  };
}
function useNetwork() {
  const [status, setStatus] = (0, import_react48.useState)({
    online: true
  });
  const handleConnectionChange = (0, import_react48.useCallback)(
    () => setStatus((current) => ({ ...current, ...getConnection() })),
    []
  );
  useWindowEvent("online", () => setStatus({ online: true, ...getConnection() }));
  useWindowEvent("offline", () => setStatus({ online: false, ...getConnection() }));
  (0, import_react48.useEffect)(() => {
    const _navigator = navigator;
    if (_navigator.connection) {
      setStatus({ online: _navigator.onLine, ...getConnection() });
      _navigator.connection.addEventListener("change", handleConnectionChange);
      return () => _navigator.connection.removeEventListener("change", handleConnectionChange);
    }
    if (typeof _navigator.onLine === "boolean") {
      setStatus((current) => ({ ...current, online: _navigator.onLine }));
    }
    return void 0;
  }, []);
  return status;
}

// node_modules/@mantine/hooks/esm/use-timeout/use-timeout.mjs
var import_react49 = __toESM(require_react(), 1);
function useTimeout(callback, delay, options = { autoInvoke: false }) {
  const timeoutRef = (0, import_react49.useRef)(null);
  const start = (0, import_react49.useCallback)(
    (...callbackParams) => {
      if (!timeoutRef.current) {
        timeoutRef.current = window.setTimeout(() => {
          callback(callbackParams);
          timeoutRef.current = null;
        }, delay);
      }
    },
    [delay]
  );
  const clear = (0, import_react49.useCallback)(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  (0, import_react49.useEffect)(() => {
    if (options.autoInvoke) {
      start();
    }
    return clear;
  }, [clear, start]);
  return { start, clear };
}

// node_modules/@mantine/hooks/esm/use-text-selection/use-text-selection.mjs
var import_react50 = __toESM(require_react(), 1);
function useTextSelection() {
  const forceUpdate = useForceUpdate();
  const [selection, setSelection] = (0, import_react50.useState)(null);
  const handleSelectionChange = () => {
    setSelection(document.getSelection());
    forceUpdate();
  };
  (0, import_react50.useEffect)(() => {
    setSelection(document.getSelection());
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);
  return selection;
}

// node_modules/@mantine/hooks/esm/use-previous/use-previous.mjs
var import_react51 = __toESM(require_react(), 1);
function usePrevious(value) {
  const ref = (0, import_react51.useRef)();
  (0, import_react51.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// node_modules/@mantine/hooks/esm/use-favicon/use-favicon.mjs
var import_react52 = __toESM(require_react(), 1);
var MIME_TYPES = {
  ico: "image/x-icon",
  png: "image/png",
  svg: "image/svg+xml",
  gif: "image/gif"
};
function useFavicon(url) {
  const link = (0, import_react52.useRef)();
  useIsomorphicEffect(() => {
    if (!url) {
      return;
    }
    if (!link.current) {
      const existingElements = document.querySelectorAll('link[rel*="icon"]');
      existingElements.forEach((element2) => document.head.removeChild(element2));
      const element = document.createElement("link");
      element.rel = "shortcut icon";
      link.current = element;
      document.querySelector("head").appendChild(element);
    }
    const splittedUrl = url.split(".");
    link.current.setAttribute(
      "type",
      MIME_TYPES[splittedUrl[splittedUrl.length - 1].toLowerCase()]
    );
    link.current.setAttribute("href", url);
  }, [url]);
}

// node_modules/@mantine/hooks/esm/use-headroom/use-headroom.mjs
var import_react53 = __toESM(require_react(), 1);
var isFixed = (current, fixedAt) => current <= fixedAt;
var isPinnedOrReleased = (current, fixedAt, isCurrentlyPinnedRef, isScrollingUp, onPin, onRelease) => {
  const isInFixedPosition = isFixed(current, fixedAt);
  if (isInFixedPosition && !isCurrentlyPinnedRef.current) {
    isCurrentlyPinnedRef.current = true;
    onPin == null ? void 0 : onPin();
  } else if (!isInFixedPosition && isScrollingUp && !isCurrentlyPinnedRef.current) {
    isCurrentlyPinnedRef.current = true;
    onPin == null ? void 0 : onPin();
  } else if (!isInFixedPosition && isCurrentlyPinnedRef.current) {
    isCurrentlyPinnedRef.current = false;
    onRelease == null ? void 0 : onRelease();
  }
};
var useScrollDirection = () => {
  const [lastScrollTop, setLastScrollTop] = (0, import_react53.useState)(0);
  const [isScrollingUp, setIsScrollingUp] = (0, import_react53.useState)(false);
  const [isResizing, setIsResizing] = (0, import_react53.useState)(false);
  (0, import_react53.useEffect)(() => {
    let resizeTimer;
    const onResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    };
    const onScroll = () => {
      if (isResizing) {
        return;
      }
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrollingUp(currentScrollTop < lastScrollTop);
      setLastScrollTop(currentScrollTop);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [lastScrollTop, isResizing]);
  return isScrollingUp;
};
function useHeadroom({ fixedAt = 0, onPin, onFix, onRelease } = {}) {
  const isCurrentlyPinnedRef = (0, import_react53.useRef)(false);
  const isScrollingUp = useScrollDirection();
  const [{ y: scrollPosition }] = useWindowScroll();
  useIsomorphicEffect(() => {
    isPinnedOrReleased(
      scrollPosition,
      fixedAt,
      isCurrentlyPinnedRef,
      isScrollingUp,
      onPin,
      onRelease
    );
  }, [scrollPosition]);
  useIsomorphicEffect(() => {
    if (isFixed(scrollPosition, fixedAt)) {
      onFix == null ? void 0 : onFix();
    }
  }, [scrollPosition, fixedAt, onFix]);
  if (isFixed(scrollPosition, fixedAt) || isScrollingUp) {
    return true;
  }
  return false;
}

// node_modules/@mantine/hooks/esm/use-eye-dropper/use-eye-dropper.mjs
var import_react54 = __toESM(require_react(), 1);
function useEyeDropper() {
  const [supported, setSupported] = (0, import_react54.useState)(false);
  useIsomorphicEffect(() => {
    setSupported(typeof window !== "undefined" && "EyeDropper" in window);
  }, []);
  const open = (0, import_react54.useCallback)(
    (options = {}) => {
      if (supported) {
        const eyeDropper = new window.EyeDropper();
        return eyeDropper.open(options);
      }
      return Promise.resolve(void 0);
    },
    [supported]
  );
  return { supported, open };
}

// node_modules/@mantine/hooks/esm/use-in-viewport/use-in-viewport.mjs
var import_react55 = __toESM(require_react(), 1);
function useInViewport() {
  const ref = (0, import_react55.useRef)(null);
  const [inViewport, setInViewport] = (0, import_react55.useState)(false);
  const observer = (0, import_react55.useMemo)(() => {
    if (typeof IntersectionObserver === "undefined") {
      return null;
    }
    return new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting));
  }, [ref]);
  (0, import_react55.useEffect)(() => {
    if (ref.current && observer) {
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
    return () => null;
  }, []);
  return { ref, inViewport };
}

// node_modules/@mantine/hooks/esm/use-mutation-observer/use-mutation-observer.mjs
var import_react56 = __toESM(require_react(), 1);
function useMutationObserver(callback, options, target) {
  const observer = (0, import_react56.useRef)();
  const ref = (0, import_react56.useRef)(null);
  (0, import_react56.useEffect)(() => {
    const targetElement = typeof target === "function" ? target() : target;
    if (targetElement || ref.current) {
      observer.current = new MutationObserver(callback);
      observer.current.observe(targetElement || ref.current, options);
    }
    return () => {
      var _a;
      (_a = observer.current) == null ? void 0 : _a.disconnect();
    };
  }, [callback, options]);
  return ref;
}

// node_modules/@mantine/hooks/esm/use-mounted/use-mounted.mjs
var import_react57 = __toESM(require_react(), 1);
function useMounted() {
  const [mounted, setMounted] = (0, import_react57.useState)(false);
  (0, import_react57.useEffect)(() => setMounted(true), []);
  return mounted;
}

// node_modules/@mantine/hooks/esm/use-state-history/use-state-history.mjs
var import_react58 = __toESM(require_react(), 1);
function useStateHistory(initialValue) {
  const [state, setState] = (0, import_react58.useState)({
    history: [initialValue],
    current: 0
  });
  const set = (0, import_react58.useCallback)(
    (val) => setState((currentState) => {
      const nextState = [...currentState.history.slice(0, currentState.current + 1), val];
      return {
        history: nextState,
        current: nextState.length - 1
      };
    }),
    []
  );
  const back = (0, import_react58.useCallback)(
    (steps = 1) => setState((currentState) => ({
      history: currentState.history,
      current: Math.max(0, currentState.current - steps)
    })),
    []
  );
  const forward = (0, import_react58.useCallback)(
    (steps = 1) => setState((currentState) => ({
      history: currentState.history,
      current: Math.min(currentState.history.length - 1, currentState.current + steps)
    })),
    []
  );
  const handlers = (0, import_react58.useMemo)(() => ({ set, forward, back }), []);
  return [state.history[state.current], handlers, state];
}

export {
  clamp,
  lowerFirst,
  randomId,
  range,
  shallowEqual,
  upperFirst,
  useCallbackRef,
  useDebounceCallback,
  useClickOutside,
  useClipboard,
  useMediaQuery,
  useColorScheme,
  useCounter,
  useDebouncedState,
  useDebouncedValue,
  useIsomorphicEffect,
  useDocumentTitle,
  useDocumentVisibility,
  useDidUpdate,
  useFocusReturn,
  useFocusTrap,
  useForceUpdate,
  useId,
  useIdle,
  useInterval,
  useListState,
  useWindowEvent,
  useLocalStorage,
  readLocalStorageValue,
  useSessionStorage,
  readSessionStorageValue,
  assignRef,
  mergeRefs,
  useMergedRef,
  useMouse,
  clampUseMovePosition,
  useMove,
  useUncontrolled,
  usePagination,
  useQueue,
  usePageLeave,
  useReducedMotion,
  useScrollIntoView,
  useResizeObserver,
  useElementSize,
  useShallowEffect,
  useToggle,
  useViewportSize,
  useWindowScroll,
  useIntersection,
  useHash,
  getHotkeyHandler,
  useHotkeys,
  useFullscreen,
  useLogger,
  useHover,
  useValidatedState,
  useOs,
  useSetState,
  useInputState,
  useEventListener,
  useDisclosure,
  useFocusWithin,
  useNetwork,
  useTimeout,
  useTextSelection,
  usePrevious,
  useFavicon,
  useHeadroom,
  useEyeDropper,
  useInViewport,
  useMutationObserver,
  useMounted,
  useStateHistory
};
//# sourceMappingURL=chunk-KAIZYDOR.js.map
