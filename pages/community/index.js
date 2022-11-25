import Link from 'next/link';
import Image from 'next/image';
import * as fcl from "@onflow/fcl";
import { useAuth } from "../../contexts/AuthContext";

export default function Community() {
  const { user } = useAuth();

  return (
<div className='flex justify-center pt-20'>
      <div className='w-[80%] space-y-6'>
        <div className='rounded-lg bg-cover text-white flex items-center justify-center w-full border h-1/5 overflow-hidden border-gray-400'>
          <img className='object-cover' src='/lol.jpg' />
        </div>
        <div className='flex mb-12 justify-between items-center pt-5'>
          <div>
            <h1 className='text-gray-200 text-3xl font-bold'>League of Legends</h1>
            <p className='text-gray-300 opacity-75 flex pt-1'>community created by: <p className='bg-gray-500 px-2 rounded-full ml-2 text-white'>0x00000000001</p></p>
          </div>

          <div className='text-gray-700 text-lg font-semibold pr-2'>
            <button className='px-4 py-1 bg-blue-300 rounded-lg'>Join Community</button>
          </div>

        </div>
        <div className='flex pt-5 justify-between'>
            <div className='w-2/3'>
                <div className='text-gray-300 opacity-75 border rounded-xl p-4 border-gray-400'>
                    <h1 className='pb-2 underline'>About the community</h1>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                    a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions 
                    of Lorem Ipsum.
                </div>

                <div className='bg-[#00384b] mt-10 px-7 py-4 rounded-lg'>
                    <h1 className='text-gray-300 text-lg font-semibold pb-4'>Community Forum</h1>

                    <div className='flex space-x-2'>
                        <input className='focus:outline-none px-3 py-1 rounded-lg w-full bg-gray-100' placeholder='say something cool'/>
                        <button className='px-4 py-1 bg-blue-300 rounded-lg'>
                            Submit
                        </button>
                    </div>

                    <div className='pt-10'>
                        <div className='space-y-1'>
                            <p className='text-sm text-green-500'>0x00000000001</p>
                            <p className='text-gray-300 text-sm pb-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            <hr className='mx-1 border-gray-500 pb-4'/>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-sm text-green-500'>0x00000000001</p>
                            <p className='text-gray-300 text-sm pb-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            <hr className='mx-1 border-gray-500 mb-4'/>
                        </div>
                    </div>
                </div>

            </div>


            <div className='text-center bg-[#00384b] px-5 py-2 rounded-lg max-h-fit'>
                <p className='pb-3 text-green-400'>members</p>
                <div className='space-y-3 text-green-600'>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>
                    <ul className='rounded-full bg-[#011E30] px-5 py-1'>0x00000000001</ul>

                </div>
            </div>

        </div>

        <div className=' pt-10 w-full text-center'>
            <button className='px-6 py-2 bg-red-500 rounded-lg text-white w-full'>Leave group/community</button>
        </div>

      </div>
    </div>
  )
}
