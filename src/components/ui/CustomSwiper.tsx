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
import { activeMilestoneStateStore } from '@/features/project/auth/projectJobs/store/ActiveMilestoneStateStore';

type SlideItem = {
  key: string;
  components: ReactNode;
};

type CustomSwiperProps = {
  slideItems: SlideItem[];
};

const CustomSwiper = ({ slideItems }: CustomSwiperProps) => {
  const { index: activeMilestoneIndex } = useRecoilValue(
    activeMilestoneStateStore,
  );

  const swiperRef = useRef<SwiperCore | null>(null);
  const [slidePerView, setSlidePerView] = useState(() =>
    slideItems.length <= 4 ? slideItems.length - 1 : 3,
  );

  useEffect(() => {
    swiperRef.current?.slideToLoop(activeMilestoneIndex);
  }, [activeMilestoneIndex]);

  const mobile = useMediaQuery({ maxWidth: 700 });
  useEffect(() => {
    if (mobile) setSlidePerView(1);
  }, [mobile]);

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
};

export default CustomSwiper;
