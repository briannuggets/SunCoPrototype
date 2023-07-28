import { NextResponse } from "next/server";
import products from "../products";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  return NextResponse.json(products[params.id]);
}
