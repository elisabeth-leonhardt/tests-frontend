import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import FileUpload from "./FileUpload";
import { filters } from "./filters";

async function deleteMemes(id) {
  await fetch(`http://localhost:8000/memes/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}

async function updateMeme(memeObject) {
  await fetch(`http://localhost:8000/memes/${memeObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memeObject),
  }).then((response) => response.json());
}

function MemeAdminCard({ meme }) {
  const [modalState, setModalState] = useState(false);
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    memeTitle: meme.title,
    tag: meme.tag,
  });

  function onFormChange(event) {
    const tempObject = {};
    tempObject[event.target.name] = event.target.value;
    setFormState({ ...formState, ...tempObject });
  }
  const { mutate: mutateDelete } = useMutation(deleteMemes, {
    onSuccess: () => {
      queryClient.refetchQueries("getUserMemes");
    },
  });
  const { mutate: mutateUpdate } = useMutation(updateMeme, {
    onSuccess: () => {
      queryClient.refetchQueries("getUserMemes");
    },
  });

  function onFormSubmit(event) {
    event.preventDefault();

    const updatedMeme = {
      title: formState.memeTitle,
      date: new Date(),
      tag: formState.tag,
      image: meme.image,
      id: meme.id,
      likes: meme.likes,
      username: meme.username,
    };
    mutateUpdate(updatedMeme);
    setModalState(false);
  }

  return (
    <div className='shadow-md shadow-dark-background rounded relative p-4 flex gap-4'>
      <img src={meme.image} alt={meme.title} className='max-h-[15rem]' />
      <div className=' flex flex-col gap-4 items-start'>
        <p>Título: {meme?.title}</p>
        <p>
          Subido el{" "}
          {new Intl.DateTimeFormat("es-AR", { dateStyle: "short" }).format(
            new Date(meme.date)
          )}
        </p>

        <span className='bg-gray-400 px-2 py-1 rounded-2xl'>{meme.tag}</span>
        <span className='flex gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            data-testid='like'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
            />
          </svg>
          {meme.likes}
        </span>
        <div className='flex gap-4 mt-[auto]'>
          <button
            onClick={() => mutateDelete(meme.id)}
            className='flex gap-2 py-2 px-4 bg-red-600 rounded text-white hover:bg-red-800'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
            Borrar
          </button>
          <button
            onClick={() => setModalState(true)}
            className='py-2 px-4 flex gap-2 bg-blue-600 rounded text-white hover:bg-blue-800'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
              />
            </svg>
            Editar
          </button>
        </div>
      </div>
      {modalState && (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-2xl'>Editar Meme:</h3>
                </div>
                {/*body*/}
                <form
                  onSubmit={onFormSubmit}
                  className='grid items-center gap-4 grid-cols-1 p-4 w-[50vw]'
                >
                  <img src={meme.image} alt={meme.title} className='max-h-60' />
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
                        <option value={filter} p-2>
                          {filter}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type='submit'
                    className='bg-bitlogic-blue px-4 py-2 rounded text-white disabled:bg-gray-500'
                  >
                    Actualizar Meme
                  </button>
                </form>
                {/*footer*/}
                <div className='flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setModalState(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </div>
  );
}

function MemeAdmin({ user }) {
  const { data } = useQuery(
    ["getUserMemes", user],
    async () => {
      let queryParam = "";
      if (user.length !== 0) {
        queryParam = `?username=${user}`;
      }
      return await fetch(`http://localhost:8000/memes${queryParam}`).then(
        (response) => response.json()
      );
    },
    {
      keepPreviousData: true,
    }
  );

  let reversed;
  if (data) {
    reversed = [...data].reverse();
  }

  return (
    <div className='max-w-6xl p-4 mx-auto'>
      <h1 className='text-2xl'>Bienvenidos {user}!</h1>
      <div className='shadow-md shadow-dark-background p-4 mb-8 rounded'>
        <h2 className='text-xl text-bitlogic-blue pb-4'>Subí un meme nuevo:</h2>
        <FileUpload user={user}></FileUpload>
      </div>

      <div className='shadow-md shadow-dark-background p-4 rounded'>
        <h2 className='text-xl text-bitlogic-blue'>Administrá tus memes:</h2>
        <div className='grid grid-cols-1 gap-6'>
          {reversed?.map((meme) => (
            <MemeAdminCard meme={meme}></MemeAdminCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemeAdmin;
