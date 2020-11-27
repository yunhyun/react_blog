import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    // 하나라도 입력안되면  
    if([username, password, passwordConfirm].includes('')) {
      setError('모두 입력하세요');
      return;
    }
    if(password !== passwordConfirm) {
      setError('비밀번호 불일치');
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(register({ username, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

// 회원가입 성공, 실패 처리 
useEffect(() =>  {
  if(authError) {
    // 계정 중복 
    if(authError.response.status === 409) {
      setError('중복된 계정');
      return;
    }
    setError('회원가입 실패');
    return;
  }
  if(auth) {
    console.log('회원가입 성공');
    console.log(auth);
    dispatch(check());
  }
}, [auth, authError, dispatch]);

// user 값이 잘 설정되었는지 확인 
useEffect(() => {
  if(user) {
    history.push('/'); // 홈으로 이동 
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch(e) {
      console.log('localStorage is not working');
    }
  }
}, [history, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
