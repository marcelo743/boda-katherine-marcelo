import { Swiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function Carousel({ children }: { children: React.ReactNode }) {
    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            effect="fade"
            autoplay={{ delay: 3000 }}
        >
            {children}
        </Swiper>
    );
}