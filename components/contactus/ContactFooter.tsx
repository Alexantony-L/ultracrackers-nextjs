import React from "react";

const ContactFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#DCE4FF] bg-[#4361EE] py-4 text-center text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-sm sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} Ultra Crackers. All Rights Reserved.</p>
        <p className="font-medium text-white/85">Safe celebrations start here.</p>
      </div>
    </footer>
  );
};

export default ContactFooter;
