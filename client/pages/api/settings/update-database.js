import prisma from "../../../prisma/client";

export default async (req, res) => {
  switch (req.body.action) {
    case "profile":
      try {
        // Update profile image in database
        await prisma.user.update({
          data: {
            image: req.body.img_url,
          },
          where: {
            email: req.body.email,
          },
        });
        res.status(200).send({ message: "update profile image successfully" });
      } catch (e) {
        return res.status(422).send({ message: e.message, e: e });
      }
      break;
    case "social-security":
      try {
        // Update social security card image in database
        await prisma.user.update({
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
        });
        res
          .status(200)
          .send({ message: "upload social secuirty card image successfully" });
      } catch (e) {
        return res.status(422).send({ message: e.message, e: e });
      }
      break;
    case "organic-cert":
      try {
        // Update social security card image in database
        await prisma.user.update({
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
        });
        res
          .status(200)
          .send({ message: "upload organic cert image successfully" });
      } catch (e) {
        return res.status(422).send({ message: e.message, e: e });
      }
      break;
    case "farm-images":
      try {
        // Update farm images in database
        await prisma.user.update({
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
        });
        res
          .status(200)
          .send({ message: "upload organic cert image successfully" });
      } catch (e) {
        return res.status(422).send({ message: e.message, e: e });
      }
      break;
  }
};
