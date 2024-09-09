import React, { useState, useEffect, useRef } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "../styles/keen-slider.scss";
import useStore from "../store/carouselStore";
import { StopTypes } from "../api/mapapi";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import { Asset } from "expo-asset";
const rightArrow = Asset.fromModule(require("../assets/arrow.png")).uri;

interface KeenCarouselProps {
  carouselContent: StopTypes[];
}

const KeenCarousel: React.FC<KeenCarouselProps> = ({ carouselContent }) => {
  const { carouselStop, updateCarouselStop } = useStore();
  const [currentSlide, setCurrentSlide] = useState(carouselStop);
  const [loaded, setLoaded] = useState(false);
  const programmaticChange = useRef(false); // To track if the change is programmatic
  // console.log(carouselContent);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 1301px) ": {
        slides: {
          perView: 4.25,
          spacing: 15,
          origin: "center",
        },
      },
      "(min-width: 1001px)  and (max-width:1300px)": {
        slides: {
          perView: 3.25,
          spacing: 15,
          origin: "center",
        },
      },
      "(min-width: 701px) and (max-width:1000px)": {
        slides: {
          perView: 2.5,
          spacing: 15,
          origin: "center",
        },
      },
      "(max-width: 700px)": {
        slides: {
          perView: 2.5,
          spacing: 15,
          origin: "center",
        },
      },
      "(max-width: 500px)": {
        slides: {
          perView: 1.25,
          spacing: 15,
          origin: "center",
        },
      },
    },
    initial: 0,
    slides: {
      origin: "center",
      perView: 1.25,
      spacing: 15,
    },
    slideChanged(slider) {
      const newSlide = slider.track.details.rel;
      setCurrentSlide(newSlide);
      if (!programmaticChange.current) {
        updateCarouselStop(newSlide); // Update the store only if it's not a programmatic change
      }
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    if (loaded && instanceRef.current) {
      if (carouselStop !== currentSlide) {
        programmaticChange.current = true; // Set the flag before moving the slide
        instanceRef.current.moveToIdx(carouselStop);

        // Use a short delay to ensure the programmatic change flag is reset
        setTimeout(() => {
          programmaticChange.current = false;
          setCurrentSlide(carouselStop); // Ensure the currentSlide state is in sync
        }, 450); // Adjust the timeout based on the transition duration
      }
    }
  }, [carouselStop, loaded, currentSlide]);
  const deviceWidth = Dimensions.get("window").width;

  return (
    <div className="navigation-wrapper">
      <div ref={sliderRef} className="keen-slider">
        {/* <div className="keen-slider__slide number-slide1">1</div>
        <div className="keen-slider__slide number-slide2">2</div>
        <div className="keen-slider__slide number-slide3">3</div>
        <div className="keen-slider__slide number-slide4">4</div>
        <div className="keen-slider__slide number-slide5">5</div>
        <div className="keen-slider__slide number-slide7">7</div>
        <div className="keen-slider__slide number-slide8">8</div>
        <div className="keen-slider__slide number-slide9">9</div>
        <div className="keen-slider__slide number-slide10">10</div>
        <div className="keen-slider__slide number-slide11">11</div>
        <div className="keen-slider__slide number-slide12">12</div>
        <div className="keen-slider__slide number-slide13">6</div>
        <div className="keen-slider__slide number-slide14">6</div>
        <div className="keen-slider__slide number-slide15">6</div>
        <div className="keen-slider__slide number-slide16">6</div>
        <div className="keen-slider__slide number-slide17">6</div> */}
        {carouselContent.map((stop, index) => {
          let stopImage = stop.virtualTourSlide.mobileStopImage.mediaItemUrl;
          let url = stop.virtualTourSlide.mobileStopImage.mediaItemUrl;

          const getLastSegment = (url: string): string => {
            const parts = url.split("/");
            return parts.pop() || ""; // Return an empty string if `pop()` is undefined
          };

          const lastSegment = getLastSegment(url);
          let smallStopImageFinal = `https://tcnj.edu/custom/map-app/images/small-hero/${lastSegment}`;
          return (
            <div
              className={`keen-slider__slide  number-slide${index}`}
              onClick={() => {
                router.push(`/(stops)/${stop.slug}`); // Navigate to the specified route

                // Handle navigation when the image is pressed
              }}
              key={index}
            >
              <img
                alt={stop.title}
                src={deviceWidth > 400 ? stopImage : smallStopImageFinal}
              />
              <div className="title-and-arrow">
                <h2 style={{ fontFamily: "AlfaSlabOne_400Regular" }}>
                  {stop.title}
                </h2>
                <img src={rightArrow} alt="arrow" className="arrow" />
                <p className="number-slide">
                  {stop.virtualTourSlide.stopNumber}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeenCarousel;
