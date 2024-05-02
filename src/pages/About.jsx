
import Logo from '../images/logo.png'

import { FaLinkedin, FaGithubSquare } from 'react-icons/fa'

import './css/About.css'

const About = () => {
    return (
        <section className='about'>
            <h1 className='title'>About</h1>
            <div className='about-cards'>
                <div className='each-card'>
                    <img src={Logo} alt='' />
                    <p className='name'>Sudhanva</p>
                    <div className='links'>
                        <a target='_blank' rel="noreferrer" href="https://github.com" ><FaGithubSquare /></a>
                        <a target='_blank' rel="noreferrer" href="https://linkedin.com/in/" ><FaLinkedin /></a>
                    </div>
                </div>
                <div className='each-card'>
                    <img src={Logo} alt='' />
                    <p className='name'>Sujan</p>
                    <div className='links'>
                        <a target='_blank' rel="noreferrer" href="https://github.com" ><FaGithubSquare /></a>
                        <a target='_blank' rel="noreferrer" href="https://linkedin.com/in/" ><FaLinkedin /></a>
                    </div>
                </div>
                <div className='each-card'>
                    <img src={Logo} alt='' />
                    <p className='name'>Thanay</p>
                    <div className='links'>
                        <a target='_blank' rel="noreferrer" href="https://github.com" ><FaGithubSquare /></a>
                        <a target='_blank' rel="noreferrer" href="https://linkedin.com/in/" ><FaLinkedin /></a>
                    </div>
                </div>
                <div className='each-card'>
                    <img src={Logo} alt='' />
                    <p className='name'>Ujwal</p>
                    <div className='links'>
                        <a target='_blank' rel="noreferrer" href="https://github.com" ><FaGithubSquare /></a>
                        <a target='_blank' rel="noreferrer" href="https://linkedin.com/in/" ><FaLinkedin /></a>
                    </div>
                </div>
            </div>
            <div className='about-cards'>
                <div className='each-card'>
                    <p className='name'>Guide</p>
                    <img src={Logo} alt='' />
                    <p className='name'>Asha Rani K P</p>
                    <div className='links'>
                        <a target='_blank' rel="noreferrer" href="https://github.com" ><FaGithubSquare /></a>
                        <a target='_blank' rel="noreferrer" href="https://linkedin.com/in/" ><FaLinkedin /></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About

