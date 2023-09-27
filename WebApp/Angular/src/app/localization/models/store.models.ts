export interface StoreItem {
  module: string,
  value: any,
}

export interface StorePackage {
  lang: string,
  items: StoreItem[]
}

export interface LanguageStore {
  lang: string,
  items: any[]
}
