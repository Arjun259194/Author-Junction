import { locationIcon } from "@/assets/icons";

const Footer = () => {
  return (
    <footer className="bg-gray-700">
      <div>
        <p className="capitalize">&copy; AuthorJunction. All Rights Reserved</p>
        <p className="capitalize">ML institute of Diploma studies</p>
        <p className="flex items-center capitalize">{locationIcon} mehsana, gujarat</p>
        <p>+91 8200271084</p>
        <p>arjun259194@gmail.com</p>
      </div>
    </footer>
  );
};

/* 
© [Year] [Your Company Name]. All Rights Reserved.

[Your Company Address]
[City, State ZIP Code]
[Phone Number]
[Email Address]
*/

export default Footer;
