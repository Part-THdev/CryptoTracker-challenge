import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "./api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 50px;
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 8vh;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-items: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 45px;
  color: ${(props) => props.theme.accentColor};
`;

const HomeBtn = styled.div`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.div`
  text-align: center;
  font-size: 25px;
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.itemColor};
  padding: 10px 20px;
  border-radius: 15px;
`;

const OverViewItem = styled.div`
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  span:first-child {
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    color: ${(props) => props.theme.accentColor};
  }
`;

const Description = styled.p`
  margin: 25px 0;
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
`;

const Taps = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 30px 0;
  gap: 10px;
`;
const Tap = styled.span<{ isactive: boolean }>`
  text-align: center;
  background-color: ${(props) => props.theme.itemColor};
  border-radius: 15px;
  color: ${(props) =>
    props.isactive ? props.theme.accentColor : props.theme.textColor};
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
  const { state } = useLocation() as ILocation;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId)
  );
  const loading = infoLoading || priceLoading;

  // const [info, setInfo] = useState<IInfoData>();
  // const [price, setPrice] = useState<IPriceData>();
  // const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPrice(priceData);
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Helmet>
        <title>{infoData?.name}</title>
      </Helmet>
      <Header>
        <HomeBtn>
          <Link to={"/"}>←</Link>
        </HomeBtn>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>price:</span>
              <span>${priceData?.quotes.USD.price.toFixed(3)}</span>
            </OverViewItem>
          </OverView>
          <Description>{infoData?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverViewItem>
          </OverView>
          <Taps>
            <Tap isactive={priceMatch !== null}>
              <Link to={"price"}>Price</Link>
            </Tap>
            <Tap isactive={chartMatch !== null}>
              <Link to={"chart"}>Chart</Link>
            </Tap>
          </Taps>
          <Outlet />
        </>
      )}
    </Container>
  );
}
