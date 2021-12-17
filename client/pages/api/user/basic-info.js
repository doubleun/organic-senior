import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    const prismaRes = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
      select: {
        FarmMain: true,
        Order: {
          select: {
            status: true,
          },
        },
      },
    });
    res.status(200).json({ prismaRes });
  } catch (e) {
    res.status(422).send({ message: e.message, e: e });
  }
  // try {
  //   const prismaRes = await prisma.user.findFirst({
  //     where: {
  //       email: req.body.email,
  //     },
  //     select: {
  //       FarmMain: true,
  //     },
  //   });
  //   res.status(200).json({ prismaRes });
  // } catch (e) {
  //   res.status(422).send({ message: e.message, e: e });
  // }
}
