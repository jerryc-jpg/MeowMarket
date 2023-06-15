import React from "react";
import "../../static/styles.css";
import Sitefooter from "./Sitefooter";

const About = () => {
   return (
      <>
         <div className="about-page bg-image d-flex justify-content-center align-items-center">
            <div className="container">
               <div className="row">
                  <div className="col-lg-8 offset-lg-2">
                     <h1 className="display-1 text-center mb-4">About Us</h1>
                     <div className="grid-container fs-5 text-start px-4 custom-about-text">
                        <p>
                           At Meow Market, we are passionate about connecting adorable kittens with loving families. We
                           understand the joy and companionship that kittens bring into our lives, and we strive to make
                           the adoption process a delightful experience for both the kittens and their new owners.
                        </p>
                        <p>
                           With years of experience in cat breeding and care, we ensure that all our kittens receive the
                           utmost love, attention, and socialization from the moment they are born. We work closely with
                           professional veterinarians to maintain the health and well-being of our kittens, ensuring they
                           are ready to join their new forever homes.
                        </p>
                        <p>
                           Our dedicated team is here to guide you through the adoption process, helping you find the
                           perfect kitten that matches your preferences and lifestyle. We provide comprehensive information
                           about each kitten, including their breed, temperament, and unique characteristics, so you can
                           make an informed decision.
                        </p>
                        <p>
                           At our kitten store, we believe in responsible pet ownership. We prioritize the welfare of our
                           kittens and provide ongoing support and advice to our customers. We are committed to ensuring
                           that each kitten finds a loving and nurturing home where they will be cherished as a beloved
                           family member.
                        </p>
                        <p>
                           Thank you for considering our kitten store for your new feline companion. We look forward to
                           helping you find the perfect kitten to bring joy, laughter, and endless cuddles into your life.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Sitefooter/>
      </>
   );
};

export default About;
