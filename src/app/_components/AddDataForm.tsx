"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import * as Api from "../../lib/api";

interface Task {
  id: string;
  name: string;
}

const AddDataForm = () => {
  const [task, setTask] = useState<Task[]>();
  const [addOperationCount, setAddOperationCount] = useState("");
  const [updateOperationCount, setUpdateOperationCount] = useState("");
  const [name, setName] = useState<string>();
  const [taskId, setTaskId] = useState<string>();
  const [updateTask, setUpdateTask] = useState(false);

  const getTaskList = async () => {
    const [err, res] = await Api.getTask();
    if (res) {
      setTask(res.data);
    }
  };

  const getCount = async () => {
    const [err, res] = await Api.getCount();
    if (res) {
      setAddOperationCount(res.data.addCount);
      setUpdateOperationCount(res.data.updateCount);
    }
  };

  const onClickAddHandler = async () => {
    if (name) {
      
      const [err, res] = await Api.addTask(name);
      if (res) {
        getTaskList();
        getCount();
      }
      
    } else {
      alert("Name field is empty!!!");
    }
  };

  const onClickUpdateTaskHandler = async () => {
    if (name && taskId) {
      const [err, res] = await Api.updateTask(taskId, name);
      if (res) {
        getTaskList();
        getCount();
        setUpdateTask(false);
      }
    } else {
      alert("Name field is empty!!!");
    }
  };

  useEffect(() => {
    const init = async () => {
      getTaskList();
      getCount();
    };
    init();
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 mt-5">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Task"
          type="text"
          className="peer
        w-full
        p-2
        pt-2 
        font-light 
        bg-white 
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed"
        />
        <button
          onClick={onClickAddHandler}
          className="text-black text-lg font-medium border-solid border-2 border-black rounded-md px-5"
        >
         ADD
        </button>
      </div>
      <div>
        {task?.map((tas, index) => (
          <div key={index} className="flex gap-4 items-center">
            <h3 className="text-lg font-semibold">{tas.name}</h3>
            <div
              onClick={() => {
                setUpdateTask(true);
                setTaskId(tas.id);
              }}
              className="cursor-pointer"
            >
              <Pencil size={20} />
            </div>
          </div>
        ))}
      </div>

      {updateTask && (
        <div className="flex items-center gap-2">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Task"
            type="text"
            className="peer
        w-full
        p-2
        pt-2 
        font-light 
        bg-white 
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed"
          />
          <button
            onClick={onClickUpdateTaskHandler}
            className="text-black text-lg font-medium border-solid border-2 border-black rounded-md px-5"
          >
           UPDATE
          </button>
        </div>
      )}

      <div className="flex gap-2 mt-5">
        <div className="p-5 flex flex-col justify-center border border-red-400">
          <h6 className="text-lg font-bold">ADD</h6>
          <h6 className="text-lg text-center font-bold">{addOperationCount}</h6>
        </div>
        <div className="p-5 flex flex-col justify-center border border-red-400">
          <h6 className="text-lg font-bold">UPDATE</h6>
          <h6 className="text-lg text-center font-bold">
            {updateOperationCount}
          </h6>
        </div>
      </div>
    </>
  );
};

export default AddDataForm;
