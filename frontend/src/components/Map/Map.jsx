import React, { useEffect } from 'react';
import styles from './Map.module.css';

const Map = (props) => {
  useEffect(() => {
    const container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);

    let geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(props.area, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        let marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        marker.setMap(map);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  }, []);

  return (
    <div className={styles['map-container']}>
      <div className={styles['map-text']}>
        <div className={styles.label}>활동지역</div>
        <div className={styles.area}>{props.area}</div>
      </div>
      <div id='map' className={styles.map}></div>
    </div>
  );
};

export default Map;
