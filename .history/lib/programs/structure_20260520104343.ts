export type LinkItem = {
  name: string
  href: string
}

export type MainSource = {
  key: string
  headlineIndex: number
}

export type FourSource = {
  headlines: number
  links: LinkItem[]
}

export type BlockType = "main" | "four" | "video" | "second" | "third"

export type BaseBlock = {
  title: string
  type: BlockType
  headlines: string[]
}

export type MainBlock = BaseBlock & {
  type: "main"
  sources: MainSource[]
}

export type FourBlock = BaseBlock & {
  type: "four"
  sources: FourSource[]
}

export type SimpleBlock = BaseBlock & {
  type: "video" | "second" | "third"
  sources?: never
}

export type BlockItem = MainBlock | FourBlock | SimpleBlock

export type SpecializationItem = {
  specialization: string
  blocks: BlockItem[]
}