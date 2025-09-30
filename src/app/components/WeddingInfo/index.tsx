import WeddingInfoItem from "./WeddingInfoItem";

export default function WeddingInfo() {
    return (
        <section className="pt-[80px] pb-[50px] px-[30px] bg-[#EEF3F1] text-center">
            <h2 data-aos="fade-down" data-aos-duration="2500" className="font-high-spirited text-[60px] text-black mb-[70px] tracking-[0px] md:tracking-[1px] leading-[60px]">Dónde y Cuándo</h2>
            <WeddingInfoItem
                imageSrc="/san-juan-bosco.jpeg"
                imageAlt="Iglesia"
                title="Ceremonia Religiosa"
                description="Parroquia San Juan Bosco"
                time="05:30 PM"
                address="Avenida Francisco Franco, frente a Colegio Padre Misieri. Granada, Nicaragua."
                mapLink="https://maps.app.goo.gl/coj38DTdaqF2WhZ47"
            />
            <WeddingInfoItem
                imageSrc="/wedding-info1.png"
                imageAlt="Recepción"
                title="Recepción"
                description="Hotel Los Patios"
                time="07:30 PM"
                address="Calle Corrales 525, en Granada, Nicaragua."
                mapLink="https://maps.app.goo.gl/SYhy3VhVNZyRxivv6"
            />
        </section>
    )
};