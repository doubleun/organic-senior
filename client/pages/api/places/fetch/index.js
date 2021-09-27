import provinces from "../provinces_database_finalized.json";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(provinces);
  } else {
    res.status(401).send({ status: failed, message: "data not found" });
  }
}
