import React, { useState } from "react";
import { uid } from "uid";
import { useMutation, useQueryClient } from "react-query";

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

function FileUpload(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [formState, setFormState] = useState({ memeTitle: "", tag: "" });

  const { mutate } = useMutation(uploadMemes, {
    onSuccess: () => {
      console.log("success!");
      queryClient.invalidateQueries("getMemes");
    },
  });

  const queryClient = useQueryClient();

  function onFileChange(event) {
    setSelectedFile(event.target.files[0]);
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
      username: "funny-eli",
    };
    mutate(newMeme);
    // enviar el objeto a la base de datos
    console.log(selectedFile, formState);
    // resetear el formulario
    event.target[0].value = null; // resets the file
    setFormState({ memeTitle: "", tag: "" });
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input type="file" name="file" onChange={onFileChange} />
        <label htmlFor="memeTitle">
          Título:
          <input
            type="text"
            id="memeTitle"
            name="memeTitle"
            onChange={onFormChange}
            value={formState.memeTitle}
          />
        </label>
        <label htmlFor="memeTitle">
          Tag:
          <input
            type="text"
            id="tag"
            name="tag"
            onChange={onFormChange}
            value={formState.tag}
          />
        </label>
        <button type="submit">Subir Meme</button>
      </form>
    </div>
  );
}

export default FileUpload;
