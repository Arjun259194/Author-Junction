import Paragraph from "@/UI/Paragraph"
import Title from "@/UI/Title"

const HeroSection = () => (
  <section className="relative flex items-center justify-center bg-gradient-to-r from-cyan-300 to-violet-500 pb-40 pt-24">
    <div className="relative z-20 mb-10 flex w-10/12 flex-col items-start justify-center space-y-8">
      <Title>What is AuthorJunction?</Title>
      <Paragraph>
        Authorjunction is a premier web-based platform designed to support emerging
        writers and authors in showcasing their work to a wider audience. Our platform is
        a safe and supportive space for small authors to upload their written pieces,
        ranging from poetry and short stories to novels and creative non-fiction. At
        Authorjunction, we&apos;re committed to empowering writers and helping them to build
        their audiences and achieve their creative goals.
      </Paragraph>
      <Paragraph>
        With a simple and intuitive interface, Authorjunction provides a user-friendly
        experience for both writers and readers. Our platform&apos;s advanced search and
        browsing features enable readers to easily discover fresh and exciting new
        content, while our robust author profiles allow writers to showcase their work and
        connect with readers from around the world. Whether you&apos;re an emerging writer
        looking to get your work out there or a reader seeking out new and engaging
        stories, Authorjunction is the perfect platform for you.
      </Paragraph>
    </div>
    <div className="absolute bottom-0 w-full">
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

export default HeroSection
