export type { ElectricityPrice } from "./types";

export { getCurrentPrice } from "./lib/getCurrentPrice";
export { getCheapestHour } from "./lib/getCheapestHour";
export { getMostExpensiveHour } from "./lib/getMostExpensiveHour";
export { getAveragePrice } from "./lib/getAveragePrice";

export {
  fetchUpstreamPrices,
  PricesUnavailableError,
} from "./server/fetchUpstreamPrices";
export {
  getPricesForArea,
  type PricesResult,
  type PricesSource,
} from "./server/getPricesForArea";
