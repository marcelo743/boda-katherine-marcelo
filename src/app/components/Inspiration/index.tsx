interface InspirationProps {
    text: string;
    showIcon?: boolean;
    fallbackText?: string;
}

export default function Inspiration({ text, showIcon = true, fallbackText = "" }: InspirationProps) {
    return (
        // <section className="pt-[50px] md:pb-[88px]">
            <div className="h-64 w-full bg-center bg-cover bg-no-repeat bg-[url('/AR_1769.jpg')]"></div>

        // </section>
        // <section className="pt-[50px] md:pt-[120px] pr-[30px] md:pr-[70px] pb-[50px] md:pb-[88px] pl-[30px] md:pl-[70px] bg-[#BBD3B1] text-center">
        //     <div data-aos="zoom-in-up" data-aos-duration="1000">
        //         <p className="text-white text-[17px] md:text-[21px] tracking-[1px] leading-[25.5px] md:leading-[38px] mb-[20px] mx-[15px] md:mx-0">{text}</p>
        //         {showIcon ? (
        //             <i className="fa-solid fa-heart text-white text-[20px]" />
        //         ) : (
        //             <p className="text-white text-[19px] md:text-[21px]">{fallbackText}</p>
        //         )}
        //     </div>
        // </section>
    );
}
