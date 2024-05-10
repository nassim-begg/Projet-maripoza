import React from "react";

const Contact = () => {
  return (
    <div className="py-12">
      <section id="bodypageshop" className="aboutheader">
        <p className="text-base lg:text-8xl font-bold tracking-wide text-headingColor mx-auto ">
          Lets
          <span className="text-orange-600 text-3xl lg:text-8xl">Talk</span>
        </p>
        <p className="text-base lg:text-3xl mt-5 tracking-wide text-headingColor ">
          Leave A MESSAGE. We love to hear from you
        </p>
      </section>

      <section id="contactdet" className="flex py-10 px-20">
        <div className="det w-1/2 ">
        <span className="text-base lg:text-3xl font-bold mb-10 lg:mb-50">Get In Touch</span>
          <h1 className="text-1xl leading-relaxed">
            Visit our restaurant or contact us today
          </h1>

          <div>
            <li className="flex py-2 hover:text-orange-500">
              <i className="fab fa-facebook-f mb-5"></i>
              <p className="pl-6">Oued Aissi, Tizi Ouzou</p>
            </li>
            <li className="flex py-2 hover:text-orange-500">
              <i className="fa fa-envelope mb-5"></i>
              <p className="pl-6">beggachenassim6@gmail.com</p>
            </li>
            <li className="flex py-2 hover:text-orange-500">
              <i className="fa fa-phone-alt mb-5"></i>
              <p className="pl-6"> 0797645330</p>
            </li>
            <li className="flex py-2 hover:text-orange-500">
              <i className="fa fa-clock mb-5"></i>
              <p className="pl-6">From Sunday to Friday 24h/24</p>
            </li>
          </div>
        </div>
        <div className="map w-1/2 h-96 ml-72">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d357.658372110893!2d4.104478399760039!3d36.6993716504881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128db748b77c614b%3A0x410cc31bce993b9d!2zUMOidGlzc2VyaWUgU3VjcsOpIFNhbMOpIEcuSyZN!5e0!3m2!1sfr!2sdz!4v1709135705860!5m2!1sfr!2sdz"
            width="600"
            height="450"
            style={{ borderRadius: "50px", paddingRight : "70px"}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
