// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { isWebUri } from "valid-url";
import { prisma, generateShortLink } from "@/libs/index";

type RequestData = {
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(400).json({
      message: "Only POST request are allowed!",
    });
  }

  const { url }: RequestData = JSON.parse(req.body);
  const host = req.headers.host;
  const { shortCode, shortUrl } = generateShortLink(host!);

  // # checking if original url is valid
  if (!isWebUri(url)) {
    return res.status(400).json({
      statusCode: 400,
      error: {
        message: "Invalid Url",
      },
      data: null,
    });
  }

  /**
   * if there is an original url -> we going to query that url
   * else we going to create a new short url
   */

  const result = await prisma.$transaction(async (tx) => {
    // # query if there is an existing original url
    const originalUrl = await tx.url.findFirst({
      where: {
        originalUrl: url,
      },
    });

    if (originalUrl) return originalUrl;

    // # create a new url
    const newUrl = await tx.url.create({
      data: {
        originalUrl: url,
        shortUrl,
        urlCode: shortCode,
      },
    });

    // # create new analytic
    await tx.urlAnalytic.create({
      data: {
        clicked: 0,
        url: {
          connect: {
            id: newUrl.id,
          },
        },
      },
    });

    return newUrl;
  });

  return res.status(200).json({
    statusCode: 200,
    error: null,
    data: {
      originalUrl: result.originalUrl,
      shortUrl: result.shortUrl,
      code: result.urlCode,
    },
  });
}
