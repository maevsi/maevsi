declare global {
  interface Window {
    webkit?: {
      messageHandlers: Record<string, { postMessage: (data: unknown) => void }>
    }
  }

  interface WindowEventMap {
    'push-permission-request': CustomEvent<string>
    'push-permission-state': CustomEvent<string>
    'push-token': CustomEvent<string>
  }
}

export {}
