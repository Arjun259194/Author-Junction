import Paragraph from "@/UI/Paragraph"
import Title2 from "@/UI/Title2"

const HeroSection = () => (
  <section className="relative flex items-center justify-center bg-gradient-to-r from-cyan-300 to-violet-500 py-28">
    <div className="relative z-20 mb-10 flex w-10/12 flex-col items-start justify-center space-y-8">
      <Title2>What is AuthorJunction?</Title2>
      <Paragraph>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis animi, ducimus
        quos assumenda corporis labore exercitationem quisquam tempora vel autem
        perferendis odio aut voluptate tenetur provident soluta! Exercitationem voluptas
        quo, sed corrupti cum, aliquam error nihil praesentium adipisci, culpa incidunt!
      </Paragraph>
    </div>
    <div className="absolute bottom-0 w-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f3f4f6"
          fill-opacity="1"
          d="M0,160L24,170.7C48,181,96,203,144,208C192,213,240,203,288,186.7C336,171,384,149,432,165.3C480,181,528,235,576,224C624,213,672,139,720,117.3C768,96,816,128,864,138.7C912,149,960,139,1008,112C1056,85,1104,43,1152,37.3C1200,32,1248,64,1296,74.7C1344,85,1392,75,1416,69.3L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
        ></path>
      </svg>
    </div>
  </section>
)

export default HeroSection
