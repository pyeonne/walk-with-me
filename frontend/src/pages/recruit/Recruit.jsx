import Map from '../../components/Map/Map';
import Card from '../../components/Card/Card';
import Avartar from '../../components/Avatar/Avatar';
import Tab from '../../components/Tab/Tab';
import Header from '../../components/Header/Header';
import styles from './Recruit.module.css';
import udmenu from './images/udmenu.svg';
import { useState } from 'react';

const Recruit = () => {
  let [tab, setTab] = useState('소개');
  let [modalOnOff, setModalOnoff] = useState(false);

  const udmenuClick = () => {
    setModalOnoff(!modalOnOff);
  };
  return (
    <div>
      <Header />
      <div className={styles['content-container']}>
        <Tab currTab={tab} />
        <div className={styles['img-card-container']}>
          <img
            className={styles['recruit-image']}
            src='https://cdn.pixabay.com/photo/2020/04/22/10/14/running-5077128_960_720.jpg'
          />
          <Card
            cardType='detail-card'
            style={{ width: '28rem', height: '45.5rem' }}
          />
        </div>
        <div className={styles['title-menu-container']}>
          <div className={styles['recruit-title']}>
            자전거 라이딩 소모임 신입 모집
          </div>
          <img
            className={styles['recruit-menu-button']}
            src={udmenu}
            onClick={udmenuClick}
          />
        </div>
        <div>
          <div className={styles['author-date-container']}>
            <Avartar
              className={styles['recruit-profile']}
              height='2.4rem'
              width='2.4rem'
            />
            <div className={styles['recruit-author']}>by 홀란드</div>
            <div className={styles['recruit-date']}>날짜</div>
            <div
              className={styles['recruit-menu-modal']}
              style={{ display: `${modalOnOff ? 'flex' : 'none'}` }}
            >
              <div className={styles['recruit-menu-modal-modify']}>
                수정하기
              </div>
              <div className={styles['recruit-menu-modal-delete']}>
                삭제하기
              </div>
            </div>
          </div>
        </div>
        <div className={styles['recruit-text']}>본문 내용</div>

        <Map area='경기도 평택시 죽백동' />
      </div>
    </div>
  );
};

export default Recruit;
