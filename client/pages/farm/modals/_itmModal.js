import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function NewItemModal({
  selectedProductIndex,
  farmId,
  setShowItemModal,
  setAlertSuccess,
  farmProductsUI,
  setFarmProductsUI,
}) {
  const productName = useRef();
  const productCategory = useRef();
  const productDesc = useRef();
  const productStockAmount = useRef();
  // Array of all unit name field refs
  const productUnitEls = useRef([]);
  // Array of all unit price field refs
  const productPriceEls = useRef([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const variationNumber = Array(3).fill(0);

  // If no product provide default value which is false, otherwise grab it from the array
  const [productInStock, setProductInStock] = useState(
    farmProductsUI[selectedProductIndex]?.inStock || false
  );

  // Function that sets initial product value
  useEffect(() => {
    // If no index (ie. adding not updating), return
    if (selectedProductIndex === null) {
      return;
    }

    // Give values to all field
    productName.current.value = farmProductsUI[selectedProductIndex].name;
    productStockAmount.current.value =
      farmProductsUI[selectedProductIndex].stockAmount;
    productDesc.current.value =
      farmProductsUI[selectedProductIndex].description;
    productCategory.current.value =
      farmProductsUI[selectedProductIndex].category;
    console.log(farmProductsUI);
    farmProductsUI[selectedProductIndex].price.forEach((option, index) => {
      productUnitEls.current[index].value = option.unit;
      productPriceEls.current[index].value = option.price;
    });
    // productPrice.current.value = farmProductsUI[selectedProductIndex].price;

    // Set images if there are any
    // TODO: Make product images updatable
    for (let image of farmProductsUI[selectedProductIndex].productImages) {
      setUploadImages((prev) => [...prev, { file: "none", preview: image }]);
    }
  }, []);

  // Function that run every time new image select
  useEffect(() => {
    // If no image selected this won't run
    if (!selectedImage || uploadImages.length === 3) {
      return;
    }

    // create image preview
    const objectUrl = URL.createObjectURL(selectedImage);
    setUploadImages((prev) => [
      ...prev,
      { file: selectedImage, preview: objectUrl },
    ]);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  // Function for handling add new product
  const handleUpdateProduct = async (action, images) => {
    //* Upload images *//
    // If no image selected, stop the function
    if (!images || images.length === 0) return;

    // If form not filled up return
    if (
      !productName ||
      productUnitEls.current[0].value === "" ||
      productPriceEls.current[0].value === ""
    )
      return;

    // Filter alreay uploaded images
    const temp_arr = images.filter((img) => img.file !== "none");

    // If there are new images, we are going to upload them and then push existed images url into the response array
    let newImage = { image_urls: [] };
    if (temp_arr.length > 0) {
      // Map and append all images
      const formData = new FormData();
      temp_arr.map((img) => {
        formData.append("image", img.file);
      });

      // Upload to cloudinary
      const res = await fetch(
        "http://localhost:3000/api/settings/upload-multiple",
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.status === 200) {
        // Get image urls
        newImage = await res.json();
        // console.log(newImage.image_urls);
      }
    }

    // Add existed images urls to newImage.image_urls array
    images.map((img) =>
      img.file === "none" ? newImage.image_urls.push(img.preview) : null
    );

    // Wrap unit and price togther
    const productUnitPrice = productUnitEls.current.reduce(
      (arr, current, index) =>
        // If unit name is "" we return the previous object
        // (ie. skip an iteration and not put empty variation in the object)
        current.value === ""
          ? arr
          : [
              ...arr,
              {
                unit: current.value,
                price: productPriceEls.current[index].value,
              },
            ],
      []
    );

    // Update database
    const updateRes = await fetch(
      "http://localhost:3000/api/farm/update-product-database",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          farmId,
          productId: farmProductsUI[selectedProductIndex]?.id,
          productName: productName.current.value,
          productPrice: productUnitPrice,
          productCategory: productCategory.current.value,
          productDesc: productDesc.current.value,
          productInStock,
          productStockAmount: productInStock
            ? parseInt(productStockAmount.current.value)
            : 0,
          productImages: newImage.image_urls,
        }),
      }
    );

    // Get data out of response
    const updateData = await updateRes.json();
    // console.log(updateData);

    if (updateRes.status === 200) {
      // Show success alert
      setAlertSuccess(true);
      setTimeout(() => setAlertSuccess(false), 6000);
      console.log("Successfully added a new product");

      // Update UI
      if (action === "add") {
        setFarmProductsUI(updateData.prismaRes.Product);
      } else {
        setFarmProductsUI(updateData.prismaRes.farm.Product);
      }

      // Close the modal
      setShowItemModal(false);
    }
  };

  return (
    <div className="farmAddNewItemModal">
      {selectedProductIndex !== null ? (
        <>
          <h3>Update product</h3>
          <p id="subtitle">Update product you wish to sell</p>
        </>
      ) : (
        <>
          <h3>Add new product</h3>
          <p id="subtitle">Add new product you wish to sell</p>
        </>
      )}
      {/* Divider about product */}
      <div className="customDivider">
        <span className="dividerText">About product</span>
      </div>

      {/* About product */}
      <Form>
        <div className="addProductNameCategory">
          {/* Product name */}
          <div>
            <Form.Label>Product name</Form.Label>
            <Form.Group className="mb-3" controlId="addProductName">
              <Form.Control
                type="text"
                placeholder="Product name"
                required
                ref={productName}
              />
            </Form.Group>
          </div>

          {/* Category */}
          <div className="categorySelect">
            <Form.Label>Category</Form.Label>
            <Form.Select className="mb-3" ref={productCategory}>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Meat">Meat</option>
              <option value="Dairy products">Dairy products</option>
              <option value="Nuts">Nuts</option>
              <option value="Grains">Grains</option>
            </Form.Select>
          </div>
        </div>

        {/* Product unit and price (grid container) */}
        <div className="addProductPriceGridContainer">
          {/* Product unit and price grid */}
          <div className="priceGrid">
            {/* Attributes */}
            <Form.Label>Unit variation</Form.Label>
            <Form.Label>Price</Form.Label>

            {/* Variations and price */}
            {/* //TODO: Add button for adjusting the variation number */}
            {variationNumber.map((variation, index) => (
              <>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Unit name"
                    ref={(el) => (productUnitEls.current[index] = el)}
                    key={index}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Enter unit price"
                    ref={(el) => (productPriceEls.current[index] = el)}
                    key={index + 1}
                  />
                </Form.Group>
              </>
            ))}
          </div>
        </div>

        {/* Product description */}
        <Form.Group className="mb-3" controlId="addProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} ref={productDesc} />
        </Form.Group>

        {/* Divider stock amount */}
        <div className="customDivider">
          <span className="dividerText">Amount in stock</span>
        </div>

        {/* Product stock checkbox */}
        <div className="addProductStockFlex">
          <Form.Group className="mb-3" controlId="addProductInStock">
            <Form.Check
              type="checkbox"
              label="In stock"
              defaultChecked={productInStock}
              onChange={(e) => setProductInStock(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="addProductName">
            <Form.Control
              type="number"
              placeholder="Enter amount in stock"
              style={
                productInStock ? { display: "unset" } : { display: "none" }
              }
              ref={productStockAmount}
              defaultValue={1}
            />
          </Form.Group>
        </div>

        {/* Product images upload */}
        {/* Divider product images */}
        <div className="customDivider">
          <span className="dividerText">Product images</span>
        </div>

        {/* Images preview */}
        <div className="addProductImagesPreview">
          {uploadImages.map((img, index) => (
            <Image
              src={img.preview}
              id={img.preview}
              width="180px"
              height="150px"
              onClick={(e) => {
                setUploadImages((prev) =>
                  prev.filter((prev_img) => prev_img.preview !== e.target.id)
                );
              }}
              key={index + img.preview}
            />
          ))}
        </div>

        {/* Upload button */}
        <input
          className="form-control mb-3 mt-2"
          accept=".jpg, .jpeg, .png"
          type="file"
          disabled={uploadImages.length === 3}
          onChange={(e) => {
            setSelectedImage(e.target.files[0]);
            e.target.value = "";
          }}
        />

        {/* Product buttons */}
        <div className="addProductButtons">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setShowItemModal(false)}
          >
            Cancel
          </Button>

          {/* Button for add and update */}
          {selectedProductIndex !== null ? (
            <Button
              variant="primary"
              type="button"
              onClick={() => handleUpdateProduct("update", uploadImages)}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="primary"
              type="button"
              onClick={() => handleUpdateProduct("add", uploadImages)}
            >
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
