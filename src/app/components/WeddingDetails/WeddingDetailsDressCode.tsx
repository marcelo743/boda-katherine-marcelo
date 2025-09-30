import Image from "next/image";


export default function WeddingDetailsDressCode() {
    return (
        <section className="pb-[100px] md:pb-[130px]">
            <h2 data-aos="fade-right" className="text-[60px] text-[#2D2D2D] font-high-spirited leading-[60px] mb-[25px] md:mb-[40px] mx-auto w-full max-w-[450px]">Código de vestimenta</h2>
            <p data-aos="fade-right" className="uppercase text-[17px] md:text-[19px] text-[#2D2D2D] tracking-[1px] md:tracking-[1.5px] leading-[25.5px] md:leading-[28.5px] mb-[20px] md:mb-[30px]">FORMAL</p>
            <Image className="object-cover mx-auto w-full max-w-[179px] md:max-w-[219px] h-[164px] md:h-[200px]" src="/iconodresscode.png" width={219} height={200} alt="Ícono de código de vestimenta" />
        </section>
    );
}
