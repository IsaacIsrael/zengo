/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import transformApiCryptoToCrypto from '../helper/transformApiCryptoToCrypto';
import { Crypto } from '../types/Cryto';
import httpServices from './httpServices';

export interface ApiCrypto {
  FROMSYMBOL: string;
  PRICE: number;
  IMAGEURL: string;
  CHANGEHOUR: number;
}

interface ApiCryptos {
  RAW: Record<string, { USD: ApiCrypto }>;
}

class CryptoService {
  async fetchCryptos(coins: string[]): Promise<Crypto[]> {
    const queryCoins = coins.join(',');
    const response = await httpServices.get<ApiCryptos>(
      `data/pricemultifull?fsyms=${queryCoins}&tsyms=USD&api_key=10a232baa4fe9a90e76922d2fa0c6b532b2ad2e2ec4b7dd0e12704a829985684`,
    );
    const { data } = response;
    return _.map(data.RAW, (crypto) => transformApiCryptoToCrypto(crypto.USD));
  }
}

const cryptoServices = new CryptoService();
export default cryptoServices;
