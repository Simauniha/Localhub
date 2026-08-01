import api from "./api.js";

const placesService = {
  async getNearbyPlaces(lat = 30.7333, lng = 76.7794, type = "") {
    const params = { latitude: lat, longitude: lng };
    if (type) params.type = type;
    const res = await api.get("/places/nearby", { params });
    return res.data || [];
  },
};

export default placesService;
