import React from "react";

const instructions = [
  {
    id: 1,
    title: "Register Your Account",
    description:
      "Create an account using your email address to get started. Verify your email to activate your account.",
  },
  {
    id: 2,
    title: "Log In to Your Account",
    description:
      "Log in using your registered email and password to access the polling features.",
  },
  {
    id: 3,
    title: "Create a Poll",
    description:
      "Click on 'Create Poll' to start. Fill out the poll details, including questions and options.",
  },
  {
    id: 4,
    title: "Share Your Poll",
    description:
      "Once your poll is created, share it via social media or email to gather responses.",
  },
  {
    id: 5,
    title: "View Results",
    description:
      "After participants have voted, visit the 'Results' section to see the outcomes of your poll.",
  },
  {
    id: 6,
    title: "Provide Feedback",
    description:
      "After viewing the results, we encourage you to provide feedback on your polling experience for future improvements.",
  },
];

const Instructions = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-950 mb-8">
          Instructions For Polling
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          Follow these simple steps to create and participate in polls easily.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructions.map((instruction) => (
            <div
              key={instruction.id}
              className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold text-blue-900 mb-2">
                {instruction.title}
              </h3>
              <p className="text-gray-700">{instruction.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructions;
