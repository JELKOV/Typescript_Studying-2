import axios from "axios";
// // 자동완성, 타입 체크 불가
// declare var google: any;

// 환경변수에서 Google Maps API 키 불러오기
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
console.log(GOOGLE_API_KEY); // (개발 중 확인용 - 배포 시 삭제 권장)

// HTML 요소 가져오기
const form = document.querySelector("form")!; // 주소 입력용 폼
const addressInput = document.getElementById("address")! as HTMLInputElement; // 주소 입력 필드
const mapElement = document.getElementById("map") as HTMLElement; // 지도를 렌더링할 div

// Google Maps Geocoding API 응답 타입 정의
type GoogleGeocodingResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: "OK" | "ZERO_RESULTS";
};

// 폼 제출 시 searchAddressHandler 실행
form.addEventListener("submit", searchAddressHandler);

// 주소 → 좌표 변환 → 지도 렌더링
function searchAddressHandler(event: Event) {
  event.preventDefault(); // 기본 폼 제출 방지

  const enteredAddress = addressInput.value.trim();
  if (!enteredAddress) {
    alert("주소를 입력해주세요.");
    return;
  }

  // Google Geocoding API 요청 URL 생성
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    enteredAddress
  )}&key=${GOOGLE_API_KEY}`;

  // API 요청 보내기
  axios
    .get<GoogleGeocodingResponse>(url)
    .then((response) => {
      // 응답 상태 및 결과 유효성 검사
      if (response.data.status !== "OK" || response.data.results.length === 0) {
        throw new Error("위치를 찾을 수 없습니다. 주소를 다시 확인해주세요.");
      }

      const coordinates = response.data.results[0].geometry.location;

      // 지도 로딩 및 좌표 표시
      loadGoogleMapsAndShowMap(coordinates.lat, coordinates.lng);
      console.log("좌표:", coordinates.lat, coordinates.lng);
    })
    .catch((err) => {
      alert(`오류: ${err.message}`);
      console.error("API 요청 실패:", err);
    });
}

// Google Maps SDK가 로드되어 있지 않으면 로드 후 지도 표시
function loadGoogleMapsAndShowMap(lat: number, lng: number) {
  if (window.google && window.google.maps) {
    // 이미 SDK가 로드되어 있다면 바로 렌더링
    showMap(lat, lng);
    return;
  }

  // SDK 동적 로딩
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`;
  script.async = true;
  script.defer = true;

  script.onload = () => showMap(lat, lng);
  script.onerror = () => alert("Google Maps SDK 로딩 실패!");

  document.head.appendChild(script);
}

// 지도 생성 및 마커 표시
function showMap(lat: number, lng: number) {
  const map = new google.maps.Map(mapElement, {
    center: { lat, lng },
    zoom: 16,
  });

  // 마커 표시 (추후 AdvancedMarkerElement로 마이그레이션 권장)
  new google.maps.Marker({
    position: { lat, lng },
    map,
  });
}
