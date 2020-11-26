import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

// 14번 라인처럼 path에 배열을 넣어주면 한 라우트 컴포넌트에 여러 개의 경로를 설정할 수 있음. 

const App = () => {
  return (
    <>
      <Route component={PostListPage} path={['/@:username', '/']} exact /> 
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
    </>
  );
};

export default App;