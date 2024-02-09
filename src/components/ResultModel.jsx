import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModel = forwardRef(function ResultModel(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const formattedRemaingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModel();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-model">
      {userLost && <h2>you lost</h2>}
      {!userLost && <h2>Your score: {score} </h2>}
      <p>
        The targrt time was <strong>{targetTime}seconds.</strong>
      </p>
      <p>
        You stopped timer with {''} <strong>{formattedRemaingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModel;
