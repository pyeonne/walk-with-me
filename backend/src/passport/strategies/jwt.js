const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const { User } = require('../../models/index');
const secret = process.env.JWT_SECRET;

// passport-jwt인증에 사용할 옵션
const JWTConfig = {
  // header에 bearer스키마에 담겨온 토큰 해석
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // 복호화 방법사용
  secretOrKey: secret,
};

// 인증 성공시 콜백 함수
const JWTVerify = async (jwtPayload, done) => {
  try {
    // payload의 id값으로 유저의 데이터 조회
    const user = await User.findOne({ email: jwtPayload.email });
    // 유저 데이터 있으면 유저 데이터 객체 전송
    if (user) {
      done(null, user);
      return;
    }
    // 유저 데이터 없을 경우 에러
    done(null, false, { message: '올바르지 않은 인증 정보입니다.' });
  } catch (error) {
    console.log(error);
    done(error);
  }
};

module.exports = new JwtStrategy(JWTConfig, JWTVerify);
