import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 50px;
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.div`
  text-align: center;
  font-size: 25px;
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 15px;
`;

const OverViewItem = styled.div`
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-weight: 500;
    font-size: 13px;
    text-transform: uppercase;
  }
`;

const Description = styled.p`
  margin: 25px 0;
`;

const Taps = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 30px 0;
  gap: 10px;
`;
const Tap = styled.span<{ isActive: boolean }>`
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    padding: 10px;
  }
`;

interface ILocation {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_a: string;
}

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

export default function Coin() {
  const { coinId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const { state } = useLocation() as ILocation;
  const [info, setInfo] = useState<IInfoData>();
  const [price, setPrice] = useState<IPriceData>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : isLoading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverViewItem>
          </OverView>
          <Description>{info?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverViewItem>
          </OverView>
          <Taps>
            <Tap isActive={priceMatch !== null}>
              <Link to={"price"}>Price</Link>
            </Tap>
            <Tap isActive={chartMatch !== null}>
              <Link to={"chart"}>Chart</Link>
            </Tap>
          </Taps>
          <Outlet />
        </>
      )}
    </Container>
  );
}
