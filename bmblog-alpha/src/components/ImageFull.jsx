import React, { useState } from 'react';
import './preloader.scss';
import { Icon } from 'antd';
import './image-full.scss';
import './CursorProgress/CursorProgress';
import CursorProgress from './CursorProgress/CursorProgress';

export default function(props) {

    const [currentImg, setCurrentImg] = useState(0);
    const [isVisible, setVisible] = useState(false);

    props.images.forEach((element, index) => {
        let fullImgTimer;
        element.style.cursor = "pointer";
        const progress = document.querySelector(".progress-ring");
        element.addEventListener('mousedown', e=>{
            progress.style.display = 'block';
            progress.style.left = e.clientX - 30;
            progress.style.top = e.clientY - 30;
            progress.style.display = true;
            fullImgTimer = setTimeout(() => {
                setCurrentImg(index);
                setVisible(true);
            }, 1000);
        });
        element.addEventListener('mouseup', e=>{
            clearTimeout(fullImgTimer);
            progress.style.display = 'none';
        });
        element.addEventListener('mouseleave', e=>{
            clearTimeout(fullImgTimer);
            progress.style.display = 'none';
        });
        element.addEventListener('mousemove', e=>{
            progress.style.left = e.clientX;
            progress.style.top = e.clientY;
        });
    });

    const onExit = () => {
        setVisible(false);
    }

    const next = () => {
        if (currentImg < props.images.length - 1) {
            setCurrentImg(currentImg + 1);
        }
    }

    const prev = () => {
        if (currentImg > 0) {
            setCurrentImg(currentImg - 1);
        }
    }

    return (
        <>
        
            <div className={`image-full ${isVisible ? 'visible' : 'disable'}`}>
                <img src={props.images[currentImg] && props.images[currentImg].src} alt=""/>
                <Icon onClick={next} className='image-full-next' type="right" fill='#fff'/>
                <Icon onClick={prev} className='image-full-prev' type="left" fill='#fff'/>
                <div className="image-full-indicator">
                    <span>{currentImg + 1}</span> / {props.images.length}
                </div>
                <Icon onClick={onExit} className="image-full-exit" type="close" fill='#fff' />
            </div>
            <CursorProgress/>
        </>
    );
}