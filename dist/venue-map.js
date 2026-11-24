"use strict";

function initializeVenueMap() {
  const mapElement = document.getElementById("venue-map-content");
  const controls = document.getElementById("venue-map-controls");
  const fallback = document.getElementById("venue-map-fallback");

  function loadDependency(tag, attributes) {
    const element = document.createElement(tag);
    Object.assign(element, attributes, { crossOrigin: "anonymous" });
    return new Promise((resolve, reject) => {
      element.addEventListener("load", resolve, { once: true });
      element.addEventListener("error", reject, { once: true });
      document.head.append(element);
    });
  }

  async function loadMap() {
    const leaflet = "https://unpkg.com/leaflet@1.9.4/dist";
    try {
      if (!window.L) await Promise.all([
        loadDependency("link", {
          rel: "stylesheet",
          href: leaflet + "/leaflet.css",
          integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        }),
        loadDependency("script", {
          src: leaflet + "/leaflet.js",
          integrity: "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        })
      ]);
    } catch {
      return;
    }

    const map = window.L.map(mapElement, {
      attributionControl: true,
      zoomControl: false,
      scrollWheelZoom: false
    }).setView([17.7247978, 82.7889111], 16);
    const zoomButtons = [...controls.querySelectorAll("button")];
    const tiles = window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      minZoom: 8,
      maxZoom: 17,
      noWrap: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    function syncZoomButtons() {
      zoomButtons[0].disabled = map.getZoom() >= map.getMaxZoom();
      zoomButtons[1].disabled = map.getZoom() <= map.getMinZoom();
    }

    zoomButtons.forEach((button) => {
      button.addEventListener("click", () => map.setZoom(map.getZoom() + Number(button.dataset.mapZoom)));
    });
    map.on("zoomend", syncZoomButtons);
    tiles.once("tileload", () => {
      fallback.hidden = true;
      controls.hidden = false;
      syncZoomButtons();
    });
    window.L.circleMarker([17.7247978, 82.7889111], { radius: 9, color: "#7d1029", weight: 3, fillColor: "#bd2740", fillOpacity: 0.9 }).addTo(map);
    tiles.addTo(map);
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    void loadMap();
  });
  observer.observe(mapElement);
}
