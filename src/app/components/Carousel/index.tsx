import { Swiper } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

export default function Carousel({ children }: { children: React.ReactNode }) {
    return (
        <Swiper
            modules={[EffectFade, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            effect="fade"
            navigation
        >
            {children}
        </Swiper>
    );
}