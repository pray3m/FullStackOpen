import BlogList from "./BlogList";
import WithTopSection from "./WithTopSection";

const Home = () => {
  return (
    <WithTopSection>
      <BlogList />
    </WithTopSection>
  );
};

export default Home;
