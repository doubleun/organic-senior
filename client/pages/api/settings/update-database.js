import prisma from "../../../prisma/client";

export default async (req, res) => {
  switch (req.body.action) {
    case "profile":
      try {
        // Update profile image in database
        const prismaRes = await prisma.user.update({
          data: {
            image: req.body.img_url,
          },
          where: {
            email: req.body.email,
          },
          include: {
            FarmMain: true,
          },
        });
        res
          .status(200)
          .send({ message: "update profile image successfully", prismaRes });
      } catch (e) {
        return res.status(422).send({ message: e.message, e: e });
      }
      break;
    case "social-security":
      try {
        // Update social security card image in database
        const prismaRes = await prisma.user.update({
          where: {
            email: req.body.email,
          },
          data: {
            FarmMain: {
              upsert: {
                create: {
                  socialImage: req.body.img_url,
                },
                update: {
                  socialImage: req.body.img_url,
                },
              },
            },
          },
          include: {
            FarmMain: true,
          },
        });
        res.status(200).send({
          message: "upload social secuirty card image successfully",
          prismaRes,
        });
      } catch (e) {
        return res.status(422).send({ message: e.message, e: e });
      }
      break;
    case "organic-cert":
      try {
        // Update social security card image in database
        const prismaRes = await prisma.user.update({
          where: {
            email: req.body.email,
          },
          data: {
            FarmMain: {
              upsert: {
                create: {
                  organicCertImage: req.body.img_url,
                },
                update: {
                  organicCertImage: req.body.img_url,
                },
              },
            },
          },
          include: {
            FarmMain: true,
          },
        });
        res.status(200).send({
          message: "upload organic cert image successfully",
          prismaRes,
        });
      } catch (e) {
        return res.status(422).send({ message: e.message, e: e });
      }
      break;
    case "farm-images":
      try {
        // Update farm images in database
        const prismaRes = await prisma.user.update({
          where: {
            email: req.body.email,
          },
          data: {
            FarmMain: {
              update: {
                farmImages: req.body.farmImages,
              },
            },
          },
          include: {
            FarmMain: true,
          },
        });
        res.status(200).send({
          message: "upload organic cert image successfully",
          prismaRes,
        });
      } catch (e) {
        return res.status(422).send({ message: e.message, e: e });
      }
      break;
  }
};
