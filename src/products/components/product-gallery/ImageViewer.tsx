import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Zoom } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { ProductImageType } from "../../types/product";
import useScrollLock from "../../../shared/hooks/useScrollLock";
import { productImage, productImageFull } from "../../../shared/utilities/product-image";

import "swiper/css";
import "swiper/css/zoom";

type Props = {
  images: ProductImageType[];
  open: boolean;
  index: number;
  onClose: (index: number) => void;
};

const arrowStyles = `absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full
  bg-white/10 text-white transition-colors hover:bg-white hover:text-ink disabled:invisible sm:grid`;

export default function ImageViewer({ images, open, index, onClose }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [current, setCurrent] = useState(index);

  useEffect(() => setIsMounted(true), []);
  useScrollLock(open);

  useEffect(() => {
    if (!open || !swiper) return;
    swiper.zoom.out();
    swiper.slideTo(index, 0);
    setCurrent(index);
  }, [open, index, swiper]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose(current);
      if (event.key === "ArrowLeft") swiper?.slidePrev();
      if (event.key === "ArrowRight") swiper?.slideNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, swiper, current, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Imágenes del producto"
      className={`fixed inset-0 z-50 flex flex-col bg-ink/60 text-white backdrop-blur-sm transition-opacity duration-200 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <header
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3
          *:pointer-events-auto sm:px-6"
      >
        <p className="text-sm font-bold tabular-nums">
          {current + 1} / {images.length}
          <span className="ml-3 hidden text-xs font-semibold text-white/60 sm:inline">Doble clic para ampliar</span>
        </p>
        <button
          type="button"
          aria-label="Cerrar"
          onClick={() => onClose(current)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white
            hover:text-ink"
        >
          <FiX size={22} />
        </button>
      </header>

      <div className="relative min-h-0 flex-1">
        <Swiper
          modules={[Zoom]}
          zoom={{ maxRatio: 2.5 }}
          onSwiper={setSwiper}
          onSlideChange={({ activeIndex }) => setCurrent(activeIndex)}
          onClick={(_, event) => !(event.target instanceof HTMLImageElement) && onClose(current)}
          spaceBetween={24}
          className="h-full"
        >
          {images.map(image => (
            <SwiperSlide key={image.imageId} className="px-3 py-2 sm:px-20">
              <div className="swiper-zoom-container">
                <img src={productImageFull(image.imageUrl, 1600)} alt={image.name} className="rounded-xl bg-white" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Imagen anterior"
          disabled={current === 0}
          onClick={() => swiper?.slidePrev()}
          className={`left-4 ${arrowStyles}`}
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          type="button"
          aria-label="Imagen siguiente"
          disabled={current === images.length - 1}
          onClick={() => swiper?.slideNext()}
          className={`right-4 ${arrowStyles}`}
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {images.length > 1 && (
        <ul className="flex shrink-0 justify-center gap-2 overflow-x-auto px-4 pb-3 pt-1">
          {images.map((image, position) => (
            <li key={image.imageId} className="shrink-0">
              <button
                type="button"
                aria-label={`Ver imagen ${position + 1}`}
                aria-current={position === current}
                onClick={() => swiper?.slideTo(position)}
                className={`h-14 w-14 overflow-hidden rounded-lg bg-white p-1 transition-opacity ${
                  position === current ? "ring-3 ring-brand" : "opacity-50 hover:opacity-100"
                }`}
              >
                <img src={productImage(image.imageUrl, 160)} alt="" className="h-full w-full object-contain" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>,
    document.body,
  );
}
