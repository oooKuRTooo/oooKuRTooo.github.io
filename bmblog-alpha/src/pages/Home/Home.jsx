import React, { useState } from 'react';
import Center from './Center';
import Header from './Header';
import Navigation from './Navigation';
import './home.scss';
import Particles from 'react-particles-js';
import { Swipeable } from 'react-touch';

export default function(props) {

    const [activePost, setActivePost] = useState(0);
    const [animChangePost, setAnimChangePost] = useState('enter');
    const [parallax, setParallax] = useState({ slow: { x: 0, y: 0 }, mid: { x: 0, y: 0 }, fast: { x: 0, y: 0 }});

    const styleHome = { backgroundImage: `url(${props.data[activePost].preview.fullPath})`, backgroundPosition: `calc(50% - ${parallax.fast.x}px) calc(50% - ${parallax.fast.y}px)` };

    const changePost = index => {
        if (index >= props.data.length || index < 0) return;
        console.log('change');
        setAnimChangePost('leave');
        setTimeout(()=>{
            setActivePost(index);
            setAnimChangePost('enter');
        }, 1000);
    }

    const parallaxHandler = e => {
        if (window.matchMedia("(min-width: 1200px)").matches) {

            const deltaX = (window.innerWidth / 2 - e.clientX);
            const deltaY = (window.innerHeight / 2 - e.clientY);
    
            setParallax({
    
                fast: {
                    x: deltaX * 0.01,
                    y: deltaY * 0.008
                },
        
                mid: {
                    x: deltaX * 0.005,
                    y: deltaY * 0.005
                },
        
                slow: {
                    x: deltaX * 0.002,
                    y: deltaY * 0.003
                }
            });
        }
    }

    const onSwipeRight = () => {
        changePost(activePost - 1);
    }

    const onSwipeLeft = () => {
        changePost(activePost + 1);
    }

    const navData = {
        activePost: activePost,
        posts: props.data,
        changePost: changePost
    }

    const centralData = {
        activePost: props.data[activePost],
        postsCount: props.data.length,
        currentNumber: activePost + 1,
        anim: animChangePost,
        parallax: parallax
    };

    const headerData = props.settings;

    return (
        <Swipeable onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} onSwipeUp={onSwipeLeft} onSwipeDown={onSwipeRight}>
            <div className="home" style={{...styleHome, ...props.style}} onMouseMove={parallaxHandler}>
                <Header data={headerData}/>
                <Center data={centralData}/>
                <Navigation data={navData}/>
                <div className="particles-wrapper">
                    <Particles
                        className='particles'
                        canvasClassName='particles-canvas'
                        width='100vw'
                        height='100vh'
                        params={{
                            particles: {
                                number: {
                                    value: 100
                                },
                                move: {
                                    speed: 2
                                },
                                size: {
                                    value: 1
                                },
                                color: {
                                    value: "#fff"
                                },
                                line_linked: {
                                    enable: false
                                }
                            },
                            interactivity: {
                                events: {
                                    onhover: {
                                        enable: true,
                                        mode: 'bubble'
                                    }   
                                },
                                modes: {
                                    bubble: {
                                        size: 2
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </Swipeable>
    );
}