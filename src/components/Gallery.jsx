import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/thumbs'
import './Gallery.css'

// Cloudinary: optimized URLs for fast load on Vercel (smaller size, auto format/quality)
function cloudinaryImageUrl(rawUrl, opts = {}) {
  const { width = 800, quality = 'auto', format = 'auto' } = opts
  if (!rawUrl || !rawUrl.includes('cloudinary.com')) return rawUrl
  const insert = `w_${width},q_${quality},f_${format}/`
  return rawUrl.replace('/image/upload/', `/image/upload/${insert}`)
}

const MEDIA_ITEMS_RAW = [
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772428115/33_hx8rth.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772428115/3_pl5bxd.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772428115/11_lmvcwc.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772428115/8_yrbq5q.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772428115/6_g1xlp8.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772428115/WhatsApp_Image_2026-03-02_at_10.03.12_AM_ddimr9.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772428115/7_stfxhr.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772428114/4_eaomwt.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772428114/2_usufn6.jpg' },
]
// Display: optimized for slides (800px) and lightbox (full res). Thumb URLs built per-use.
const MEDIA_ITEMS = MEDIA_ITEMS_RAW.map((item) =>
  item.type === 'image'
    ? { ...item, srcOptimized: cloudinaryImageUrl(item.src, { width: 800 }) }
    : item
)

const MOBILE_BREAKPOINT = 768
const MOBILE_GALLERY_LIMIT = 5

function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const sectionRef = useRef(null)
  const visible = useInView(sectionRef, { once: true, amount: 0.1 })
  const [isMobile, setIsMobile] = useState(false)

  const displayMediaItems = isMobile ? MEDIA_ITEMS.slice(0, MOBILE_GALLERY_LIMIT) : MEDIA_ITEMS

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const handle = () => setIsMobile(mql.matches)
    handle()
    mql.addEventListener('change', handle)
    return () => mql.removeEventListener('change', handle)
  }, [])

  // Preload first few gallery images so they're ready when user scrolls (fast on Vercel)
  useEffect(() => {
    const toPreload = displayMediaItems.filter((m) => m.type === 'image').slice(0, 3).map((m) => m.srcOptimized || m.src)
    const links = toPreload.map((url) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
      return link
    })
    return () => links.forEach((link) => link.remove())
  }, [isMobile])

  return (
    <section ref={sectionRef} id="gallery" className={`gallery ${visible ? 'gallery--visible' : ''}`}>
      <div className="gallery__inner">
        <motion.h2
          className="gallery__heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px', amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 100, damping: 24 }}
        >
          Gallery
        </motion.h2>
        <motion.p
          className="gallery__sub"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px', amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 100, damping: 24, delay: 0.05 }}
        >
          The $BULL vibe.
        </motion.p>

        <motion.div
          className="gallery__slider-wrap"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px', amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.1 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow, Thumbs]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            spaceBetween={24}
            loop
            speed={700}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 12,
              stretch: 0,
              depth: 120,
              modifier: 1.4,
              slideShadows: true,
            }}
            navigation={{
              nextEl: '.gallery__btn-next',
              prevEl: '.gallery__btn-prev',
            }}
            pagination={{
              el: '.gallery__pagination',
              clickable: true,
              dynamicBullets: true,
            }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 1.8 },
              960: { slidesPerView: 2.4 },
              1280: { slidesPerView: 3 },
            }}
            className="gallery__swiper"
          >
            {displayMediaItems.map((item, i) => (
              <SwiperSlide key={`${item.type}-${i}`} className="gallery__slide">
                <button
                  type="button"
                  className="gallery__slide-inner"
                  onClick={() => setLightbox(item)}
                  aria-label={item.type === 'video' ? 'Play video' : 'View image'}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.srcOptimized || item.src}
                      alt={`Gallery ${i + 1}`}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={i < 3 ? 'high' : undefined}
                    />
                  ) : (
                    <>
                      <video
                        src={visible ? item.src : undefined}
                        data-src={item.src}
                        muted
                        loop
                        playsInline
                        preload={visible ? 'metadata' : 'none'}
                        aria-hidden
                      />
                      <span className="gallery__play-overlay" aria-hidden="true" />
                    </>
                  )}
                  <span className="gallery__slide-border" />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          <button type="button" className="gallery__btn gallery__btn-prev" aria-label="Previous slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className="gallery__btn gallery__btn-next" aria-label="Next slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="gallery__pagination" />
        </motion.div>

        <motion.div
          className="gallery__thumbs-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px', amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.2 }}
        >
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView="auto"
            freeMode
            watchSlidesProgress
            centeredSlides
            loop
            className="gallery__thumbs"
          >
            {displayMediaItems.map((item, i) => (
              <SwiperSlide key={`thumb-${i}`} className="gallery__thumb">
                {item.type === 'image' ? (
                  <img
                    src={cloudinaryImageUrl(item.src, { width: 150 })}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="gallery__thumb-video">
                    <video
                      src={visible ? item.src : undefined}
                      data-src={item.src}
                      muted
                      playsInline
                      preload={visible ? 'metadata' : 'none'}
                    />
                    <span className="gallery__thumb-play" aria-hidden />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {lightbox && (
        <div
          className="gallery__lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button type="button" className="gallery__lightbox-close" aria-label="Close" />
          <div className="gallery__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={cloudinaryImageUrl(lightbox.src, { width: 1200 })}
              alt="Gallery"
              className="gallery__lightbox-img"
              onClick={(e) => e.stopPropagation()}
              decoding="async"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
