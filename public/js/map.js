/*eslint-disable*/
const mapEl = document.getElementById('map');
const locations = JSON.parse(mapEl.dataset.locations);

const map = L.map('map', { zoomControl: false }).setView([0, 0], 1);
map.scrollWheelZoom.disable();

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const greenIcon = L.icon({
  iconUrl: '/img/pin.png',
  iconSize: [32, 40],
  iconAnchor: [16, 45],
  popupAnchor: [0, -50],
});

const points = [];
locations.forEach((loc) => {
  points.push([loc.coordinates[1], loc.coordinates[0]]);
  L.marker([loc.coordinates[1], loc.coordinates[0]], { icon: greenIcon })
    .addTo(map)
    .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
      autoClose: false,
    })
    .openPopup();
});

const bounds = L.latLngBounds(points).pad(0.2);
const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      map.flyToBounds(bounds, {
        duration: 2,
        easeLinearity: 0.25,
      });
    }
  },
  {
    root: null,
    threshold: 0.2,
  },
);

observer.observe(mapEl);
