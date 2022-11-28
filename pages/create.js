import { useState } from "react";
import * as fcl from "@onflow/fcl";
import Router from "next/router";
import { NFTStorage } from "nft.storage";

export default function Submit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState();
  const [ipfsCid, setIpfsCid] = useState('');

  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFTSTORAGE_KEY;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  async function uploadToIPFS(file) {
    let prev = URL.createObjectURL(file)
    setPreview(prev)
    const cid = await client.storeBlob(file);
    setIpfsCid(cid);
  }

  async function createGroup() {
    console.log(ipfsCid)
    const transactionId = await fcl.mutate({
      cadence: `
      import Groups from 0xDeployer

      transaction(name: String, description: String, image: String) {

          let Collection: &Groups.Collection

          prepare(signer: AuthAccount) {
            if signer.borrow<&Groups.Collection>(from: Groups.CollectionStoragePath) == nil {
              signer.save(<- Groups.createEmptyCollection(), to: Groups.CollectionStoragePath)
              signer.link<&Groups.Collection{Groups.CollectionPublic}>(Groups.CollectionPublicPath, target: Groups.CollectionStoragePath)
            } 

            self.Collection = signer.borrow<&Groups.Collection>(from: Groups.CollectionStoragePath)!
          }

          execute {
            self.Collection.createGroup(name: name, description: description, image: image)
          }
      }
      `,
      args: (arg, t) => [
        arg(name, t.String),
        arg(description, t.String),
        arg(ipfsCid, t.String)
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
    Router.push("/")
  }

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
              <input className="hidden" id="upload-button" type="file" onChange={(e) => uploadToIPFS(e.target.files[0])} />
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
            <textarea className='rounded-lg py-3 px-7 bg-[#00344B] border border-gray-100 focus:outline-none focus:border-[#38E8C6] text-gray-200' rows={8} onChange={(e) => setDescription(e.target.value)} placeholder='This is a vote to determine if Jacob Tucker should be given 1 million dollars...' />
          </div>
          <button disabled={ipfsCid === ''} className='rounded-lg py-3 px-7 text-lg font-semibold bg-[#2bbc9f]' onClick={createGroup} >{ipfsCid === '' ? 'Uploading image...' : 'Create Community'}</button>
        </div>
      </div>
    </div>
  )
}