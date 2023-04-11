import { locationIcon } from "@/assets/icons";
import { HTMLElementProps } from "@/utils/types";
import { FC } from "react";

const Footer: FC<HTMLElementProps> = ({ className, ...props }) => {
  return (
    <footer {...props} className={`${className} p-5  `}>
      <div>
        <p className="capitalize">&copy; AuthorJunction. All Rights Reserved</p>
        <p className="capitalize">ML institute of Diploma studies</p>
        <p className="flex items-center capitalize">
          <span className="aspect-square h-6">{locationIcon}</span> mehsana, gujarat
        </p>
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
