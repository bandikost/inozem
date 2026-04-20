
declare module "*.css"

export {}

declare global {
  interface Window {
    smartCaptcha?: {
      render: (
        containerId: string,
        options: {
          sitekey: string
          callback: (token: string) => void
        }
      ) => void
    }
  }
}