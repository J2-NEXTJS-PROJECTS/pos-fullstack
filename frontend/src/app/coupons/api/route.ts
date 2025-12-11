export async function POST(request: Request) {
  //console.log(await req.json());
  const coupon = await request.json();
  const url: string = `${process.env.API_URL}/coupons/apply-coupon`;
  const req = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coupon),
  });
  const response = await req.json();
  console.log(`desde la api ${JSON.stringify(response)}`)
  return Response.json({...response,status: req.status})
}
