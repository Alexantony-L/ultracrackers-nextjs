import React from "react";


const ContactFooter: React.FC = () => {
  return (
    <footer className="w-full bg-teal-500 py-4 text-center text-white">
      <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-2">
        <p>© {new Date().getFullYear()} Ultra Crackers. All Rights Reserved.</p>
        <p className="text-white">Made with care in Sivakasi 🎇</p>
      </div>
    </footer>
  );
};

export default ContactFooter;
