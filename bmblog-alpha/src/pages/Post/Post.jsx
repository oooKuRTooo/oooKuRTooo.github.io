import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import './post.scss';
import { blockParser } from '../../blocks/index';
import Observer from '@researchgate/react-intersection-observer';
import ImageFull from '../../components/ImageFull';
import Header from './Header';
import Particles from 'react-particles-js';
import NextPost from './NextPost';
import Socials from './Socials';

export default function(props) {

    console.log(props);

    const [ layers, setLayers ] = useState(props.data.post.layers.map(layer => {
        return { ...layer, items: layer.items.map(item => {
            return {...item, visible: false}
        })}
    }));

    let { title, category, preview } = props.data.post;

    const styleHead = {
        backgroundImage: `url(${preview.fullPath})`
    }

    const setVisible = e => {
        console.log(e.isIntersecting);

        if (e.isIntersecting) e.target.classList.add('visible');

        // if (!e.isVisible) return;
        // let tempLayers = layers.concat();
        // let tempActiveLayer = tempLayers[layerIndex];

        // const tempData = {...tempActiveLayer.items[blockIndex], visible: true};
        // tempActiveLayer.items.splice(blockIndex, 1, tempData);
        
        // setLayers(tempLayers);
    }

    console.log(layers);

    const layer1Style = {
        opacity: layers[0].settings.opacity
    }

    const layer2Style = {
        opacity: layers[1].settings.opacity
    }

    const layer3Style = {
        opacity: layers[2].settings.opacity
    }

    return (
        <div style={props.style} className="post">
            <Parallax  scrolling={true} >
                <Header data={props.settings}/>
                <div className="head" style={styleHead}>
                    <div className="head-wrapper">
                        <div className="tag active"><h3>{category}</h3></div>   
                        <div className="title active"><h1>{title}</h1></div>
                    </div>
                </div>

                <ParallaxLayer style={layer1Style} className='layer-1' speed={layers[0].settings.speed}>
                    {
                        layers[0].items.map(block =>           
                            (<Observer onChange={setVisible}>
                                {blockParser({ name: block.name, id: block.id, data: block.data })}
                            </Observer>))
                    }
                </ParallaxLayer>
                <ParallaxLayer style={layer2Style} className='layer-2' speed={layers[1].settings.speed}>
                    {
                        layers[1].items.map(block => (<Observer onChange={setVisible}>
                        {blockParser({ name: block.name, id: block.id, data: block.data })}
                    </Observer>))
                    }
                </ParallaxLayer>
                <div style={layer3Style} className="layer-base">
                    {
                        layers[2].items.map(block => (<Observer onChange={setVisible}>
                        {blockParser({ name: block.name, id: block.id, data: block.data })}
                    </Observer>))  
                    }
                </div>
                <Particles
                className='particles'
                canvasClassName='particles-canvas'
                width='100vw'
                height='100%'
                params={{
                    particles: {
                        number: {
                            value: 200
                        },
                        move: {
                            speed: 2
                        },
                        size: {
                            value: 1
                        },
                        color: {
                            value: "#000"
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
                }}/>
                <Socials data={props.settings.socials}/>
                <NextPost {...props.data.nextPost}/>
            </Parallax>  
            <ImageFull images={document.querySelectorAll('.layer-base img')}/>

        </div>
    );
}