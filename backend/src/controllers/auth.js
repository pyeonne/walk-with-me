exports.signUp = (req, res) => {
  res.status(200).json({ success: '회원가입' });
};

exports.signIn = (req, res) => {
  res.status(200).json({ success: '로그인' });
};

exports.signOut = (req, res) => {
  res.status(200).json({ success: '로그아웃' });
};
