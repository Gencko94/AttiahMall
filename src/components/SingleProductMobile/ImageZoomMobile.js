import React from 'react';
import Slider from 'react-slick';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
export default function ImageZoomMobile({ data: { images, name } }) {
  const sliderRef = React.useRef();

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const mainSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleChangeSlide = React.useCallback(i => {
    sliderRef.current.slickGoTo(i);
    setCurrentSlide(i);
  }, []);
  return (
    <div className="mb-2">
      <Slider
        ref={slider => (sliderRef.current = slider)}
        {...mainSettings}
        className={`mb-2`}
      >
        {images.map((photo, i) => {
          return (
            <div key={i}>
              <Zoom>
                <img src={photo} alt={name} />
              </Zoom>
            </div>
          );
        })}
      </Slider>
      <div className={`flex justify-evenly items-center overflow-x-auto `}>
        {images.map((photo, i) => {
          return (
            <div key={i} className="">
              <img
                onClick={() => handleChangeSlide(i)}
                src={photo}
                alt={name}
                className={`${
                  currentSlide === i ? 'border border-red-700' : ''
                }`}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
