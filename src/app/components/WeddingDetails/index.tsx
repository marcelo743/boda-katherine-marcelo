import WeddingDetailsDressCode from "./WeddingDetailsDressCode";
import WeddingDetailsGifts from "./WeddingDetailsGifts";
import WeddingDetailsPlayList from "./WeddingDetailsPlayList";

export default function WeddingDetails() {
    return (
        <section className="WeddingDetails">
            <WeddingDetailsDressCode />
            <WeddingDetailsGifts />
            <WeddingDetailsPlayList />
        </section>
    )
}