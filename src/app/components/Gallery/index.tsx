import Image from "next/image";
import Carousel from "../Carousel";
import { SwiperSlide } from "swiper/react";

export default function Gallery() {
  const gallery = [
    { src: "/gallery/AR_1729.jpg", alt: "Image main" },
    { src: "/gallery/AR_1615.jpg", alt: "Image 1" },
    { src: "/gallery/AR_1639.jpg", alt: "Image 2" },
    { src: "/gallery/AR_1689.jpg", alt: "Image 3" },
    { src: "/gallery/AR_1726.jpg", alt: "Image 4" },
    { src: "/gallery/AR_1746.jpg", alt: "Image 5" },
    { src: "/gallery/AR_1755.jpg", alt: "Image 6" },
    { src: "/gallery/AR_1771.jpg", alt: "Image 7" },
    { src: "/gallery/AR_1776.jpg", alt: "Image 8" },
    { src: "/gallery/AR_1789.jpg", alt: "Image 9" },
    { src: "/gallery/AR_1794.jpg", alt: "Image 10" },
    { src: "/gallery/AR_1803.jpg", alt: "Image 11" },
    { src: "/gallery/AR_1826.jpg", alt: "Image 12" },
    { src: "/gallery/AR_1859.jpg", alt: "Image 13" },
    { src: "/gallery/AR_1522.jpg", alt: "Image 14" },
    { src: "/gallery/AR_1528.jpg", alt: "Image 15" },
    { src: "/gallery/AR_1551.jpg", alt: "Image 16" },
    { src: "/gallery/AR_1559.jpg", alt: "Image 17" },
    { src: "/gallery/AR_1571.jpg", alt: "Image 18" },
    { src: "/gallery/AR_1636.jpg", alt: "Image 19" },
    { src: "/gallery/AR_1647.jpg", alt: "Image 20" },
    { src: "/gallery/AR_1657.jpg", alt: "Image 21" },
    { src: "/gallery/AR_1702.jpg", alt: "Image 22" },
  ];
  const renderImages = () => {
    return gallery.map((image) => (
      <SwiperSlide key={image.alt}>
        <Image
          src={image.src}
          alt={image.alt}
          width={500}
          height={500}
        />
      </SwiperSlide>
    ));
  };
  return <section>
    <Carousel>
      {renderImages()}
    </Carousel>
  </section>;
}
