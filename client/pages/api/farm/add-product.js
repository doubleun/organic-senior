import prisma from "../../../prisma/client";

export default async (req, res) => {
  try {
    await prisma.farmMain.update({
      where: {
        id: 1,
      },
      data: {
        Product: {
          create: {
            name: req.body.productName,
            price: req.body.productPrice,
            category: req.body.productCategory,
            description: req.body.productDesc,
            inStock: req.body.productInStock,
            stockAmount: req.body.productStockAmount,
            productImages: req.body.productImages,
          },
        },
      },
    });
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(422).send({ message: e.message, e: e });
  }
};
