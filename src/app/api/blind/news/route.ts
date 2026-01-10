export async function GET() {
  const API_KEY = process.env.GNEWS_API_KEY;

  if (!API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing GNEWS_API_KEY" }),
      { status: 500 }
    );
  }

  const url = new URL("https://gnews.io/api/v4/search");

  url.searchParams.set(
    "q",
    "government OR election OR parliament OR policy OR protest"
  );
  url.searchParams.set("country", "in");
  url.searchParams.set("lang", "en");
  url.searchParams.set("max", "10");
  url.searchParams.set("apikey", API_KEY);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });

    if (!res.ok) {
      throw new Error("GNews API failed");
    }

    const data = await res.json();

    // 🚫 Extra safety filter
    const filtered = (data.articles || []).filter(
      (a: any) =>
        a.title &&
        !a.title.toLowerCase().includes("horoscope") &&
        !a.title.toLowerCase().includes("astrology")
    );

    return Response.json(filtered);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch news" }),
      { status: 500 }
    );
  }
}
