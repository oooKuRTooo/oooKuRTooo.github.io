import React, { useState } from 'react';
import arrow from '../../media/arrow.svg';

const formatNumber = number => {
    return number > 9 ? String(number) : '0' + String(number);
}

export default function(props) {

    const [offset, setOffset] = useState(0);

    const { posts, changePost } = props.data;

    const list = posts.map((post, index)=>(<li onClick={()=>{changePost(index)}} key={post._id}><span>{formatNumber(index + 1)}</span></li>));

    const wheelMove = direction => {
        const li = document.querySelector('.home .navigation li');
        console.log(li);
        if (!li) return;
        const step = li.offsetHeight;
        if (direction === 'up' && offset < 0) setOffset(offset + step);
        if (direction === 'down' && Math.abs(offset) < (posts.length - 6) * step) setOffset(offset - step);
    }

    const wheelHandler = e => {
        if (e.deltaY > 0) wheelMove('down');
        if (e.deltaY < 0) wheelMove('up');
    }
    
    const arrowUpHandler = () => {
        wheelMove('up');
    }

    const arrowDownHandler = () => {
        wheelMove('down');
    }

    const styleUl = {
        transform: `translateY(${offset}px)`
    }

    return (
        <div className='navigation-wrapper' onWheel={wheelHandler}>

            <div className="navigation">
                <ul style={styleUl}>
                    {list}
                </ul>
            </div>
            <img onClick={arrowUpHandler} className='arrow up' src={arrow} alt=""/>
            <img onClick={arrowDownHandler} className='arrow down' src={arrow} alt=""/>
        </div>
    );
}