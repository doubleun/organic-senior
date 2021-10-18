import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Update user and farm table
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
          FarmMain: {
            upsert: {
              create: {
                name: req.body.farmName,
                about: req.body.farmAbout,
                phone: req.body.farmPhone,
                address: req.body.farmAddress,
                province: req.body.farmProvince,
                district: req.body.farmDistrict,
                subDistrict: req.body.farmSubDistrict,
                postalCode: Number(req.body.farmPostalCode),
                socialLink: req.body.farmSocialLink,
                storeFront: req.body.farmStoreFront,
                delivery: req.body.farmDelivery,
              },
              update: {
                name: req.body.farmName,
                about: req.body.farmAbout,
                phone: req.body.farmPhone,
                address: req.body.farmAddress,
                province: req.body.farmProvince,
                district: req.body.farmDistrict,
                subDistrict: req.body.farmSubDistrict,
                postalCode: Number(req.body.farmPostalCode),
                socialLink: req.body.farmSocialLink,
                storeFront: req.body.farmStoreFront,
                delivery: req.body.farmDelivery,
              },
            },
          },
        },
      });

      res.status(200).send({ msg: "success" });
    } catch (err) {
      // res.json(req.body);
      res.status(500).send({ msg: "error", err });
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
