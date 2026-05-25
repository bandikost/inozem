export type BlockType = "video" | "main" | "second" | "third" | "four";

export type Block = {
  title: string;
  type: BlockType;

  data: {
    headlines: string[];
    sources: {
      key: string;
      headlineId: string;
    }[];
    links: {
      headlineId: string;
      items: {
        name: string;
        href: string;
      }[];
    }[];
  };
};

export type Program = {
  specialization: string;
  name: string;
  slug: string;
  price: number;
  education: string;
  category: string;
  diplom: string;
  time: string;
  blocks: Block[];
};