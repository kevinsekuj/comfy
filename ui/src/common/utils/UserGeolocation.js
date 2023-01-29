export default class UserGeolocation {
  static #TIMEOUT_MS = 5000;

  static #MAXIMUM_CACHED_AGE_MS = 0;

  static #geolocationOptions = {
    enableHighAccuracy: true,
    timeout: this.#TIMEOUT_MS,
    maximumAge: this.#MAXIMUM_CACHED_AGE_MS,
  };

  static #isGeoLocationAvailable() {
    return 'geolocation' in navigator;
  }

  static #geolocationError(err) {
    throw new Error(
      `Unable to retrieve your location - ${err.message}. Please allow location sharing on your browser and refresh the page.`,
    );
  }

  static #geolocationSuccess(position) {
    return { latitude: position?.coords.latitude, longitude: position?.coords.longitude };
  }

  static async getUserCurrentCoordinates() {
    if (!this.#isGeoLocationAvailable()) {
      this.#geolocationError(new Error('geolocation is not supported by your browser'));
    }

    try {
      const data = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, this.#geolocationOptions);
      });
      return this.#geolocationSuccess(data);
    } catch (err) {
      return this.#geolocationError(err);
    }
  }
}
