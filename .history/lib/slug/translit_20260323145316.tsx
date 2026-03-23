import translit from "translit";

function generateSlug(name: string) {
  return translit(name, {
    lowercase: true,
    separator: '-',
  });
}