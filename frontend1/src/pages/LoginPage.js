import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = () => {
    return (
        <AuthTemplate>
            {/* AuthForm.js 의 type값에 따라 다르게 출력됨 */}
            <AuthForm type="login" />
        </AuthTemplate>
    );
};

export default LoginPage;