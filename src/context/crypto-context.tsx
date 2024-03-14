import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { fetchAssets, fetchCrypto } from '../api';
import { IAsset, ICryptoCurrency, IPurchase } from '../models';
import { percentDifference } from '../utils';

interface IContext {
  dealQuantity: number,
  loading: boolean,
  crypto: ICryptoCurrency[],
  assets: IAsset[],
  addAsset: (newAsset: IPurchase, id: string) => void,
}

export const CryptoContext = createContext<IContext>({
  dealQuantity: 0, // had to add to re-render AppCoinData component in case when already existing coin added
  assets: [],
  crypto: [],
  loading: false,
  addAsset: () => {},
})

export function CryptoContextProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState<IAsset[] | []>([]);
  const [dealQuantity, setDealQuantity] = useState<number>(0);

  useEffect(() => {
    const preload = async() => {
      setLoading(true);
      const { result } = await fetchCrypto();
      const assets = await fetchAssets() as IAsset[];

      setCrypto(result);

      if (!assets.length) {
        setLoading(false);
        return;
      }

      interface ICryptoPriceMap {
        price: number,
      }

      const cryptoPriceMap = result.reduce((acc: ICryptoPriceMap, c: ICryptoCurrency) => {
        acc[c.id as keyof ICryptoPriceMap] = c.price;
        return acc;
      }, {} as ICryptoPriceMap);

      setAssets(assets.map((a) => {
        const totalAmount = a.purchases.reduce((sum, p) => sum + p.amount, 0);
        const avgPrice = a.purchases.reduce((sum, p) => sum + p.price, 0) / a.purchases.length;
        const totalFundBefore = totalAmount * avgPrice;
        return {
          ...a,
          grow: avgPrice < cryptoPriceMap[a.id as keyof ICryptoPriceMap] ? 'asc' : avgPrice > cryptoPriceMap[a.id as keyof ICryptoPriceMap] ? 'desc' : 'eql',
          growPercentage: percentDifference(avgPrice, cryptoPriceMap[a.id as keyof ICryptoPriceMap]),
          totalAmount,
          avgPrice,
          totalFund: cryptoPriceMap[a.id as keyof ICryptoPriceMap] * totalAmount,
          totalProfit: totalAmount * cryptoPriceMap[a.id as keyof ICryptoPriceMap] - totalFundBefore,
        }
      }));
      setLoading(false);
    }
    preload();
  }, [dealQuantity])

  const addAsset = (newAsset: IPurchase, id: string) => {
    const alreadyBought = assets.find((asset) => asset.id === id);
    if (alreadyBought) {
      alreadyBought.purchases.push(newAsset);
      setDealQuantity((prev) => prev + 1);
      return;
    }
    const objToAdd: IAsset = {
      id,
      totalFund: 0,
      purchases: [newAsset],
    }
    setAssets((prev) => [...prev, objToAdd]);
    setDealQuantity((prev) => prev + 1);
  }

  useEffect(() => {
    if (!assets.length) return;
    localStorage.setItem('assets', JSON.stringify(assets));
  }, [assets, dealQuantity])

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, dealQuantity }}>
      {children}
    </CryptoContext.Provider>
  )
}
