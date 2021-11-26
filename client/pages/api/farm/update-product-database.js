import prisma from "../../../prisma/client";

export default async (req, res) => {
  switch (req.body.action) {
    case "add":
      try {
        const prismaRes = await prisma.farmMain.update({
          where: {
            id: req.body.farmId,
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
          include: {
            Product: true,
          },
        });
        res.status(200).json({ message: "success", prismaRes });
      } catch (e) {
        res.status(422).send({ message: e.message, e: e });
      }
      break;

    case "update":
      try {
        //TODO: Return new array of updated products
        const prismaRes = await prisma.product.update({
          where: {
            id: req.body.productId,
          },
          data: {
            name: req.body.productName,
            price: req.body.productPrice,
            category: req.body.productCategory,
            description: req.body.productDesc,
            inStock: req.body.productInStock,
            stockAmount: req.body.productStockAmount,
            productImages: req.body.productImages,
          },
          select: {
            farm: {
              select: {
                Product: true,
              },
            },
          },
        });
        res.status(200).json({ message: "success", prismaRes });
      } catch (e) {
        res.status(422).send({ message: e.message, e: e });
      }
      break;
    case "delete":
      try {
        await prisma.product.delete({
          where: {
            id: req.body.productId,
          },
        });
        res.status(200).json({ message: "success" });
      } catch (e) {
        res.status(422).send({ message: e.message, e: e });
      }
      break;
  }
};
