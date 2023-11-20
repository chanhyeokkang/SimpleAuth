// React 및 useState 를 가져오고, react-bootstrap 스타일 및 Signup 컴포넌트를 가져옴
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';

function Login() {
  // 상태 변수들을 초기화
  const [formData, setFormData] = useState({ username: '', password: '' }); // 로그인 폼 데이터
  const [loggedInUser, setLoggedInUser] = useState(null); // 현재 로그인한 사용자
  const [error, setError] = useState(''); // 오류 메시지
  const [isRegistering, setIsRegistering] = useState(false); // 회원가입 중인지 여부

  // 사용자 데이터를 저장할 상태 변수
  const [users, setUsers] = useState([
    { username: 'user1', password: 'pass' },
    { username: 'user2', password: 'pass2' },
  ]);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    // 입력한 사용자 정보로 로그인을 시도
    const user = users.find(
      (u) => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      // 로그인에 성공한 경우
      setLoggedInUser(user);
      setError(<span style={{ color: 'blue' }}>로그인에 성공하였습니다.</span>);
    } else {
      // 로그인에 실패한 경우
      setError(
        <span style={{ color: 'red' }}>
          아이디 또는 비밀번호를 다시 확인해 주세요.
        </span>
      );
    }
  };

  // 로그아웃 버튼 클릭 핸들러
  const handleLogout = () => {
    // 로그아웃하고 폼 데이터 초기화
    setLoggedInUser(null);
    setFormData({ username: '', password: '' });
  };

  // 회원가입 버튼 클릭 핸들러
  const handleSignup = ({ username, password }) => {
    // Signup 컴포넌트에서 회원가입 정보를 받아 처리
    setUsers([...users, { username, password }]);
    setError(<span style={{ color: 'blue' }}>회원가입에 성공하였습니다.</span>);
    setIsRegistering(false); // 회원가입 모드 종료
  };

  return (
    <div className="container">
      <h1>{isRegistering ? '회원가입' : '로그인'}</h1>
      {isRegistering ? (
        // 회원가입 모드인 경우 Signup 컴포넌트를 렌더링
        <Signup onSignup={handleSignup} />
      ) : (
        // 로그인 모드인 경우 로그인 폼을 렌더링
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="아이디"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="비밀번호"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          {!loggedInUser ? (
            // 로그인되어 있지 않으면 로그인 버튼을 렌더링
            <Button variant="primary" onClick={handleLogin}>
              로그인
            </Button>
          ) : null}
          {loggedInUser ? (
            // 로그인되어 있으면 로그아웃 버튼을 렌더링
            <Button variant="secondary" onClick={handleLogout}>
              로그아웃
            </Button>
          ) : (
            // 로그인되어 있지 않으면 회원가입 버튼을 렌더링
            <Button
              variant="primary"
              onClick={() => setIsRegistering(true)}
            >
              회원가입
            </Button>
          )}
          {error && <p className="errorMsg">{error}</p>}
        </Form>
      )}
    </div>
  );
}

export default Login;