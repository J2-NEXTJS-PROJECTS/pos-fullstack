import { NextRequest } from "next/server";

//!NextRequest permite usar nexturl para recuperar querystring
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const transactaionDate = searchParams.get("transactionDate");
  //console.log(transactaionDate);
  const url = `${process.env.API_URL}/transactions?transactionDate=${transactaionDate}`;
  const req = await fetch(url);
  const response = await req.json();
  //{ fecha: transactaionDate }
  //console.log({response})
  return Response.json(response);
};
