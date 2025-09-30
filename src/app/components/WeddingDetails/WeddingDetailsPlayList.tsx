import Link from "next/link";

export default function WeddingDetailsPlayList() {
  return (
    <section className="pb-[80px]">
      <h2 className="text-[60px] text-[#2D2D2D] font-high-spirited leading-[60px] mb-[50px] mx-auto w-full max-w-[450px]">¿Nos ayudas con la playlist?</h2>
      <Link className="block text-white text-[17px] uppercase tracking-[3px] bg-[#BBD3B1] py-2.5 px-5 w-full max-w-[336px] mx-auto mb-[35px]" href="https://www.youtube.com/playlist?list=PLrmyaJ2asXvtUmmlQ4Ter0PIi9hX8AX7Q" target="_blank">
        Agregar una canción{' '}
        <i className="fa-solid fa-plus" />
      </Link>
    </section>
  );
}
