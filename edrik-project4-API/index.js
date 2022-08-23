let map;
let rectangle;
let result = false;
let counter = 0;
const resetButton = document.querySelector("#start");
var starting = false;
var correct = 0;

var styles = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
//creating map
function initMap() {
  const bounds = {
    north: 34.24460,
    south: 34.23562,
    west: -118.53591,
    east: -118.52472,
  };

  const CSUN = { lat: 34.23997222668108, lng: -118.53004015593856 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: CSUN,
    restriction: {
      latLngBounds: bounds,
      strictBounds: true,
    },
    zoom: 15,
  });
  map.setOptions({ styles: styles });

  map.addListener("dblclick", (e) => {
    answer(e.latLng, map);
  });
}
let questions = [
  "Where is Sand Volleyball on the map?",
  "Where is the SRC on the map?",
  "Where is Jacaranda on the map?",
  "Where is the library on the map?",
  "Where is Magnolia Hall on the map?",
];
let locations = [
  [34.24378, 34.24321, -118.52741, -118.52771  ],
  [34.2406, 34.23934, -118.5247, -118.52517],
  [34.24128, 34.24112, -118.53028, -118.52909],
  [34.2404, 34.23976, -118.52862, -118.53004],
  [34.23966, 34.23924,  -118.52818, -118.52842],
];
var bounds = {
  north: locations[counter][0],
  south: locations[counter][1],
  east: locations[counter][2],
  west: locations[counter][3],
};
let current = {};

function answer(latLng, map) {
  if (rectangle != null) {
    rectangle.setMap(null);
  }
  console.log(latLng);
  bounds = {
    north: locations[counter][0],
    south: locations[counter][1],
    east: locations[counter][2],
    west: locations[counter][3],
  };
  let stroke = "#00FF00";
  let marker = new google.maps.Marker({
    position: latLng,
  });
  if (within(marker) === false) {
    stroke = "#FF0000";
  }

  rectangle = new google.maps.Rectangle({
    strokeColor: stroke,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: stroke,
    fillOpacity: 0.35,
    map,
    bounds: bounds,
  });

  map.panTo(rectangle.getPosition());
}

function within(marker) {
  var inside = false;
  const rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true,
    geodesic: true,
  });
  if (rectangle && rectangle.getBounds && marker && marker.getPosition()) {
    inside = rectangle.getBounds().contains(marker.getPosition());
    if (rectangle.getBounds().contains(marker.getPosition())) {
      document.getElementById("q" + (counter + 1)).innerHTML =
        "Question " + (counter + 1) + ": Correct";
      correct++;
    } else
      document.getElementById("q" + (counter + 1)).innerHTML =
        "Question " + (counter + 1) + ": Wrong";
  }
  counter++;
  if (counter != 5)
    document.getElementById("queshere").innerHTML = questions[counter];
  else done();

  return inside;
}
function start() {
  document.getElementById("queshere").innerHTML = questions[0];
  resetButton.innerHTML = "Start Over";
  counter = 0;
  if (rectangle != null) rectangle.setMap(null);
  for (var i = 1; i <= 5; i++) {
    document.getElementById("q" + i).innerHTML =
      "Question " + i + ": Unanswered";
  }
  correct = 0;
}
function done() {
  document.getElementById("queshere").innerHTML =
    "The number of correct questions: " + correct;
}

resetButton.addEventListener("click", start);

window.initMap = initMap;
