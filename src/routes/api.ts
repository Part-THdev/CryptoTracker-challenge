export async function fetchCoins() {
  const response = await fetch("https://api.coinpaprika.com/v1/coins");
  const json = await response.json();
  return json;
}
export async function fetchCoinInfo(coinId: string | undefined) {
  const response = await fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}`
  );
  const json = await response.json();
  return json;
}
export async function fetchCoinPrice(coinId: string | undefined) {
  const response = await fetch(
    `https://api.coinpaprika.com/v1/tickers/${coinId}`
  );
  const json = await response.json();
  return json;
}

export async function fetchCoinHistory(coinId: string | undefined) {
  const response = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  const json = await response.json();
  return json;
}
