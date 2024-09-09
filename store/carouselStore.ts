import { create } from "zustand";

interface StoreState {
  carouselStop: number;
  updateCarouselStop: (newStop: number) => void;
  showRecommendedText: boolean;
  toggleRecommendedText: () => void;
  viewport: { latitude: number | null; longitude: number | null };
  tracking: boolean;
  setTracking: (tracking: boolean) => void;
  watchID: number | null;
  startTracking: () => void;
  stopTracking: () => void;
  carouselHeight: number;
  setCarouselHeight: (height: number) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  mapLoaded: boolean;
  setMapLoaded: (loaded: boolean) => void;
}

const useStore = create<StoreState>((set, get) => ({
  carouselStop: 0,
  updateCarouselStop: (newStop: number) => set({ carouselStop: newStop }),
  showRecommendedText: false,
  toggleRecommendedText: () =>
    set((state) => ({ showRecommendedText: !state.showRecommendedText })),
  setTracking: () => set((state) => ({ tracking: !state.tracking })),

  viewport: { latitude: null, longitude: null },
  tracking: false,
  watchID: null,

  startTracking: () => {
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        set({
          viewport: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        });
        // console.log(pos);
      },
      (error) => {
        console.error("Error watching position:", error);
      },
      {
        timeout: 10000, // 10 seconds
        maximumAge: 1500, // 2 second
        enableHighAccuracy: true, // Use GPS for higher accuracy
      }
    );

    set({ watchID: id, tracking: true });
  },

  stopTracking: () => {
    const { watchID } = get();
    if (watchID) {
      navigator.geolocation.clearWatch(watchID);
      set({
        watchID: null,
        viewport: { latitude: null, longitude: null },
        tracking: false,
      });
    }
  },
  carouselHeight: 0,
  setCarouselHeight: (height: number) => set({ carouselHeight: height }),
  drawerOpen: false,
  setDrawerOpen: (open: boolean) => set({ drawerOpen: open }),
  mapLoaded: false,
  setMapLoaded: (loaded: boolean) => set({ mapLoaded: loaded }),
}));

export default useStore;
