// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(400).json({
      message: "Only GET request are allowed!",
    });
  }

  const { code } = req.query;

  if (typeof code == "string") {
    const result = await prisma.$transaction(async (tx) => {
      // user makes a get request on their short url -> if their code is invalid or not found
      const url = await tx.url.findUnique({
        where: {
          urlCode: code,
        },
      });

      // # return null
      if (!url) return null;

      // # update our url analytic
      await tx.urlAnalytic.update({
        where: {
          url_id: url.id,
        },
        data: {
          clicked: {
            increment: 1,
          },
        },
      });

      // only if an url code is valid and is found in our database
      return url;
    });

    if (!result) {
      return res.status(400).json({
        statusCode: 400,
        error: {
          message: "Invalid short url code!",
        },
        data: null,
      });
    }

    // # redirect url
    return res.redirect(result.originalUrl);
  }
}
