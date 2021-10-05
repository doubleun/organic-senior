import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await prisma.user.update({
        where: {
          email: req.body.email,
        },
        data: {
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
          province: req.body.province,
          district: req.body.district,
          subDistrict: req.body.subDistrict,
          postalCode: Number(req.body.postalCode),
          socialLink: req.body.socialLink,
        },
      });
      res.status(200).send({ msg: "success" });
    } catch (err) {
      res.status(500).send({ msg: "success", err });
    }
  }

  // if (req.method === "GET") {
  //   const { province_name } = req.query;
  //   const province = provinces[province_name];
  //   res.status(200).json(province);
  // } else {
  //   res.status(401).send({ status: failed, message: "province not found" });
  // }
}
