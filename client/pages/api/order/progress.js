import prisma from "../../../prisma/client";

export default async (req, res) => {
  // Initial update progress (ie. add tracking)
  switch (req.body.action) {
    case "INIT_PROGRESS":
      try {
        const prismaRes = await prisma.order.update({
          where: {
            id: req.body.order_id,
          },
          data: {
            progress: req.body.new_progress,
            trackID: req.body.track_id,
          },
        });
        res.status(200).json({ message: "success", prismaRes });
      } catch (e) {
        res.status(422).send({ message: e.message, e: e });
      }
      break;
    // Update progress (No. 2 - 4)
    case "UPDATE_PROGRESS":
      try {
        const prismaRes = await prisma.order.update({
          where: {
            id: req.body.order_id,
          },
          data: {
            progress: req.body.new_progress,
            status: req.body.new_progress === 4 ? "Completed" : "In Progress",
          },
        });
        res.status(200).json({ message: "success", prismaRes });
      } catch (e) {
        res.status(422).send({ message: e.message, e: e });
      }
      break;

    case "RATE_PROGRESS":
      try {
        const prismaRes = await prisma.order.update({
          where: {
            id: req.body.order_id,
          },
          data: {
            progress: req.body.new_progress,
            Review: {
              create: {
                rating: req.body.rating,
                comment: req.body.comment,
              },
            },
          },
          include: {
            Review: true,
            user: true,
          },
        });
        res.status(200).json({ message: "success", prismaRes });
      } catch (e) {
        res.status(422).send({ message: e.message, e: e });
      }
      break;
  }
};
