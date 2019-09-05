import React from 'react';
import Text from './Text/Text';
import Image from './Image/Image';
import SlickSlider from './SlickSlider/SlickSlider';
import BlockWrapper from './BlockWrapper/BlockWrapper';

const blockList = [ Text, Image, SlickSlider, BlockWrapper ];

export const getBlocks = () => {
    return blockList.map(block => block.getInfo());
}

export function blockParser(options) {
    if (!options) return null;
    const { id, name, data, save, remove, isEditMode } = options;
    let result;
    getBlocks().forEach((block, index) => { 
        if (block.name === name) result = index;
        return;
    });
    return React.createElement(blockList[result], { data, save, id, remove, isEditMode });
}