import Image from "next/image";
import Link from "next/link";


export default function WeddingDetailsGifts() {
    return (
        <section className="pb-[90px] md:pb-[110px]">
            <div data-aos="fade-up" data-duration="1000">
                <h2 className="text-[60px] text-[#2D2D2D] font-high-spirited leading-[60px] mb-[30px] mx-auto w-full max-w-[450px]">Regalos</h2>
                <p className="text-[17px] text-[#2D2D2D] tracking-[1px] md:tracking-[1.5px] leading-[25.5px] mb-[50px] w-full max-w-[290px] md:max-w-[350px] mx-auto">Agradecemos sobre todo tu compañía. Los obsequios son opcionales; si aun así deseas un detalle, te dejamos algunas ideas.</p>
            </div>
            <div data-aos="fade-up" data-duration="1500" className="mb-[50px]">
                <i className="text-[#2D2D2D] fa-regular fa-envelope text-[50px] md:text-[60px] mb-[25px] md:mb-0" />
                <h2 className="text-[35px] md:text-[60px] text-[#2D2D2D] font-high-spirited leading-[52.5px] md:leading-[60px] mb-[40px] mx-auto w-full max-w-[450px]">Caja de sobres</h2>
            </div>
            <div data-aos="fade-up" data-duration="2000">
                <Image className="object-cover mx-auto mb-[20px] md:mb-[10px] w-full max-w-[114px] md:max-w-[140px] h-[34px] md:h-[42px]" src="/icono-amazon.png" width={140} height={42} alt="Ícono de Amazon" />
                <Link target="_blank" className="uppercase underline font-semibold text-[18px] md:text-[19px] text-[#2D2D2D] tracking-[1px] md:tracking-[1.5px] leading-[27px] md:leading-[28.5px]" href="#">Ver mesa de regalos</Link>
            </div>
        </section>
    );
}
