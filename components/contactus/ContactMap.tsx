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

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31487.018627975347!2d77.8066977028841!3d9.432157503066504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cb86df4d7425%3A0xa8777c3077322058!2sCelebrity%20Crackers!5e0!3m2!1sen!2sin!4v1661878160597!5m2!1sen!2sin"; // <-- update this path/URL

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
