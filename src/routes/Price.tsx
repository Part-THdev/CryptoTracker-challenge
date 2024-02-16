import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinPrice } from "./api";
import styled from "styled-components";

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Wrapper = styled.div``;

const OverView = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  background-color: ${(props) => props.theme.itemColor};
  padding: 30px;
  border-radius: 15px;
  margin: 30px 0;
  h1 {
    font-size: 30px;
    color: ${(props) => props.theme.accentColor};
  }
`;

const OverViewItem = styled.div`
  font-size: 30px;
`;

export default function Price() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IPriceData>(["price", coinId], () =>
    fetchCoinPrice(coinId)
  );
  return (
    <>
      <div>
        {isLoading ? (
          "Loading Price..."
        ) : (
          <Wrapper>
            <OverView>
              <h1>{data?.name} 현재가</h1>
              <OverViewItem>
                :${data?.quotes?.USD?.price.toFixed(2)}
              </OverViewItem>
            </OverView>
            <OverView>
              <h1>{data?.name} 역대 최고가</h1>
              <OverViewItem>
                :${data?.quotes?.USD?.ath_price.toFixed(2)}
              </OverViewItem>
            </OverView>
          </Wrapper>
        )}
      </div>
    </>
  );
}
