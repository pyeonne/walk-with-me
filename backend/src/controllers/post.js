/* 특정 포스트 조회
GET /api/posts/:id
 */
exports.read = (req, res) => {
  res.status(200).json({ success: '특정 포스트' });
};

/* 포스트 목록
GET /api/posts
 */
exports.list = (req, res) => {
  const queryObj = req.query;
  if (Object.keys(queryObj).length === 0) {
    res.status(200).json({ success: '포스트 목록' });
    return;
  }
  res.status(200).json({ success: '포스트 필터링' });
};

/* 포스트 작성
POST /api/posts
 */
exports.create = (req, res) => {
  res.status(200).json({ success: '포스트 등록' });
};

/* 포스트 수정
PUT /api/posts/:id
 */
exports.update = (req, res) => {
  res.status(200).json({ success: '포스트 수정' });
};

/* 포스트 제거
DELETE /api/posts/:id
 */
exports.delete = (req, res) => {
  res.status(200).json({ success: '포스트 삭제' });
};

/* 포스트 관심 등록
post /api/posts/:id/likes
 */
exports.like = (req, res) => {
  res.status(200).json({ success: '관심 등록' });
};

/* 포스트 관심 해제
delete /api/posts/:id/likes
 */
exports.unlike = (req, res) => {
  res.status(200).json({ success: '관심 해제' });
};
