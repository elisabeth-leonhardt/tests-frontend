import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import differenceInDays from "date-fns/differenceInDays";

async function fetchMemes() {
  return await fetch("http://localhost:8000/memes").then((response) =>
    response.json()
  );
}

async function updateMemeLikes(memeObject) {
  await fetch(`http://localhost:8000/memes/${memeObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memeObject),
  }).then((response) => response.json());
}

function MemeCard({ meme }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateMemeLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries("getMemes");
    },
  });

  function handleLike() {
    const newMemeObject = { ...meme, likes: meme.likes + 1 };
    console.log(newMemeObject);
    mutate(newMemeObject);
  }
  // TODO: renegar con las fechas
  const random = Math.floor(Math.random() * 100);
  const daysAgo = differenceInDays(new Date(), new Date(meme.date));
  return (
    <div className='shadow-md shadow-dark-background rounded relative'>
      {random % 2 === 0 && (
        <span className='absolute right-[-2ch] top-[-2ch] bg-red-600 w-[6ch] h-[6ch] rounded-full leading-[6ch] text-sm text-center'>
          nuevo!
        </span>
      )}
      <p className='text-2xl bold px-2'>{meme?.title}</p>
      <p className='px-2'>
        Subido el{" "}
        {new Intl.DateTimeFormat("es-AR", { dateStyle: "short" }).format(
          new Date(meme.date)
        )}{" "}
        por {meme.username}
      </p>

      <img src={meme.image} alt={meme.title} />
      <span className='flex gap-2 justify-between items-center p-2'>
        <span className='bg-gray-400 px-2 py-1 rounded-2xl'>{meme.tag}</span>
        <button onClick={handleLike} className='flex gap-2'>
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
          {meme?.likes}
        </button>
      </span>
    </div>
  );
}

function MemeGrid(props) {
  const { data } = useQuery("getMemes", fetchMemes, {
    keepPreviousData: true,
  });
  return (
    <div className='grid grid-cols-2 gap-8'>
      {data &&
        data.map((meme) => <MemeCard meme={meme} key={meme.id}></MemeCard>)}
    </div>
  );
}

export default MemeGrid;
