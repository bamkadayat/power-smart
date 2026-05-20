import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  fetchUpstreamPrices,
  PricesUnavailableError,
} from "@/features/prices";
import { isPriceArea } from "@/shared/lib/areas";
import { formatOsloDate } from "@/shared/lib/date";

const isYYYYMMDD = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const areaParam = searchParams.get("area");
  const dateParam = searchParams.get("date");

  if (!areaParam || !isPriceArea(areaParam)) {
    return NextResponse.json(
      { error: "Invalid or missing area. Must be NO1, NO2, NO3, NO4 or NO5." },
      { status: 400 },
    );
  }

  let year: string;
  let monthDay: string;

  if (dateParam) {
    if (!isYYYYMMDD(dateParam)) {
      return NextResponse.json(
        { error: "Invalid date. Must be in YYYY-MM-DD format." },
        { status: 400 },
      );
    }
    const [y, m, d] = dateParam.split("-");
    year = y;
    monthDay = `${m}-${d}`;
  } else {
    const today = formatOsloDate();
    year = today.year;
    monthDay = `${today.month}-${today.day}`;
  }

  try {
    const prices = await fetchUpstreamPrices(areaParam, year, monthDay);
    return NextResponse.json({
      area: areaParam,
      date: `${year}-${monthDay}`,
      prices,
    });
  } catch (err) {
    if (err instanceof PricesUnavailableError) {
      return NextResponse.json(
        {
          error:
            "Prices are not available for this date. Tomorrow's prices are normally published around 13:00 Europe/Oslo.",
        },
        { status: 404 },
      );
    }
    console.error("Failed to fetch prices", err);
    return NextResponse.json(
      { error: "Failed to fetch prices. Please try again later." },
      { status: 502 },
    );
  }
}
