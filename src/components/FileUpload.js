import React, { useState } from "react";
import { uid } from "uid";
import { useMutation, useQueryClient } from "react-query";
import { filters } from "./filters";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

async function uploadMemes(uploadObject) {
  await fetch("http://localhost:8000/memes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uploadObject),
  }).then((response) => response.json());
}

function FileUpload({ user }) {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [formState, setFormState] = useState({
    memeTitle: "",
    tag: "frontend",
  });

  const { mutate } = useMutation(uploadMemes, {
    onSuccess: () => {
      queryClient.refetchQueries("getUserMemes");
    },
  });

  const queryClient = useQueryClient();

  function onFileChange(event) {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    setPreview(reader);
  }

  function onFormChange(event) {
    const tempObject = {};
    tempObject[event.target.name] = event.target.value;
    setFormState({ ...formState, ...tempObject });
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    // convertir imagen a base64
    const base64Image = await convertToBase64(selectedFile);
    // armar el objeto que se va a mandar a la base de datos
    const newMeme = {
      title: formState.memeTitle,
      date: new Date(),
      tag: formState.tag,
      image: base64Image,
      id: uid(),
      likes: 0,
      username: user,
    };
    mutate(newMeme);
    // enviar el objeto a la base de datos
    // resetear el formulario
    event.target[0].value = null; // resets the file
    setFormState({ memeTitle: "", tag: "" });
    setSelectedFile(null);
    setPreview(null);
  }

  return (
    <div>
      {selectedFile && (
        <img
          src={preview.result}
          alt='newly uploaded meme'
          className='max-h-[15rem]'
        />
      )}
      <form
        onSubmit={onFormSubmit}
        className='grid items-center gap-4 grid-cols-4 '
      >
        <input
          type='file'
          name='file'
          onChange={onFileChange}
          className='border-[1px] border-bitlogic-blue h-10 p-1 rounded'
        />
        <label htmlFor='memeTitle' className='flex items-center'>
          Título:
          <input
            type='text'
            id='memeTitle'
            name='memeTitle'
            className='border-[1px] mx-2 p-1 h-10 border-bitlogic-blue rounded w-full'
            placeholder='el mejor meme'
            onChange={onFormChange}
            value={formState.memeTitle}
          />
        </label>
        <label htmlFor='memeTitle' className='flex items-center'>
          Tag:
          <select
            id='tag'
            name='tag'
            onChange={onFormChange}
            value={formState.tag}
            className='mx-2 p-2 border-[1px] h-10 border-bitlogic-blue bg-white rounded w-full'
          >
            {filters.map((filter) => (
              <option value={filter} key={filter}>
                {filter}
              </option>
            ))}
          </select>
        </label>
        <button
          type='submit'
          className='bg-bitlogic-blue px-4 py-2 rounded text-white disabled:bg-gray-500'
          disabled={!selectedFile}
        >
          Subir Meme
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
