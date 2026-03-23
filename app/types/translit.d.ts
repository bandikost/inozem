declare module 'translit' {
  interface Options {
    lowercase?: boolean;
    separator?: string;
  }

  export default function translit(
    text: string,
    options?: Options
  ): string;
}