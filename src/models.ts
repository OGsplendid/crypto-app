export interface IAsset {
  id: string,
  purchases: IPurchase[],
  grow?: string,
  growPercentage?: number,
  totalAmount?: number,
  totalProfit?: number,
  avgPrice?: number,
  totalFund: number,
}

export interface IPurchase {
  amount: number,
  price: number,
  date: Date,
}

export interface ICryptoCurrency {
  id: string
  icon: string
  name: string
  symbol: string
  rank: number
  price: number
  priceBtc: number
  volume: number
  marketCap: number
  availableSupply: number
  totalSupply: number
  priceChange1h: number
  priceChange1d: number
  priceChange1w: number
  redditUrl: string
  websiteUrl: string
  twitterUrl?: string
  contractAddress?: string
  decimals?: number
  explorers: string[]
}

export interface IMeta {
  page: number
  limit: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface IResults {
  result: ICryptoCurrency[],
  meta: IMeta,
}