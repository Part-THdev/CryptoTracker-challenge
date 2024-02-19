import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atome";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export default function Chart() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <div>
        {isLoading ? (
          "loading chart..."
        ) : (
          <ApexChart
            type="candlestick"
            series={[
              {
                data: data?.map((price) => [
                  new Date(price.time_open).getTime(),
                  price.open,
                  price.high,
                  price.low,
                  price.close,
                ]),
              } as any,
            ]}
            options={{
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#DF7D46",
                    downward: "#3C90EB",
                  },
                },
              },
              theme: {
                mode: isDark ? "light" : "dark",
              },
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              xaxis: {
                type: "datetime",
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
          // <ApexChart
          //   type="line"
          //   series={[
          //     {
          //       name: "Price",
          //       data: data?.map((price) => parseFloat(price.close)) ?? [],
          //     },
          //   ]}
          //   options={{
          //     fill: {
          //       type: "gradient",
          //       gradient: { gradientToColors: ["blue"], stops: [0, 100] },
          //     },
          //     colors: ["red"],
          //     theme: {
          //       mode: "dark",
          //     },
          //     chart: {
          //       width: 500,
          //       height: 300,
          //       toolbar: {
          //         show: false,
          //       },
          //       background: "transparant",
          //     },
          //     grid: {
          //       show: false,
          //     },
          //     stroke: {
          //       curve: "smooth",
          //       width: 5,
          //     },
          //     yaxis: {
          //       show: false,
          //     },
          //     xaxis: {
          //       axisBorder: { show: false },
          //       axisTicks: { show: false },
          //       labels: { show: false },
          //       categories: data?.map((price) =>
          //         new Date(price.time_close * 1000).toUTCString()
          //       ),
          //     },
          //     tooltip: {
          //       y: {
          //         formatter: (value) => `$${value}`,
          //       },
          //     },
          //   }}
          // />
        )}
      </div>
    </>
  );
}
