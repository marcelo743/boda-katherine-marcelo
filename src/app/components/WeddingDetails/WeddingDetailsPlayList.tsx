import Link from "next/link";

export default function WeddingDetailsPlayList() {
  return (
    <section className="pb-[80px]">
      <h2 className="text-[17px] text-[#2D2D2D] tracking-[1px] md:tracking-[1.5px] leading-[25.5px] mb-[50px] w-full max-w-[300px] md:max-w-[350px] mx-auto">Te invitamos a sumarte al playlist de nuestra boda y agregar los temas que no pueden faltar en esta celebración tan inolvidable.</h2>
      <Link className="block text-white text-[17px] uppercase tracking-[3px] bg-[#BBD3B1] py-2.5 px-5 w-full max-w-[336px] mx-auto mb-[35px]" href="https://music.youtube.com/playlist?list=PLEMV-laAHgoz1p-D2W4e7p9_UO5izutoa&jct=M6eK-ppWCO2vy6SXpaVeOg" target="_blank">
        Agregar una canción{' '}
        <i className="fa-solid fa-plus" />
      </Link>
    </section>
  );
}
