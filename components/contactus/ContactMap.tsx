import React from "react";

/**
 * ContactMap
 * Responsive iframe wrapper for embedding a Google Maps location.
 *
 * HOW TO USE:
 * 1. Go to Google Maps, search your location, click "Share" -> "Embed a map".
 * 2. Copy the `src` URL from the generated <iframe> code.
 * 3. Paste it into `MAP_EMBED_SRC` below.
 */

const MAP_EMBED_SRC ="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3936.3746129466126!2d77.90764997502328!3d9.388481090687863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMjMnMTguNSJOIDc3wrA1NCczNi44IkU!5e0!3m2!1sen!2sin!4v1783230369768!5m2!1sen!2sin"


const ContactMap: React.FC = () => {
  return (
    <section className="w-full bg-white ">
      <div className="w-full overflow-hidden shadow-md">
        <div className="relative h-72 w-full sm:h-96 md:h-[450px]">
          <iframe
            src={MAP_EMBED_SRC}
            title="Our Location on Google Maps"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
