import Paragraph from "@/UI/Paragraph"
import SecTitle from "@/UI/SecTitle"
import Title from "@/UI/Title"

const TechnologiesSection = () => {
  return (
    <section className="bg-gradient-to-tr from-cyan-600 to-violet-500 text-gray-100">
      <div className="w-full rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#f3f4f6"
            fillOpacity="1"
            d="M0,160L24,170.7C48,181,96,203,144,208C192,213,240,203,288,186.7C336,171,384,149,432,165.3C480,181,528,235,576,224C624,213,672,139,720,117.3C768,96,816,128,864,138.7C912,149,960,139,1008,112C1056,85,1104,43,1152,37.3C1200,32,1248,64,1296,74.7C1344,85,1392,75,1416,69.3L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="mx-auto w-10/12 space-y-24 py-5">
        <div className="space-y-6">
          <Title>technologies use to create authorjunction</Title>
          <Paragraph>
            At Authorjunction, we use a range of modern web technologies to create a
            seamless and engaging experience for our users. Our platform is built on
            Next.js, a popular server-side rendering framework for React. Next.js provides
            a powerful suite of tools for building high-performance web applications that
            are optimized for speed and scalability. By leveraging Next.js, we're able to
            deliver fast, responsive pages that load quickly and provide a seamless user
            experience, even under heavy traffic loads.
          </Paragraph>
          <Paragraph>
            We also use Tailwind CSS, a highly customizable CSS framework that enables us
            to quickly and efficiently style our pages using pre-built utility classes.
            With Tailwind CSS, we're able to create a consistent and cohesive design
            language throughout our platform, making it easy for users to navigate and
            engage with our content. Additionally, we utilize TypeScript, a strongly-typed
            superset of JavaScript that allows us to write safer, more robust code by
            catching errors at compile-time rather than runtime. By adopting TypeScript,
            we're able to ensure that our code is more reliable and easier to maintain,
            reducing the likelihood of bugs and issues that could negatively impact the
            user experience. Finally, we integrate various small npm libraries to enhance
            the functionality and performance of our platform. Together, these
            technologies enable us to create a fast, responsive, and highly-functional web
            platform that meets the needs of both writers and readers.
          </Paragraph>
        </div>
        <div className="space-y-8">
          <Title>technologies</Title>
          <div className="space-y-4">
            <SecTitle>Next.js - MetaFramework</SecTitle>
            <Paragraph>
              Next.js is a popular open-source framework for building React applications.
              It provides a set of features that makes it easier to build complex and
              high-performance web applications. Next.js allows you to create
              server-rendered applications, which means that your web pages are rendered
              on the server-side before being sent to the client-side, making your website
              faster and more SEO-friendly. Additionally, Next.js provides a simple API
              for building static websites, enabling you to generate static files that can
              be deployed to a content delivery network (CDN) for even faster loading
              times.
            </Paragraph>
            <Paragraph>
              One of the most notable features of Next.js is its automatic code splitting
              and optimized client-side routing, which enables fast and smooth page
              transitions without requiring additional configuration. It also supports
              CSS-in-JS solutions like styled-components, and comes with out-of-the-box
              support for TypeScript, making it easier to write scalable and maintainable
              code. Additionally, Next.js offers an extensible plugin system, allowing
              developers to add functionality to their applications without the need for
              additional configuration. Overall, Next.js is a powerful framework that
              offers a range of features to help developers build scalable,
              high-performance web applications.
            </Paragraph>
          </div>
          <div className="space-y-4">
            <SecTitle>React.js - UI Framework</SecTitle>
            <Paragraph>
              ReactJS is a popular open-source JavaScript library for building user
              interfaces. It was developed by Facebook and has gained a significant
              following in the web development community due to its simplicity and
              flexibility. ReactJS is used for building dynamic and interactive
              applications that can run in a web browser, mobile device, or server.
            </Paragraph>
            <Paragraph>
              The main concept behind ReactJS is the component-based architecture, where
              the application is broken down into smaller reusable components. This allows
              developers to build complex user interfaces with ease, and these components
              can be shared across multiple projects. ReactJS uses a virtual DOM (Document
              Object Model) to optimize the rendering of components, making the
              application faster and more efficient.
            </Paragraph>
            <Paragraph>
              ReactJS and Next.js are closely related, as Next.js is built on top of
              ReactJS. Next.js provides additional features and functionalities to
              ReactJS, such as server-side rendering and static site generation. This
              allows developers to build high-performance web applications with ease,
              without worrying about the complexity of managing servers and optimizing
              performance.
            </Paragraph>
          </div>
          <div className="space-y-4">
            <SecTitle>TailwindCss - Styling frontend</SecTitle>
            <Paragraph>
              Tailwind CSS is a popular utility-first CSS framework that makes it easy to
              style web applications. It provides a set of pre-designed utility classes
              that you can use to style your HTML elements without writing custom CSS.
              This makes it easier to create consistent and responsive designs across your
              web application, without worrying about the details of CSS styling.
            </Paragraph>
            <Paragraph>
              Tailwind CSS is designed to be highly customizable, allowing you to
              configure your own design system and tailor it to your specific needs. It
              also offers features like PurgeCSS, which removes unused CSS styles from
              your final production build, resulting in smaller file sizes and faster
              loading times.
            </Paragraph>
            <Paragraph>
              Tailwind CSS is a great choice for building web applications with React and
              Next.js. Its utility-first approach fits well with the component-based
              architecture of React, allowing developers to easily apply styles to
              specific elements in their components. Additionally, Tailwind CSS integrates
              well with Next.js, enabling developers to easily configure their design
              system and optimize their production builds with features like PurgeCSS. By
              using Tailwind CSS with React and Next.js, developers can create modern,
              responsive, and highly customizable web applications with ease.
            </Paragraph>
          </div>
          <div className="space-y-4">
            <SecTitle>Typescript/Javascript - main programming Language</SecTitle>
            <Paragraph>
              JavaScript is a popular scripting language used for building dynamic and
              interactive web applications. It is a dynamically typed language, which
              means that the type of a variable is inferred at runtime. While JavaScript
              is a powerful language, it can be challenging to maintain large codebases
              due to its lack of static typing.
            </Paragraph>
            <Paragraph>
              TypeScript, on the other hand, is a superset of JavaScript that adds
              optional static typing to the language. With TypeScript, you can catch
              errors at compile time rather than at runtime, making it easier to write
              more reliable and maintainable code. Additionally, TypeScript offers
              features like interfaces, enums, and type annotations that enable developers
              to write more expressive and scalable code.
            </Paragraph>
            <Paragraph>
              Using TypeScript in a project can make it easier to maintain and scale your
              codebase. With TypeScript, you can catch errors early, making your code more
              reliable and reducing the amount of time spent debugging. Additionally,
              TypeScript offers better tooling and editor support, helping to improve
              developer productivity. Overall, TypeScript is a better choice for building
              large-scale applications that require maintainability, reliability, and
              scalability.
            </Paragraph>
          </div>
        </div>
      </div>
      <div className=" rotate w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#f3f4f6"
            fillOpacity="1"
            d="M0,160L24,170.7C48,181,96,203,144,208C192,213,240,203,288,186.7C336,171,384,149,432,165.3C480,181,528,235,576,224C624,213,672,139,720,117.3C768,96,816,128,864,138.7C912,149,960,139,1008,112C1056,85,1104,43,1152,37.3C1200,32,1248,64,1296,74.7C1344,85,1392,75,1416,69.3L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default TechnologiesSection
