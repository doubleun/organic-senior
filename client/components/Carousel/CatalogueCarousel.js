import Carousel from "react-bootstrap/Carousel";

const CatalogueCarousel = () => {
  return (
    <Carousel className="catalogueCarouselContainer" indicators={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/catalogueCarouselWall1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/catalogueCarouselWall2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/catalogueCarouselWall3.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CatalogueCarousel;
