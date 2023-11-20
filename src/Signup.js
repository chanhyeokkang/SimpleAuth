import React, { useState } from 'react';  // 리액트 라이브러리와 useState 훅을 가져옴
import { Form, Button } from 'react-bootstrap';  // 리액트 부트스트랩에서 Form 및 Button 컴포넌트를 가져옴
import 'bootstrap/dist/css/bootstrap.min.css';  // 부트스트랩 CSS 스타일을 가져옴

function Signup({ onSignup }) {
  // useState 훅을 사용하여 상태 변수를 초기화
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');  // 에러 메시지를 저장하는 상태 변수를 초기화

  // 입력 필드 값이 변경될 때 호출되는 핸들러 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 회원가입 버튼을 클릭할 때 호출되는 핸들러 함수
  const handleSignup = () => {
    const { username, password, confirmPassword } = formData;

    //사용자 이름, 비밀번호 및 비밀번호 확인 필드가 모두 비어 있는지 확인하는 조건
    if (!username || !password || !confirmPassword) { 
     // 위의 조건이 만족되면, 코드는 setError 함수를 호출
      setError(<span style={{ color: 'red' }}>모든 필드를 입력해 주세요..</span>);
      return;
    }
    //비밀번호와 비밀번호 확인 필드의 값을 비교. 만약 두 값이 다르다면 이 조건은 참.
    if (password !== confirmPassword) {
      setError(
        <span style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</span>
      );
      return;
    }

    // 회원가입 정보를 부모 컴포넌트로 전달
    onSignup({ username, password });
    setError('');  // 에러 메시지를 초기화
  };

  return (
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
      <Form.Group controlId="formConfirmPassword">
        <Form.Control
          type="password"
          placeholder="비밀번호 확인"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSignup}>
        회원가입
      </Button>
      {error && <p className="errorMsg">{error}</p>}  
    </Form>
  );
}

export default Signup;  // Signup 컴포넌트를 내보냄