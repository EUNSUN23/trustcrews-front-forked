'use client';

import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Grid, Navigation, Pagination } from 'swiper/modules';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';
import { milestoneActiveStateStore } from '@/store/project/task/MilestoneStateStore';

interface SlideItem {
  key: string;
  components: ReactNode;
}

interface CustomSwiperProps {
  slideItems: SlideItem[];
  initActiveSlideIndex: number;
}

function CustomSwiper({ slideItems, initActiveSlideIndex }: CustomSwiperProps) {
  const swiperRef = useRef<SwiperCore | null>(null);

  const { activeMilestoneIndex: updateActiveSlideIndex } = useRecoilValue(
    milestoneActiveStateStore,
  );
  const activeSlideIndex =
    updateActiveSlideIndex !== null
      ? updateActiveSlideIndex
      : initActiveSlideIndex;

  const [slidePerView, setSlidePerView] = useState(() =>
    slideItems.length <= 4 ? slideItems.length - 1 : 3,
  );
  const mobile = useMediaQuery({ maxWidth: 700 });

  useEffect(() => {
    if (mobile) setSlidePerView(1);
  }, [mobile]);

  useEffect(() => {
    swiperRef.current?.slideToLoop(activeSlideIndex);
  }, [activeSlideIndex, updateActiveSlideIndex, initActiveSlideIndex]);

  return (
    <div className='pc:w-[1200px] tablet:w-[680px] mobile:w-full flex bg-white overflow-hidden z-0'>
      <Swiper
        className='swiper'
        slidesPerView={slidePerView}
        slidesPerGroup={1}
        loopAddBlankSlides={true}
        loop={true}
        modules={[Navigation, Pagination, Grid]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slideItems.map(({ key, components }) => (
          <SwiperSlide key={key}>{components}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CustomSwiper;
