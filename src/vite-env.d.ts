/// <reference types="vite/client" />

declare global {
  interface Window {
    global: typeof globalThis;
    process: {
      env: Record<string, string>;
    };
    Buffer: typeof Buffer;
    path: any;
  }
}