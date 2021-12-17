import prisma from "../../../prisma/client";

export default async (req, res) => {
  // Add new order
  switch (req.body.action) {
    case "ADD_ORDER":
      try {
        const prismaRes = await prisma.user.update({
          where: {
            id: req.body.user_id,
          },
          data: {
            Order: {
              create: {
                product: {
                  // Use connect to grab existing product from product table
                  connect: { id: req.body.product_id },
                },
                selectedVariation: req.body.selectedVariation,
                deliveryMethod: req.body.deliveryMethod,
                amount: req.body.amount,
                total_price: req.body.totalPrice,
                cutomerEmail: req.body.customerEmail,
                ownerEmail: req.body.ownerEmail,
                status: "New",
              },
            },
          },
        });
        await prisma.product.update({
          where: {
            id: req.body.product_id,
          },
          data: {
            stockAmount: { decrement: req.body.amount },
          },
        });
        res.status(200).json({ message: "success", prismaRes });
      } catch (e) {
        res.status(422).send({ message: e.message, e: e });
      }
      break;

    // Response order
    case "RES_ORDER":
      try {
        const prismaRes = await prisma.order.update({
          where: {
            id: req.body.order_id,
          },
          data: {
            status: req.body.order_status,
            progress: req.body.order_progress,
            remark: req.body.order_remark,
          },
        });
        res.status(200).json({ message: "success", prismaRes });
      } catch (e) {
        res.status(422).send({ message: e.message, e: e });
      }
  }
};
