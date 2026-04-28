import React from 'react';
import { Tag } from 'antd';

export const TagIdSensor = ({children}) => {
    return (
        <Tag key={children} color={'volcano'} variant={'solid'}>
            #{children}
        </Tag>
    )
};
export default TagIdSensor;