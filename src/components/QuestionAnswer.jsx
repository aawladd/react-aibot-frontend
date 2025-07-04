import Answers from "./Answers";

const QuestionAnswer = ({item, index}) => {
  return (
    <>
      <div
        key={index + Math.random()}
        className={item.type == "q" ? "flex justify-end" : ""}
      >
        {item.type == "q" ? (
          <li
            key={index + Math.random()}
            className="text-center p-1 mr-2 border-8 dark:bg-zinc-700 bg-gray-200 dark:border-zinc-700 border-gray-200 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit"
          >
            <Answers
              ans={item.text}
              totalResult={1}
              index={index}
              type={item.type}
            />
          </li>
        ) : (
          item.text.map((ansItem, ansIndex) => (
            <li key={ansIndex + Math.random()} className="text-left p-1">
              <Answers
                ans={ansItem}
                totalResult={item.length}
                index={ansIndex}
                type={item.type}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionAnswer;
