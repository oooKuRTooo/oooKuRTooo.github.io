import React from 'react';
import { Layout, Menu,  Icon } from 'antd';
import './admin.scss';
import PostList from './AdminPosts/PostsList';
import AdminSettings from './AdminSettings/AdminSettings';
import { Link } from 'react-router-dom';

const { Content, Sider } = Layout;

export default function(props) {

    const { posts, goToPage } = props;

    const getPage = () => {
        switch(props.page) {
            case 'posts' :
                return <PostList posts={posts}/>;
            case 'settings' :
                return <AdminSettings/>;
            default:
                return <div>Failed</div>
        }
    };
    
    return (
        <Layout className='admin'>
            <Sider collapsible>
                <Menu theme="dark" defaultSelectedKeys={[props.page]} mode="inline">
                    <Menu.Item key="posts" onClick={()=>goToPage('/admin/posts')}>
                        <Icon type="snippets" />
                        <span>Posts</span>
                    </Menu.Item>
                    <Menu.Item key="files">
                        <Icon type="file" />
                        <span>files</span>
                    </Menu.Item>
                    <Menu.Item key="stats">
                        <Icon type="pie-chart" />
                        <span>Statistics</span>
                    </Menu.Item>
                    <Menu.Item key="settings" onClick={()=>goToPage('/admin/settings')}>
                        <Icon type="setting" />
                        <span>Settings</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content className='admin-content' >
                    { getPage() }
                </Content>
            </Layout>
        </Layout>
    );
}