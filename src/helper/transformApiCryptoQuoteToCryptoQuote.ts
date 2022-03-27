import { ApiCryptoQuote } from '../services/cryptoServices';
import { CryptoQuote } from '../types/CryptoQuote';

const transformApiCryptoQuoteToCryptoQuote = (quote: ApiCryptoQuote): CryptoQuote => ({
  id: quote.time,
  date: new Date(quote.time * 1000),
  price: quote.close,
});

export default transformApiCryptoQuoteToCryptoQuote;
