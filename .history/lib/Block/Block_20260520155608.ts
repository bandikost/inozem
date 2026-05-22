type Block = {
  id: string;
  title: string;
  type: "video" | "main" | "second" | "third" | "four";

  data: {
    headlines?: {
      id: string;
      text: string;
    }[];

    sources?: {
      headlineId: string;
      key: string;
    }[];

    links?: {
      headlineId: string;
      name: string;
      href: string;
    }[];
  };
};