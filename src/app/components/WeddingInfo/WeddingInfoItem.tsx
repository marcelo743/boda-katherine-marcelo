import Image from "next/image";
import Link from "next/link";

interface WeddingInfoItemProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  time: string;
  address: string;
  mapLink: string;
}

export default function WeddingInfoItem({
  imageSrc,
  imageAlt,
  title,
  description,
  time,
  address,
  mapLink,
}: WeddingInfoItemProps) {
  return (
    <div className="mb-[80px]">
      <Image src={imageSrc} width={438} height={329} alt={imageAlt} className="object-cover" priority  />
      <div className="pt-[40px] px-[30px] pb-[60px] bg-[#E7EEEB] border-[2px] border-[#B4A180] [border-style:double]">
        <h3 className="font-high-spirited text-[55px] md:text-[60px] text-[#191919] mb-[33px] md:mb-[30px] tracking-[0.5px] leading-[60px]">
          {title}
        </h3>
        <p className="text-center text-[18px] md:text-[21px] text-[#191919] tracking-[1px] leading-[31.5px] mb-[20px] md:mb-[36px] w-full max-w-[360px] mx-auto">
          {description}
        </p>
        <p className="text-center text-[18px] md:text-[21px] text-[#191919] tracking-[1px] leading-[31.5px] mb-[20px] md:mb-[36px]">
          {time}
        </p>
        <p className="text-center text-[18px] md:text-[21px] text-[#191919] tracking-[1px] leading-[31.5px] mb-[56px] w-full max-w-[310px] mx-auto">
          {address}
        </p>
        <Link
          href={mapLink}
          target="_blank"
          className="bg-[#BBD3B1] text-white text-[18px] tracking-[5px] py-[10px] px-[20px] uppercase"
        >
          Ver Mapa
        </Link>
      </div>
    </div>
  );
}
