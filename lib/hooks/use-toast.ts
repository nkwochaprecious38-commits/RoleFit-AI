"use client";

import * as React from "react";
import type { ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
};

type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

interface State {
  toasts: ToasterToast[];
}

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return { toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };
    case "UPDATE_TOAST":
      return { toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)) };
    case "DISMISS_TOAST": {
      if (action.toastId) {
        if (!toastTimeouts.has(action.toastId)) {
          toastTimeouts.set(action.toastId, setTimeout(() => dispatch({ type: "REMOVE_TOAST", toastId: action.toastId }), TOAST_REMOVE_DELAY));
        }
      } else {
        state.toasts.forEach((t) => {
          if (!toastTimeouts.has(t.id)) {
            toastTimeouts.set(t.id, setTimeout(() => dispatch({ type: "REMOVE_TOAST", toastId: t.id }), TOAST_REMOVE_DELAY));
          }
        });
      }
      return { toasts: state.toasts.map((t) => (t.id === action.toastId || !action.toastId ? { ...t, open: false } : t)) };
    }
    case "REMOVE_TOAST":
      if (!action.toastId) return { toasts: [] };
      return { toasts: state.toasts.filter((t) => t.id !== action.toastId) };
  }
}

function toast({ ...props }: Omit<ToasterToast, "id">) {
  const id = genId();
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({ type: "ADD_TOAST", toast: { ...props, id, open: true, onOpenChange: (open) => { if (!open) dismiss(); } } });
  return { id, dismiss, update: (p: Partial<ToasterToast>) => dispatch({ type: "UPDATE_TOAST", toast: { ...p, id } }) };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);
  return { ...state, toast, dismiss: (id?: string) => dispatch({ type: "DISMISS_TOAST", toastId: id }) };
}

export { useToast, toast };
