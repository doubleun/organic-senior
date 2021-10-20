import prisma from "../../../prisma/client";

export default async (req, res) => {
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
    res.status(200).send({ message: "update profile successfully" });
  } catch (e) {
    return res.status(422).send({ message: e.message, e: e });
  }
};
