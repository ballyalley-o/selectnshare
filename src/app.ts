import axios from 'axios'


const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement


const GOOGLE_API_KEY = "AIzaSyCNzeKp8EQldK-8GESv-sKZMCFtv4kkyCM";
// declare var google: any;

type GoogleGeocodingRes = {
  results: {geometry: {location: {lat: number, lng: number}}}[];
  status: 'OK' | 'ZERO_RESULTS' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR'
}

function searchAddressHandler(e: Event) {
  e.preventDefault();
  const enteredAddress = addressInput.value;

  //google map API'
    axios
      .get<GoogleGeocodingRes>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`
      )
      .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
          throw new Error("Location, Not found");
        } else if (response.data.status === 'INVALID_REQUEST') {
          throw new Error("Invalid Request")
        } else if (response.data.status === 'UNKNOWN_ERROR') {
          throw new Error("Unknown Error")
        }
       const coordinates = response.data.results[0].geometry.location;
       const map = new google.maps.Map(
         document.getElementById("map") as HTMLElement,
         {
           center: coordinates,
           zoom: 16,
         });
            new google.maps.Marker({
              position: coordinates,
              map: map,
  });
      })
      .catch((err) => {
        alert(err.message)
        console.log(err);
      });
}


form.addEventListener('submit', searchAddressHandler)