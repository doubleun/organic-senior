import formidable from "formidable";
import Cloudinary from "cloudinary";

const cloudinary = Cloudinary.v2;

// Turn off bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  //* Formidable for handling file upload
  // Formidable config
  const options = {
    filter: ({ mimetype }) => mimetype && mimetype.includes("image"),
    keepExtensions: true,
  };
  //// form.keepExtensions = true;

  // New instance
  const form = new formidable.IncomingForm(options);

  // Config cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  form.parse(req, async (err, fields, files) => {
    try {
      // Upload to cloudinary
      const uploadRes = await cloudinary.uploader.upload(files.image.path);

      res.json({
        message: "success",
        full_results: uploadRes,
        asset_id: uploadRes.asset_id,
        img_url: uploadRes.url,
      });
    } catch (e) {
      return res.status(422).send({ message: e.message, e: e });
    }
  });
};
