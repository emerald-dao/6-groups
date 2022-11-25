import Link from 'next/link';
import * as fcl from "@onflow/fcl";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className='flex justify-center pt-16'>
      <div className='w-[70%] space-y-6'>
        <div className='flex justify-between'>
          <h1 className='text-gray-200 text-2xl'>All Communities</h1>
          <Link href='/create'>
            <a>
              <button className='bg-blue-300 px-5 py-2 rounded-lg'>Create Community</button>
            </a>
          </Link>
        </div>
        <hr />
          <div className='pt-5 grid grid-cols-2 gap-x-7 gap-y-7 max-w-max'>
          <Link href='/community'>
            <a className='rounded-t-lg bg-[#00384b] cursor-pointer drop-shadow-xl'>
                <div className="h-48 items-center justify-center overflow-hidden">
                  <img src='/lol.jpg' className="rounded-lg" alt="dummy" /> :
                </div>
                <div className=' px-3 py-2 text-gray-300 mt-3 static'>
                  <h1 className='font-bold text-lg'>League of Legends</h1>
                  <p className='text-md pt-3 text-gray-400 mb-10 truncate'>multiplayer online battle arena video game developed and published by Riot Games. Inspired by Defense of the Ancients, a custom map for Warcraft III</p>
                  <p className='text-center text-sm mt-5 mb-1 mr-2 text-green-500 rounded-full px-3 py-2 bg-gray-800 max-w-max absolute bottom-0 right-0'>120 members</p>
                </div>
            </a> 
          </Link>
          </div>

      </div>
    </div>
  )
}


