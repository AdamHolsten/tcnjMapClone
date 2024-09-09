// type WebDataProps = {
//   children: {
//     props: {
//       data: any; // Specify the actual type of data if known
//     };
//   };
// };
type WebDataItem = {
  galleryImage: {
    mediaItemUrl: string;
  };
  galleryCaption: string;
};
// type AdmissionEventItem = {
//   galleryImage: {
//     mediaItemUrl: string;
//   };
//   galleryCaption: string;
// };

type Props = {
  webData: WebDataItem[];
};

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
const deviceWidth = Dimensions.get("window").width;

const MyComponent: React.FC<Props> = ({ webData }) => {
  // console.log(webData);
  // console.log(admissionData);
  // console.log(webData.props.children.props.data);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      breakpoints: {
        "(min-width: 1301px) ": {
          slides: {
            perView: 3,
            spacing: 15,
            // origin: "center",
          },
        },
        "(min-width: 1001px)  and (max-width:1300px)": {
          slides: {
            perView: 3,
            spacing: 15,
            origin: "auto",
          },
        },
        "(min-width: 701px) and (max-width:1000px)": {
          slides: {
            perView: 2,
            spacing: 15,
            origin: "auto",
          },
        },
        "(max-width: 700px)": {
          slides: {
            perView: 2.5,
            spacing: 15,
            origin: "auto",
          },
        },
        "(max-width: 500px)": {
          slides: {
            perView: 1.75,
            spacing: 15,
            origin: "auto",
          },
        },
      },
      initial: 0,
      slides: {
        origin: "center",
        perView: 1.25,
        spacing: 15,
      },
      slideChanged() {
        // console.log("slide changed");
      },
    },
    [
      // add plugins here
    ]
  );

  return (
    <>
      {webData && (
        <div ref={sliderRef} className="keen-slider web-slug">
          {/* { && (
            <div className="keen-slider__slide mobile-filler"></div>
          )} */}
          {webData.map((item, index) => (
            <div key={index} className="keen-slider__slide">
              {index === 0 ? (
                <img
                  src={item?.galleryImage?.mediaItemUrl}
                  alt={item?.galleryCaption}
                  style={{ paddingLeft: deviceWidth < 720 ? 40 : 0 }}
                />
              ) : index === webData.length - 1 ? (
                <img
                  src={item?.galleryImage?.mediaItemUrl}
                  alt={item?.galleryCaption}
                  style={{ paddingRight: deviceWidth < 720 ? 40 : 0 }} // Adjust style for the last item if needed
                />
              ) : (
                <img
                  src={item?.galleryImage?.mediaItemUrl}
                  alt={item?.galleryCaption}
                />
              )}
            </div>
          ))}
          {/* <div className="keen-slider__slide">1</div>
          <div className="keen-slider__slide">2</div>
          <div className="keen-slider__slide">3</div> */}
        </div>
      )}
    </>
  );
};

export default MyComponent;
