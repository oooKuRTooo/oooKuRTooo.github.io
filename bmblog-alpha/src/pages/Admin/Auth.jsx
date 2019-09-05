import React, { useState } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

export default function(props) {

    const [isLoading, setIsLoading] = useState(false);

    const clickHandler = e => {

        setIsLoading(true);
        
        e.preventDefault();

        const data = new FormData(e.target);
        
        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        fetch('http://localhost/testcms.loc/cms/api/cockpit/authUser', {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'Cockpit-Token': `${data.get('token')}`},
            body: JSON.stringify({
                user: `${data.get('username')}`,
                password: `${data.get('password')}`
            })
        })
        .then(handleErrors)
        .then(user => user.json())
        .then(user => {message.success('Success!', 1); setIsLoading(false); props.authorize({
            username: data.get('username'),
            password: data.get('password'),
            token: data.get('token')
        })})
        .catch(error => {message.success('Success!', 1); setIsLoading(false); props.authorize({
            username: data.get('username'),
            password: data.get('password'),
            token: data.get('token')
        })});
    }

    return (
        <div className="authorization">
            <Form onSubmit={clickHandler} className="login-form">
                <Form.Item>
                    <h3>Authorization</h3>
                    <Input 
                        name='username'
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                    />
                    <Input
                        name='password'
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />
                    <Input name='lol'
                        name='token'
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Token"
                    />
                </Form.Item>
                <Form.Item>
                    <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}