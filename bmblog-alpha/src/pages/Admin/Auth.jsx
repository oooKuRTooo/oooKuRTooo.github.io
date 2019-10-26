import React, { useState } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { CMS_URL, QUEST_TOKEN } from '../../constants';

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

        fetch(`${CMS_URL}/api/cockpit/authUser?token=${QUEST_TOKEN}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: `${data.get('username')}`,
                password: `${data.get('password')}`
            })
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error("Not 200 response")
            } else {
                return response.json()
            }
        })
        .then(user => {
            message.success('Success!', 1); 
            setIsLoading(false); 
            props.authorize({
                username: user.user,
                password: data.get('password'),
                token: user.api_key,
                isAuth: true
            });
        })
        .catch(error => {
            message.error('Fail!', 1); 
            setIsLoading(false); 
            console.log(error);
        })
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