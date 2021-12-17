import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    const prismaRes = await prisma.farmMain.update({
      where: {
        id: req.body.farmId,
      },
      data: {
        announcement: req.body.announceText,
        announceDate: req.body.announceDate,
      },
    });
    res.status(200).json({ message: "success", prismaRes });
  } catch (e) {
    res.status(422).send({ message: e.message, e: e });
  }
}
