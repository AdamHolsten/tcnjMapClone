export interface StopTypes {
  title: string;
  slug: string;
  virtualTourSlide: {
    stopNumber: number;

    mobileStopImage: {
      mediaItemUrl: string;
    };

    latitude: number;
    longitude: number;
  };
}

export interface IndividualStopTypes {
  title: string;
  virtualTourSlide: {
    abbreviatedTitle: string;
    introductoryText: string;
    videoEmbed: string;
    mobileHero: {
      mediaItemUrl: string;
    };
    backgroundImage: {
      mediaItemUrl: string;
    };
    imageGallery: {
      galleryImage: {
        mediaItemUrl: string;
      };
      galleryCaption: string;
    }[];
    imageGalleryHidden: {
      galleryImage: {
        mediaItemUrl: string;
      };
      galleryCaption: string;
    }[];
    additionalLinks: string;
  };
}

export interface ProgramTypes {
  title: string;
  program: {
    degreeType: [];
    slug: string;
    school: [];
    programOptions: [];
    additionalOptions: [];
    appSelectedProgram: boolean;
    appImage: {
      sourceUrl: string;
    };
  };
}
export interface AdmissionEvents {
  title: string;
  visitAppSettings: {
    eventDate: string;
    eventLink: string;
    imageNumber: number;
  };
}
export interface AdmissionHeadshots {
  staffProfile: {
    headshot: {
      mediaItemUrl: string;
    };
    lastName: string;
  };
}

export const getStops = async (): Promise<StopTypes[]> => {
  const response = await fetch("https://virtualtour.tcnj.edu/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query TourStops {
       virtualTourSlides(first:20) {
                nodes {
                  title
                  slug
                  virtualTourSlide {
                    abbreviatedTitle
                    mobileStopImage {
                      mediaItemUrl
                    }
                    latitude
                    longitude
                    stopNumber
                    
                }
              }
            }
        }
      `,
      variables: {},
    }),
  });

  const data = await response.json();
  const sortedDataByStop = data.data.virtualTourSlides.nodes.sort(
    (a: any, b: any) => {
      return a.virtualTourSlide.stopNumber - b.virtualTourSlide.stopNumber;
    }
  );

  return sortedDataByStop.map((stop: StopTypes) => ({
    ...stop,
  }));
};

export const getIndividualStop = async (
  slug: string
): Promise<IndividualStopTypes | null> => {
  const response = await fetch("https://virtualtour.tcnj.edu/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query TourStop($slug: ID!) {
          virtualTourSlide(id: $slug, idType: SLUG) {
            title
            virtualTourSlide {
              abbreviatedTitle
              introductoryText
              videoEmbed
                 backgroundImage {
                  mediaItemUrl
                }
                mobileHero {
                  mediaItemUrl
                }
              imageGallery{
                galleryImage{
                  mediaItemUrl
                }
                galleryCaption
              }
              imageGalleryHidden{
                galleryImage{
                  mediaItemUrl
                }
                galleryCaption
              }
              additionalLinks
            }
          }
        }
      `,
      variables: {
        slug: slug,
      },
    }),
  });

  const data = await response.json();
  // console.log(slug);
  // console.log(data);

  if (data.errors) {
    console.error(data.errors);
    return null; // Return null or handle the error as needed
  }

  // Assuming it returns a single stop
  return data.data.virtualTourSlide;
};

export const getUndergradPrograms = async (): Promise<ProgramTypes[]> => {
  const response = await fetch("https://ceva6.tcnj.edu/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query AppSelectProg {
              programs(first:120) {
                nodes {
                  program {
                    degreeType
                    slug
                    school
                    programOptions
                    additionalOptions
                    appSelectedProgram
                    appImage{
                      sourceUrl
                    }
                  }
                  title
                }
              }
            }`,
      variables: {},
    }),
  });

  const data = await response.json();
  const filteredPrograms = data.data.programs.nodes
    .filter(
      (node: { program: { appSelectedProgram: any } }) =>
        node.program.appSelectedProgram
    )
    .sort((a: { title: string }, b: { title: any }) =>
      a.title.localeCompare(b.title)
    );
  return filteredPrograms;
};

export const getAdmissionEvents = async (): Promise<AdmissionEvents[]> => {
  const response = await fetch("https://admissions.tcnj.edu/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query AdmissionEvents {
                visitAppEvents {
                  nodes {
                    visitAppSettings {
                      eventDate
                      eventLink
                      imageNumber
                    }
                    title
                  }
                }
              }`,
      variables: {},
    }),
  });

  const data = await response.json();
  const sortedEvents = data.data.visitAppEvents.nodes;
  // const sortedEvents = data.data.visitAppEvents.nodes.sort(
  //   (a: { title: string }, b: { title: any }) => a.title.localeCompare(b.title)
  // );
  return sortedEvents;
};

export const getAdmissionHeadshots = async (): Promise<
  AdmissionHeadshots[]
> => {
  const response = await fetch("https://admissions.tcnj.edu/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query staffProfile {
                staffProfiles(first:30) {
                  nodes {
                    staffProfile {
                      headshot {
                        mediaItemUrl
                      }
                      lastName
                    }
                  }
                }
              }`,
      variables: {},
    }),
  });

  const data = await response.json();
  const getHeadshots = data.data.staffProfiles.nodes;
  // const sortedEvents = data.data.visitAppEvents.nodes.sort(
  //   (a: { title: string }, b: { title: any }) => a.title.localeCompare(b.title)
  // );
  return getHeadshots;
};
