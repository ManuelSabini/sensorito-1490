import React from 'react';
import { Alert, Flex, Spin } from 'antd';
const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
export const Cargando = () => (
    <Flex gap="medium">
      <Spin description="Cargando" size="large">
        {content}
      </Spin>
    </Flex>
);
export default Cargando;