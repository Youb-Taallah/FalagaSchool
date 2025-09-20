// Courses
import afterEffect from '../assets/Courses/after-effect.jpg';
import coding from '../assets/Courses/coding.jpg';
import marketing from '../assets/Courses/digital-marketing.png';
import english from '../assets/Courses/english.jpg';
import excel from '../assets/Courses/excel.webp';
import java from '../assets/Courses/java.webp';
import mathCourse from '../assets/Courses/math.png';
import physics from '../assets/Courses/phy.png';
import python from '../assets/Courses/python.png';
import python2 from '../assets/Courses/python2.webp';
import webDev from '../assets/Courses/web-dev.jpg';
// courses icons
import physique from '../assets/Courses/icons/physique.png';
import info from '../assets/Courses/icons/info.png';
import mecanique from '../assets/Courses/icons/mecanique.png';
import math from '../assets/Courses/icons/math.png';

// public
import book from '../assets/public/e-book.png';
import bulleMessage from '../assets/public/bulle_message.png';
import fgLogo from '../assets/public/fg_logo.png';
import halim from '../assets/public/halim.png';
import login from '../assets/public/login.jpg';
import onlineCourse from '../assets/public/online-course.png';
import topBg from '../assets/public/top-bg.png';


import pic3 from '../assets/HomePage/3.png';
import pic4 from '../assets/HomePage/4.png';
import taki from '../assets/HomePage/taki.webp';

const images: {
    courses: Record<string, string>,
    icons: Record<string, string>,
    public: Record<string, string>,
    homePage: Record<string, string>
  } = {
    courses: {
      afterEffect,
      coding,
      marketing,
      english,
      excel,
      java,
      mathCourse,
      physics,
      python,
      python2,
      webDev,
    },
    icons :{
      info,
      physique,
      math,
      mecanique,
    },
    public: {
      book,
      bulleMessage,
      fgLogo,
      halim,
      login,
      onlineCourse,
      topBg,
    },
    homePage :{
      pic3,
      pic4,
      taki,
    }
};

export default images;
