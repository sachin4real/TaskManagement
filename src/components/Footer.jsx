// src/components/Footer.jsx

const Footer = () => {
    return (
      <footer className="bg-gray-200 text-center py-6 mt-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-800 text-sm">
            © 2025 TaskMaster. All rights reserved. |{" "}
            <a href="#" className="text-yellow-500 hover:text-yellow-600">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="text-yellow-500 hover:text-yellow-600">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  