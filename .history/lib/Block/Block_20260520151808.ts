export type BlockType = "video" | "main" | "second" | "third" | "four";

export type Block = {
  id?: string;
  title: string;
  type: BlockType;

  data: {
    headlines?: string[];

    sources?: {
      headlineIndex: number;
      links: {
        name: string;
        href: string;
      }[];
    }[];
  };
};