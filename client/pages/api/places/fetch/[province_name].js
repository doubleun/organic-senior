import provinces from "../provinces_database_finalized.json";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { province_name } = req.query;
    const province = provinces[province_name];
    res.status(200).json(province);
  } else {
    res.status(401).send({ status: failed, message: "province not found" });
  }
}
