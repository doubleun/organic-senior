// Component imports
import Layout from "/components/Layout";
import { FaFilter } from "react-icons/fa";
import ItemCard from "/components/Farm/ItemCard";

// Nextjs imports
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useRef, useMemo } from "react";

// SQL Database
import prisma from "../../prisma/client";

export default function ShopPage({ allProducts }) {
  allProducts = JSON.parse(allProducts);
  const router = useRouter();
  const [productsUI, setProductsUI] = useState(allProducts);
  const [sortBy, setSortBy] = useState("Relevance");
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
    setProductsUI(
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
    // console.log(selectedCategories);
    // If one filter is selected,  we'll return products that matched with the filter
    if (selectedCategories.length !== 0) {
      return productsUI.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // If there are no filter selected, return the normal product array
    return productsUI;
  }, [productsUI, filterObject]);

  // console.log(filterdProductsUI);

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
            <button
              className={sortBy === "Relevance" ? "btn-active" : ""}
              onClick={(e) => setSortBy(e.target.innerHTML)}
            >
              Relevance
            </button>
            <button
              className={sortBy === "Latest" ? "btn-active" : ""}
              onClick={(e) => {
                setSortBy(e.target.innerHTML);
                setProductsUI((prev) => prev.sort((a, b) => b.id - a.id));
              }}
            >
              Latest
            </button>
            <button
              className={sortBy === "Top Sales" ? "btn-active" : ""}
              onClick={(e) => {
                setSortBy(e.target.innerHTML);
                setProductsUI((prev) =>
                  prev.sort((a, b) => b.Order.length - a.Order.length)
                );
              }}
            >
              Top Sales
            </button>
            <select
              className={
                "form-select " +
                (sortBy.includes("Price") ? "select-active" : "")
              }
              onChange={(e) => {
                if (e.target.value === "2") {
                  setSortBy("Price: Low to high");
                  setProductsUI((prev) =>
                    prev.sort(
                      (a, b) =>
                        parseInt(a.price[0].price) - parseInt(b.price[0].price)
                    )
                  );
                } else {
                  setSortBy("Price: High to low");
                  setProductsUI((prev) =>
                    prev.sort(
                      (a, b) =>
                        parseInt(b.price[0].price) - parseInt(a.price[0].price)
                    )
                  );
                }
              }}
            >
              <option value={1}>Price</option>
              <option value={2}>Price: Low to high</option>
              <option value={3}>Price: High to low</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              ref={searchInput}
              onChange={handleSearchProduct}
              onClick={() => console.log(sortBy)}
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
      Order: {
        select: {
          date: true,
          Review: true,
        },
      },
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
    props: { allProducts: JSON.stringify(allProducts) },
  };
}

ShopPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
