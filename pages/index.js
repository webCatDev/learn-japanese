import data from "../data";
import Image from "next/image";
import { useState } from "react";

export default function Home({ data }) {
  const [enteredText, setEnteredText] = useState("");
  const [exampleIndex, setExampleIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);

  const handleChange = (e) => {
    const currentText = e.target.value;
    setEnteredText(currentText);
    setIsCorrect(data[exampleIndex].word.startsWith(currentText));
    if (
      currentText.length === data[exampleIndex].word.length &&
      exampleIndex !== data.length - 1
    ) {
      console.log('here')
      setEnteredText("");
      setExampleIndex((prevIndex) => prevIndex + 1);
    }
    if (
      currentText.length === data[exampleIndex].word.length &&
      exampleIndex === data.length - 1
    ) {
      setEnteredText("");
      setExampleIndex(0);
    }
  };

  const borderColor = isCorrect ? "border-blue-500" : "border-red-500";

  return (
    <section className=" min-h-screen  flex justify-center items-center flex-col">
      <Image
        objectFit="cover"
        src={`/images/${data[exampleIndex].image}`}
        alt={data[exampleIndex].meaning}
        height={300}
        width={250}
      />
      <audio src={`/sounds/${data[exampleIndex].sound}`} controls />
      <h2 className="font-bold">{data[exampleIndex].word}</h2>
      <p>{data[exampleIndex].meaning}</p>
      <form>
        <input
          onChange={handleChange}
          value={enteredText}
          className={`border-4 ${borderColor} focus:outline-none text-center`}
          type="text"
        />
      </form>
    </section>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      data,
    },
  };
};
