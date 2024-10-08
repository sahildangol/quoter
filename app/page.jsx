import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center purple_gradient">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptify is an all in one Site where we use AI to generate Prompts used
        by AI then to perform the detailed task
      </p>
      <Feed/>
    </section>
  
  );
};

export default Home;
