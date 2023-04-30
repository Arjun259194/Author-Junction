import Paragraph from "@/UI/Paragraph"
import Title from "@/UI/Title"

const UseCaseSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="mx-auto flex h-full w-10/12 flex-col items-start justify-center space-y-6">
        <Title>Who can use AuthorJunction?</Title>
        <Paragraph className="">
          Authorjunction is a platform for writers and readers alike. Whether you are an aspiring
          writer or a seasoned author, our platform is designed to provide a supportive community
          where writers of all levels and genres can share their work with a wider audience. We
          believe that everyone has a story to tell, and we are passionate about helping emerging
          writers and authors achieve their creative goals.
        </Paragraph>
        <Paragraph>
          For writers, Authorjunction offers a simple and intuitive platform for uploading and
          managing their work. Our platform provides a range of features to help writers connect
          with readers, including author profiles, commenting systems, and messaging tools. Our
          supportive community of writers and readers provides an excellent opportunity for writers
          to receive feedback and connect with others who share their interests and passions.
        </Paragraph>
        <Paragraph>
          For readers, Authorjunction is the perfect place to discover new and exciting stories from
          emerging writers and authors from all around the world. Our platform provides a diverse
          and engaging selection of written works that are sure to capture your imagination. Whether
          you are looking for poetry, short stories, novels, or creative non-fiction, Authorjunction
          has something for everyone. Our advanced search and browsing features make it easy to
          discover new writers and genres, while our commenting system enables readers to provide
          feedback and engage with authors directly. Overall, Authorjunction is a platform that
          welcomes writers and readers from all backgrounds and skill levels, and we are excited to
          support and inspire the next generation of great writers.
        </Paragraph>
      </div>
    </section>
  )
}

export default UseCaseSection
