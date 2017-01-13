import Mustache from 'mustache';

import './styles.scss';

import initDesktop from './components/app';

import mobileTemplate from './components/mobile-slide.html';
import './media/0.png';
import './media/1.png';
import './media/2.png';
import './media/3.png';
import './media/4.png';
import './media/9.png';
import './media/5.png';
import './media/7.png';
import './media/6.png';
import './media/8.png';
import './media/10.png';
import './media/11.gif';
import './media/13.png';
import './media/14.png';
import './media/15.png';
import './media/18.gif';

import './media/prompt-arrow.png';
import './media/wisconsin.png';
import './media/michigan.png';

const viewWidth = window.innerWidth;
let viewHeight = window.innerHeight;

// /////////////
// Mobile slides
// /////////////
const initMobile = () => {
    // mobile slide data array
    const slideData = [];

    // use desktop html to get mobile slide text and graphics
    const slideNodes = document.querySelectorAll('.mobile-slide-data');
    for (let i = 0; i < slideNodes.length; i += 1) {
        const html = slideNodes[i].innerHTML;
        const graphic = slideNodes[i].getAttribute('data-mobile-graphic');
        slideData.push({ i, graphic, html, viewHeight });
    }

    // generate mobile slides and insert in mobile container
    const mobileContainer = document.querySelector('.mobile-container');
    const mobileHTML = Mustache.render(mobileTemplate, { slideData, viewHeight });
    mobileContainer.innerHTML += mobileHTML;

    // manage mobile slide state
    let currentMobileSlide = 0;
    const mobileSlides = document.querySelectorAll('.mobile-slide');
    const maxMobileSlide = mobileSlides.length - 1;

    // set mobile progress bar
    const mobileProgressRow = document.querySelector('.mobile-progress tr');
    for (let i = 0; i < maxMobileSlide; i += 1) {
        mobileProgressRow.innerHTML += '<td></td>';
    }
    const mobileProgress = document.querySelectorAll('.mobile-progress td');

    // mobile slide navigation and progress bar updating
    const nextSlide = () => {
        if (currentMobileSlide < maxMobileSlide) {
            mobileProgress[currentMobileSlide].className = 'progress-filled';
            currentMobileSlide += 1;
            mobileSlides[currentMobileSlide].className = 'mobile-slide mobile-slide-show';
        }
    };
    const previousSlide = () => {
        if (currentMobileSlide > 0) {
            mobileSlides[currentMobileSlide].className = 'mobile-slide';
            currentMobileSlide -= 1;
            mobileProgress[currentMobileSlide].className = '';
        }
    };

    // mobile gestures
    let yDown = null;
    const handleTouchStart = (evt) => {
        yDown = evt.touches[0].clientY;
    };
    const handleTouchMove = (evt) => {
        if (!yDown) {
            return;
        }
        const yUp = evt.touches[0].clientY;
        const yDiff = yDown - yUp;
        if (yDiff > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
        yDown = null;
    };
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    // mobile resizing
    const handleMobileResize = () => {
        viewHeight = window.innerHeight;
        for (let i = 0; i < mobileSlides; i += 1) {
            mobileSlides[i].style.height = `${viewHeight}px`;
            mobileSlides[i].style.top = `${viewHeight}px`;
        }
    };
    window.addEventListener('resize', handleMobileResize, true);
};

// determine desktop or mobile and fire off related function
if (viewWidth <= 1000) {
    document.body.className = 'mjs-mobile-interactive';
    initMobile();
} else {
    document.body.className = 'mjs-desktop-interactive';
    initDesktop();
}
