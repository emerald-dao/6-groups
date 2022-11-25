import { useState } from "react";
import * as fcl from "@onflow/fcl";
import Router from "next/router";

export default function Submit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState();
  const [ipfsCid, setIpfsCid] = useState();





  return (
    <div className='flex justify-center pt-20'>
      <div className='w-[70%] space-y-6'>
        <div className='space-y-3 mb-12'>
          <h1 className='text-gray-200 text-2xl text-center font-bold uppercase'>Create your community</h1>
        </div>
        <div className='flex flex-col space-y-7'>
          <div className='flex flex-col justify-between'>
            <div className="flex flex-col w-full mb-7">
            <label className="border rounded-xl h-48 flex items-center cursor-pointer justify-center text-white overflow-hidden" htmlFor="upload-button">
                {
                preview ? <img src={preview} className="rounded-xl" alt="dummy" width="1000" height="30" /> :
                    <h1>upload banner image</h1>
                }
            </label>
            <input className="hidden" id="upload-button" type="file" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm mb-3">Community name</label>
              <input type="text" placeholder='Should Jacob Tucker receive 1 million dollars?'
                className='px-7 py-3 w-[80%] focus:outline-none text-gray-200 focus:border-[#38E8C6] 
              bg-[#00344B] border rounded-lg  border-gray-100' onChange={(e) => setName(e.target.value)} />
            </div>

          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 text-sm mb-3"> Description</label>
            <textarea className='rounded-lg py-3 px-7 bg-[#00344B] border border-gray-100 focus:outline-none focus:border-[#38E8C6] text-gray-200' rows={8} placeholder='This is a vote to determine if Jacob Tucker should be given 1 million dollars...' />
          </div>
          <button className='rounded-lg py-3 px-7 text-lg font-semibold bg-[#2bbc9f]' >Create Community</button>
        </div>
      </div>
    </div>
  )
}