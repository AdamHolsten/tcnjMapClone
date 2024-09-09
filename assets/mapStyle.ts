export const mapStyle = [
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  // {
  //   featureType: "road",
  //   elementType: "geometry.fill",
  //   stylers: [
  //     {
  //       color: "#ededed",
  //     },
  //   ],
  // },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        color: "#545454",
      },
      {
        lightness: 40,
      },
      {
        weight: 0.5,
      },
    ],
  },
];
