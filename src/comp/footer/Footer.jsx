import React from 'react';
import './footer.css';
import { LinkedinOutlined , GithubFilled} from '@ant-design/icons';

export const Footer = () => {
    return (
        <>
            <footer>
                <p className='texto'>Creado por Manuel Sabini</p>
                <div className='socialMediaIcons'>
                    <a href="https://www.linkedin.com/in/manuel-sabini/" target="_blank">
                        <LinkedinOutlined id='iconLinkedin'/>
                    </a>
                    <a href="https://github.com/ManuelSabini/sensorito-1490" target="_blank">   
                        <GithubFilled id='iconGithub'/>
                    </a>                    
                </div>
            </footer>
        </>
    )
}

export default Footer