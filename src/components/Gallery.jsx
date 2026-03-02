import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/thumbs'
import './Gallery.css'

const MEDIA_ITEMS = [
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421109/2_gpeqtg.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421078/1_rfldfo.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421078/33_lv4qip.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421075/41_gtczoo.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421075/40_faajx2.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421075/32_hky3xd.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421075/35_qtupm4.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421074/34_sxsjvq.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421074/31_melk7a.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421073/30_al0ecw.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421072/27_eowhfq.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421070/28_wkm6ak.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421069/26_hfdava.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421069/8_icwiwz.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421068/13_nadacy.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421067/23_ukfefy.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421065/20_erji8y.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421065/21_wy9gfg.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421064/22_nsh6g1.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421066/24_xn0yo4.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421063/7_txzx9e.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421063/19_n9rriv.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421062/14_ukffa1.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421060/10_qu2syr.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421062/15_wdpizd.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421063/16_ccgb8n.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421058/11_urgse7.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421058/9_hlcg3r.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421057/5_ufy8rl.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421056/3_oo3tvy.png' },
  { type: 'image', src: 'https://res.cloudinary.com/dep7dpjup/image/upload/v1772421056/4_s29qqa.png' },

]

const VIDEO_ITEMS = [
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346344/1_sjrx7x.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346343/4_grexpt.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346341/zz_qfg6ih.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346339/2_ir0czi.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346338/3_hx8obr.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346336/nn_o7bdnl.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346336/WhatsApp_Video_2026-03-01_at_10.17.26_AM_xcmvhn.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346336/s_f0lte7.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346335/mmy_qwtdd8.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346335/xcx_rscelu.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346334/qq_ajbdjj.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346333/v_x6lihx.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346330/aa_h5dly4.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346329/msma_mmynsp.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346328/nh_biymnr.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346327/lk_wswc0y.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346326/d_ldnf4d.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346325/kls_pkeoy5.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346324/a_rktpqn.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346323/e_fkvvqx.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346323/aaa_m1v8d0.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346321/mks_rzuspg.mp4',
  'https://res.cloudinary.com/dep7dpjup/video/upload/v1772346317/lo_ism9my.mp4',
].map((src, i) => ({ id: `video-${i}`, src }))

function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [visible, setVisible] = useState(false)
  const lightboxVideoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    const el = document.querySelector('.gallery')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!lightbox || !lightboxVideoRef.current) return
    if (lightbox.type === 'video') lightboxVideoRef.current.play().catch(() => {})
    return () => {
      if (lightboxVideoRef.current) lightboxVideoRef.current.pause()
    }
  }, [lightbox])

  return (
    <section id="gallery" className={`gallery ${visible ? 'gallery--visible' : ''}`}>
      <div className="gallery__inner">
        <h2 className="gallery__heading">Gallery</h2>
        <p className="gallery__sub">The $BULL vibe.</p>

        <div className="gallery__slider-wrap">
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
            {MEDIA_ITEMS.map((item, i) => (
              <SwiperSlide key={`${item.type}-${i}`} className="gallery__slide">
                <button
                  type="button"
                  className="gallery__slide-inner"
                  onClick={() => setLightbox(item)}
                  aria-label={item.type === 'video' ? 'Play video' : 'View image'}
                >
                  {item.type === 'image' ? (
                    <img src={item.src} alt={`Gallery ${i + 1}`} loading="lazy" />
                  ) : (
                    <>
                      <video src={item.src} muted loop playsInline preload="metadata" aria-hidden />
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
        </div>

        <div className="gallery__thumbs-wrap">
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
            {MEDIA_ITEMS.map((item, i) => (
              <SwiperSlide key={`thumb-${i}`} className="gallery__thumb">
                {item.type === 'image' ? (
                  <img src={item.src} alt="" loading="lazy" />
                ) : (
                  <div className="gallery__thumb-video">
                    <video src={item.src} muted playsInline preload="metadata" />
                    <span className="gallery__thumb-play" aria-hidden />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={`gallery__videos ${visible ? 'gallery__videos--visible' : ''}`}>
          <h3 className="gallery__videos-heading">Videos</h3>
          <p className="gallery__videos-sub">The $BULL vibe.</p>
          <div className="gallery__grid">
            {VIDEO_ITEMS.map((video, i) => (
              <button
                key={video.id}
                type="button"
                className="gallery__item"
                style={{ '--i': i }}
                onClick={() => setLightbox({ type: 'video', src: video.src })}
                aria-label="Play video"
              >
                <span className="gallery__item-frame" />
                <video
                  src={video.src}
                  className="gallery__video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
                <span className="gallery__play-icon" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="gallery__lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.type === 'video' ? 'Video player' : 'Image viewer'}
        >
          <button type="button" className="gallery__lightbox-close" aria-label="Close" />
          <div className="gallery__lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === 'image' ? (
              <img src={lightbox.src} alt="Gallery" className="gallery__lightbox-img" onClick={(e) => e.stopPropagation()} />
            ) : (
              <video
                ref={lightboxVideoRef}
                src={lightbox.src}
                controls
                className="gallery__lightbox-video"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
