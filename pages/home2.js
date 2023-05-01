import React, {Fragment} from 'react';
import About2 from '../components/about2/about2';
import BlogSection from '../components/BlogSection/BlogSection';
import CommonHead from '../components/commonHead';
import ContactArea from '../components/ContactArea';
import ExprienceSec from '../components/Exprience/Exprience';
import Footer from '../components/footer/Footer';
import Hero2 from '../components/hero2/hero2';
import Navbar from '../components/Navbar/Navbar';
import Pricing from '../components/Pricing/Pricing';
import ProjectSection from '../components/ProjectSection/ProjectSection';
import Scrollbar from '../components/scrollbar/scrollbar';
import ServiceSection from '../components/ServiceSection/ServiceSection';
import Testimonial from '../components/Testimonial/Testimonial';

export default function HomeTwo() {
  return (
    <div id='scrool'>
      <CommonHead/>
      <Fragment>
            <div className="br-app">
                <Navbar/>
                <Hero2/>
                <About2 about={'/images/about.jpg'}/>
                <ServiceSection sClass={'wpo-service-area-s2'}/>
                <ExprienceSec/>
                <ProjectSection/>
                <Testimonial/>
                <Pricing/>
                <ContactArea/>
                <BlogSection/>
                <Footer/>
                <Scrollbar/>
            </div>
        </Fragment>
    </div>
  )
}
