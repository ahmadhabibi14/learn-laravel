import { Head } from '@inertiajs/react';
import { useState } from 'react';

type UserType = 'user' | 'ai';

type Chat = {
  userType: UserType;
  text: string;
  datetime: string | Date;
};

export default function Home() {
  const [messages, setMessages] = useState<Chat[]>([
    {
      userType: 'ai',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe illum atque fuga? Sapiente eos adipisci ea enim odit, ab vel rem. Dicta aspernatur doloremque molestiae provident? Obcaecati expedita tempora voluptate.',
      datetime: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const updateMessage = (userType: UserType, text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        userType,
        text,
        datetime: new Date(),
      },
    ]);
  };

  const sendMessage = async (): Promise<void> => {
    await fetch('/chat', {
      method: 'POST',
      body: JSON.stringify({
        text: input
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((data) => {
        console.log('DATA:', data)
      })
      .catch((err) => {
        console.error(err)
      });
    updateMessage('user', input);
  };

  return (
    <>
      <Head title="Belajar Laravel"></Head>
      <div className="flex min-h-screen flex-col items-center bg-white text-neutral-900">
        <div className="flex w-7/12 mx-auto">
          <div className="flex">
            <div>hahha</div>
          </div>
        </div>

        <div className="fixed right-0 bottom-2 left-0 mx-auto flex h-fit w-screen max-w-screen justify-center">
          <div className="mx-auto flex w-7/12 items-stretch gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-2 shadow-lg">
            <input
              type="text"
              name="inputChat"
              id="inputChat"
              className="focus:none h-auto w-full grow pl-3 caret-cyan-600 focus:outline-0"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="h-auto cursor-pointer rounded-lg bg-cyan-600 px-7 py-3 text-sm font-semibold text-white hover:bg-cyan-500"
            >
              <span>SEND</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
