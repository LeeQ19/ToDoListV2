import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IForm, categoriesState, categoryState, toDosState } from "../atoms";

function CreateToDo() {
  const setToDos = useSetRecoilState(toDosState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ newCat, toDo }: IForm) => {
    if (newCat !== undefined) {
      const len = categories.length;
      setCategories((v) => [...v, newCat]);
      setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: len }, ...oldToDos]);
      setCategory(len);
    } else {
      setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category }, ...oldToDos]);
    }
    setValue("toDo", "");
  };

  return (
    <form
      onSubmit={handleSubmit(handleValid)}
      style={{
        display: "flex",
        gap: "5px",
      }}>
      {category === -1 &&
        <input
          {...register("newCat", { required: "Please write New Category" })}
          placeholder="New Category"
          style={{ fontSize: "1.5rem", }}
        />
      }
      <input
        {...register("toDo", { required: "Please write To Do" })}
        placeholder="What To Do?"
        style={{ fontSize: "1.5rem", }}
      />
      <button style={{ fontSize: "1.5rem", }}>
        Add
      </button>
    </form>
  );
}

export default CreateToDo;