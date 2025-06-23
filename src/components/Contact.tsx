import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";
import SpotlightCard from "../blocks/Components/SpotlightCard/SpotlightCard";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const serviceID = import.meta.env.VITE_SERVICE_ID;
   const templateID = import.meta.env.VITE_TEMPLATE_ID;
   const publicKEY = import.meta.env.VITE_PUBLIC_KEY;

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formInputsRef = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const socialTitleRef = useRef<HTMLHeadingElement>(null);
  const socialLinksRef = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "top 105px",
          scrub: 1,
        }
      });
      if (titleRef.current) {
        tl.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
        });
      }
      if (spotlightCardRef.current) {
        tl.from(spotlightCardRef.current, {
          x: -30,
          opacity: 0,
          duration: 0.6
        }, "-=0.3");
      }
      if (socialTitleRef.current) {
        tl.from(socialTitleRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.5
        }, "-=0.2");
      }
      socialLinksRef.current.forEach((link, index) => {
        if (link) {
          tl.from(link, {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.1
          }, "-=0.1");
        }
      });
      formInputsRef.current.forEach((input, index) => {
        if (input) {
          tl.from(input, {
            x: 30,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1
          }, "-=0.2");
        }
      });
      if (submitButtonRef.current) {
        tl.from(submitButtonRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.5
        }, "-=0.1");
      }
      ScrollTrigger.refresh();
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace these with your actual EmailJS credentials
      const serviceId =  serviceID ;
      const templateId = templateID ;
      const publicKey = publicKEY ;

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      alert("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div ref={containerRef} className="h-full relative flex flex-col py-8 overflow-y-hidden overflow-x-hidden px-2 sm:px-4 md:px-8">
      <div>
        <div className="text-center">
          <div ref={titleRef} className="w-full py-4 ">
            <ShinyText text="Contact" disabled={false} speed={3} className='custom-class' />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row-reverse w-full gap-4 md:gap-8 justify-center items-center md:items-start">
        <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-md md:w-[30rem] py-4 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div>
              <label htmlFor="firstName"></label>
              <input
                ref={(el) => { formInputsRef.current[0] = el; }}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full px-4 py-2 bg-[#222222] dark:bg-[#222222] text-[#aaaaaa] dark:text-[#aaaaaa] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00bb77] focus:border-transparent text-base md:text-lg"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[#c0c0c0] dark:text-[#c0c0c0]"></label>
              <input
                ref={(el) => { formInputsRef.current[1] = el; }}
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full px-4 py-2 bg-[#222222] dark:bg-[#222222] text-[#aaaaaa] dark:text-[#aaaaaa] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00bb77] focus:border-transparent text-base md:text-lg"
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-[#c0c0c0] dark:text-[#c0c0c0] mb-1"></label>
            <input
              ref={(el) => { formInputsRef.current[2] = el; }}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 bg-[#222222] dark:bg-[#222222] text-[#aaaaaa] dark:text-[#aaaaaa] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00bb77] focus:border-transparent text-base md:text-lg"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="subject" className="block text-[#c0c0c0] dark:text-[#c0c0c0] mb-1"></label>
            <input
              ref={(el) => { formInputsRef.current[3] = el; }}
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full px-4 py-2 bg-[#222222] dark:bg-[#222222] text-[#aaaaaa] dark:text-[#aaaaaa] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00bb77] focus:border-transparent text-base md:text-lg"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-[#c0c0c0] dark:text-[#c0c0c0] mb-1"></label>
            <textarea
              ref={(el) => { formInputsRef.current[4] = el; }}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={3}
              className="w-full px-4 py-2 bg-[#222222] dark:bg-[#222222] text-[#aaaaaa] dark:text-[#aaaaaa] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00bb77] focus:border-transparent resize-none text-base md:text-lg"
            ></textarea>
          </div>
          <div className="flex flex-row">
            <button
              ref={submitButtonRef}
              type="submit"
              className="w-full text-lg md:text-xl bg-[#222222] dark:bg-[#222222] hover:bg-[#282828] dark:hover:bg-[#282828] rounded-xl py-3 px-6 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
        <div className="hidden md:block w-0.5 h-80 mt-7 bg-[#222222] dark:bg-[#222222]"></div>
        <div ref={spotlightCardRef} className="w-full max-w-md md:w-auto">
          <div ref={descriptionRef} className="mb-8 m-5"></div>
          <h1 ref={socialTitleRef} className="text-2xl md:text-3xl font-medium mb-5 text-center md:text-left">Connect To Me On</h1>
          <SpotlightCard className="custom-spotlight-card p-4 md:p-8" spotlightColor="rgba(255, 255, 255, 0.2)">
            <h1 className="w-full md:w-[25rem] mb-4 text-[#aaaaaa] text-base md:text-lg text-center md:text-left">
              I'm open to internships and entry-level job opportunities in web development and software engineering.
            </h1>
            <h1 className="mb-8 md:mb-12 text-[#aaaaaa] text-base md:text-lg text-center md:text-left">Feel free to reach out — I'd be happy to connect!</h1>
            <div className="flex flex-row justify-center gap-2 md:gap-4">
              <div ref={(el) => { socialLinksRef.current[0] = el; }} className="flex flex-row p-1 w-full justify-center hover:scale-105 transition-all duration-300 items-center">
                <a href="https://www.linkedin.com/in/aditya-raj-a030a0265/?utm_source=share&utm_campaign=share_via&utm_content=profile" target="_blank" rel="noopener noreferrer" className="h-12 w-12 bg-[#222222] rounded-2xl flex items-center justify-center">
                  <svg
                    fill="#6c757d"
                    height="800px"
                    width="800px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="-143 145 512 512"
                    xmlSpace="preserve"
                    className="h-8 w-8 rounded-2xl"
                  >
                    <path
                      d="M-143,145v512h512V145H-143z M41.4,508.1H-8.5V348.4h49.9V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7
	c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6
	c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1
	c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z"
                    />
                  </svg>
                </a>
              </div>
              <div ref={(el) => { socialLinksRef.current[1] = el; }} className="flex flex-row p-1 w-full justify-center hover:scale-105 transition-all duration-300 items-center ">
                <a href="https://github.com/AdityaRaj-DE" target="_blank" rel="noopener noreferrer" className="h-12 w-12 bg-[#222222] rounded-2xl flex items-center justify-center">
                  <svg
                    fill="#6c757d"
                    height="800px"
                    width="800px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="-143 145 512 512"
                    xmlSpace="preserve"
                    className="h-8 w-8 rounded-2xl"
                  >
                    <g>
                      <path
                        d="M-143,145v512h512V145H-143z M244.2,423.4c-1.4,11.4-3.8,23.1-7.9,33.8c-12,30.7-36,47.6-67.8,52.7
		c-18.2,2.9-36.9,3-57.1,4.5c-18.1-1.6-38-1.8-57.3-5.2c-37.4-6.6-62.8-32.8-70.2-70.3c-3.8-19.1-4.9-38.3,1-57.3
		c3.1-9.8,8.2-18.5,14.8-26.4c0.9-1,1.7-2.5,1.6-3.8c-1.1-17.2,0.9-34.2,6-50.6c4.2-13.7,1.1-12.9,16.3-8.9
		c18.3,4.8,34.3,14.7,50,25c1.8,1.2,4.6,1.7,6.8,1.3c22.2-3.4,44.3-3.6,66.5,0.3c1.6,0.3,3.7-0.3,5.2-1.2
		c13.5-8.8,27.4-16.7,42.6-22.2c5.5-2,11.3-3.3,16.9-5c2.5-0.7,3.6,0.2,4.5,2.6c6.8,19,9.6,38.5,8.6,58.6c-0.1,1.1,0.5,2.6,1.2,3.5
		C243,374.6,247.3,398.2,244.2,423.4z"
                      />
                      <path
                        d="M177.1,398.4c-8.6-1.5-17.6-1.3-26.4-0.8c-20,1.1-40,3-60,1.2c-9.5-0.9-19.1-1.8-28.7-1.6c-17.4,0.3-32,6-40.6,22.6
		c-4.3,8.2-5.3,17-5,26.1c0.7,25.6,11.8,40.2,36.2,47.5c19.6,5.8,39.7,6.6,59.9,6.2c7.5,0,15,0.4,22.5-0.1
		c15.5-0.9,30.7-3.2,45.4-8.6c15.2-5.6,24.3-16.3,27.6-31.8c1.3-6,1.9-12.3,1.8-18.4C209.6,420,195.6,401.5,177.1,398.4z
		 M78.7,466.1c-6.5,7.1-15.9,7.2-22.6,0.3c-4.9-5-7.7-12.7-7.7-22.3c0.2-6.5,2.1-13.6,7.7-19.3c6.7-6.9,16.1-6.8,22.6,0.2
		C88.5,435.6,88.5,455.5,78.7,466.1z M169.6,466.6c-6.1,6.3-14.9,6.5-21.4,0.7c-11.2-10.2-11.2-32.9,0-43.2
		c6.4-5.9,15.2-5.7,21.4,0.6c5.7,5.8,7.6,13.1,7.9,20.9C177.2,453.5,175.2,460.7,169.6,466.6z"
                      />
                    </g>
                  </svg>
                </a>
              </div>
              <div ref={(el) => { socialLinksRef.current[2] = el; }} className="flex flex-row p-1 w-full justify-center hover:scale-105 transition-all duration-300 items-center ">
                <a href="mailto:adityarajk2002@gmail.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 bg-[#222222] rounded-2xl flex items-center justify-center">
                  <svg
                    fill="#6c757d"
                    height="800px"
                    width="800px"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                    xmlSpace="preserve"
                    className="h-8 w-8 rounded-2xl"
                  >
                    <path
                      d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

export default Contact;
