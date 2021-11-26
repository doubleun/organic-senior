// Component imports
import Layout from "../layout/_layout";
import { FaFilter } from "react-icons/fa";
import ItemCard from "/pages/farm/_itemCard";

// Nextjs imports
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useRef, useMemo } from "react";

// SQL Database
import prisma from "../../prisma/client";

export default function ShopPage({ allProducts }) {
  const router = useRouter();
  const [productsUI, setProdcutsUI] = useState(allProducts);
  const [filterObject, setFilterObject] = useState({
    category: {
      Fruits: false,
      Vegetables: false,
      Meat: false,
      ["Dairy products"]: false,
      Nuts: false,
      Grains: false,
    },
  });

  const searchInput = useRef();

  // Handle search product
  function handleSearchProduct() {
    setProdcutsUI(
      allProducts.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchInput.current.value.toLowerCase())
      )
    );
  }

  // Handle filter
  function handleFilterProducts(newFilter) {
    if (newFilter.checked) {
      setFilterObject((prev) => ({
        ...prev,
        category: { ...prev.category, [newFilter.value]: true },
      }));
    } else {
      setFilterObject((prev) => ({
        ...prev,
        category: { ...prev.category, [newFilter.value]: false },
      }));
    }
  }

  // Produce selected filter categories
  const selectedCategories = useMemo(() => {
    // console.log(filterObject);
    return Object.keys(filterObject.category).filter(
      (key) => filterObject.category[key]
    );
  }, [filterObject]);

  // Handle filtering products UI
  const filterdProductsUI = useMemo(() => {
    console.log(selectedCategories);
    // If one filter is selected,  we'll return products that matched with the filter
    if (selectedCategories.length !== 0) {
      return productsUI.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // If there are no filter selected, return the normal product array
    return productsUI;
  }, [productsUI, filterObject]);

  return (
    <main className="allProductsPageMain">
      <section className="allProductsPageContent container">
        {/* Left side (search filter) */}
        <div className="searchFilterContainer">
          <h5>
            <FaFilter /> SEARCH FILTER
          </h5>

          {/* Filter by category */}
          <div className="list-group">
            By Category
            <label className="list-group-item">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value="Fruits"
                onChange={(e) => handleFilterProducts(e.target)}
              />
              Fruits
            </label>
            <label className="list-group-item">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value="Vegetables"
                onChange={(e) => handleFilterProducts(e.target)}
              />
              Vegetables
            </label>
            <label className="list-group-item">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value="Meat"
                onChange={(e) => handleFilterProducts(e.target)}
              />
              Meat
            </label>
            <label className="list-group-item">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value=""
              />
              Dairy products
            </label>
            <label className="list-group-item">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value=""
              />
              Nuts
            </label>
            <label className="list-group-item">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value=""
              />
              Grains
            </label>
          </div>

          {/* Filter by shipping method */}
          <div className="list-group">
            Shipping method
            <label className="list-group-item">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value=""
              />
              Delivery
            </label>
            <label className="list-group-item">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value=""
              />
              Store front
            </label>
          </div>

          {/* Filter by in stock*/}
          <div className="list-group">
            Stock
            <label className="list-group-item">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value=""
              />
              In-stock
            </label>
          </div>
        </div>

        {/* Right side (product listing) */}
        <div className="productListingContainer">
          {/* Sort by tab */}
          <div className="productsSortingTab">
            Sort by
            <button className="btn-active">Relevance</button>
            <button>Latest</button>
            <button>Top Sales</button>
            <select className="form-select">
              <option>Price</option>
              <option defaultValue="2">Price: Low to high</option>
              <option defaultValue="3">Price: High to low</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              ref={searchInput}
              onChange={handleSearchProduct}
            />
          </div>

          {/* Product listing grid (table) */}
          <div className="productsListingGrid">
            {/* All prodcuts listing */}
            {filterdProductsUI.map((product, index) => (
              <div
                onClick={() => router.push(`/product/${product.id}`)}
                key={index}
              >
                <ItemCard
                  productObj={product}
                  showProvince={product.farm.province}
                  key={product.id}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session?.user;

  // Get all products
  const allProducts = await prisma.product.findMany({
    include: {
      farm: true,
    },
  });

  // redirect if not logged in
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: { allProducts },
  };
}

ShopPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};