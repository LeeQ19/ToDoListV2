import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IForm, categoryState, toDosState } from "../atoms";

function CreateToDo() {
  const setToDos = useSetRecoilState(toDosState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category }, ...oldToDos]);
    setValue("toDo", "");
  };

  return (
    <form
      onSubmit={handleSubmit(handleValid)}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gap: "5px",
      }}>
      <input
        {...register("toDo", { required: "Please write To Do" })}
        placeholder="What To Do?"
        style={{ fontSize: "1.5rem", }} />
      <button style={{ fontSize: "1.5rem", }}>Add</button>
    </form>
  );
}

export default CreateToDo;