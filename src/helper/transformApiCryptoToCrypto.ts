import { ApiCrypto } from '../services/cryptoServices';
import { Crypto } from '../types/Cryto';

const transformApiCryptoToCrypto = (cryto: ApiCrypto): Crypto => ({
  id: cryto.FROMSYMBOL,
  name: cryto.FROMSYMBOL,
  imageUrl: `https://www.cryptocompare.com/${cryto.IMAGEURL}`,
  price: cryto.PRICE,
  evaluation: cryto.CHANGEHOUR > 0 ? 'up' : 'down',
});

export default transformApiCryptoToCrypto;
