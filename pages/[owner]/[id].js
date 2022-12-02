import * as fcl from "@onflow/fcl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Community() {
  const { user } = useAuth();
  const [group, setGroup] = useState({});
  const [content, setContent] = useState('');
  const router = useRouter();
  const { owner, id } = router.query;

  useEffect(() => {
    if (owner && id) {
      getGroup(owner, id);
    }
  }, [owner, id]);

  async function getGroup(owner, id) {
    const response = await fcl.query({
      cadence: `
      import Groups from 0xDeployer

      pub fun main(id: UInt64, owner: Address): &Groups.Group? {
          return Groups.getGroup(id: id, owner: owner)
      }
      `,
      args: (arg, t) => [
        arg(parseInt(id), t.UInt64),
        arg(owner, t.Address)
      ]
    });

    setGroup(response);
    console.log(response);
  }

  async function postMessage() {
    const transactionId = await fcl.mutate({
      cadence: `
      import Groups from 0xDeployer

      transaction(id: UInt64, owner: Address, content: String) {

          let Collection: &Groups.Collection

          prepare(signer: AuthAccount) {
            if signer.borrow<&Groups.Collection>(from: Groups.CollectionStoragePath) == nil {
              signer.save(<- Groups.createEmptyCollection(), to: Groups.CollectionStoragePath)
              signer.link<&Groups.Collection{Groups.CollectionPublic}>(Groups.CollectionPublicPath, target: Groups.CollectionStoragePath)
            } 

            self.Collection = signer.borrow<&Groups.Collection>(from: Groups.CollectionStoragePath)!
          }

          execute {
            self.Collection.postMessage(id: id, owner: owner, content: content)
          }
      }
      `,
      args: (arg, t) => [
        arg(parseInt(id), t.UInt64),
        arg(owner, t.Address),
        arg(content, t.String)
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
    await fcl.tx(transactionId).onceSealed();
    getGroup(owner, id);
  }

  async function join() {
    const transactionId = await fcl.mutate({
      cadence: `
      import Groups from 0xDeployer

      transaction(id: UInt64, owner: Address) {

          let Collection: &Groups.Collection

          prepare(signer: AuthAccount) {
            if signer.borrow<&Groups.Collection>(from: Groups.CollectionStoragePath) == nil {
              signer.save(<- Groups.createEmptyCollection(), to: Groups.CollectionStoragePath)
              signer.link<&Groups.Collection{Groups.CollectionPublic}>(Groups.CollectionPublicPath, target: Groups.CollectionStoragePath)
            } 

            self.Collection = signer.borrow<&Groups.Collection>(from: Groups.CollectionStoragePath)!
          }

          execute {
            self.Collection.joinGroup(id: id, owner: owner)
          }
      }
      `,
      args: (arg, t) => [
        arg(parseInt(id), t.UInt64),
        arg(owner, t.Address)
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
    await fcl.tx(transactionId).onceSealed();
    getGroup(owner, id);
  }

  async function leave() {
    const transactionId = await fcl.mutate({
      cadence: `
      import Groups from 0xDeployer

      transaction(id: UInt64, owner: Address) {

          let Collection: &Groups.Collection

          prepare(signer: AuthAccount) {
            if signer.borrow<&Groups.Collection>(from: Groups.CollectionStoragePath) == nil {
              signer.save(<- Groups.createEmptyCollection(), to: Groups.CollectionStoragePath)
              signer.link<&Groups.Collection{Groups.CollectionPublic}>(Groups.CollectionPublicPath, target: Groups.CollectionStoragePath)
            } 

            self.Collection = signer.borrow<&Groups.Collection>(from: Groups.CollectionStoragePath)!
          }

          execute {
            self.Collection.leaveGroup(id: id, owner: owner)
          }
      }
      `,
      args: (arg, t) => [
        arg(parseInt(id), t.UInt64),
        arg(owner, t.Address)
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
    await fcl.tx(transactionId).onceSealed();
    getGroup(owner, id);
  }

  if (group.info) {
    return (
      <div className='flex justify-center pt-20'>
        <div className='w-[80%] space-y-6'>
          <div className='rounded-lg bg-cover text-white flex items-center justify-center w-full border h-1/5 overflow-hidden border-gray-400'>
            <img className='object-cover' src={`https://nftstorage.link/ipfs/${group.info.image}`} />
          </div>
          <div className='flex mb-12 justify-between items-center pt-5'>
            <div>
              <h1 className='text-gray-200 text-3xl font-bold'>{group.info.name}</h1>
              <p className='text-gray-300 opacity-75 flex pt-1'>Created by: <span className='bg-gray-500 px-2 rounded-full ml-2 text-white'>{owner}</span></p>
            </div>
            <div className='text-gray-700 text-lg font-semibold pr-2'>
              {!Object.keys(group.members).includes(user.addr) ?
                <button className='px-4 py-1 bg-blue-300 rounded-lg' onClick={join}>Join Community</button> :
                <button className='px-4 py-1 bg-red-500 text-white rounded-lg' onClick={leave}>Leave Community</button>
              }
            </div>
          </div>
          <div className='flex pt-5 justify-between'>
            <div className='w-2/3'>
              <div className='text-gray-300 opacity-75 border rounded-xl p-4 border-gray-400'>
                <h1 className='pb-2 underline'>About the community</h1>
                {group.info.description}
              </div>

              {Object.keys(group.members).includes(user.addr) ?
                <div className='bg-[#00384b] mt-10 px-7 py-4 rounded-lg'>
                  <h1 className='text-gray-300 text-lg font-semibold pb-4'>Community Forum</h1>
                  <div className='flex space-x-2'>
                    <input className='focus:outline-none px-3 py-1 rounded-lg w-full bg-gray-100' placeholder='Hello everyone! My name is...' onChange={(e) => setContent(e.target.value)} />
                    <button className='px-4 py-1 bg-blue-300 rounded-lg' onClick={postMessage}>
                      Submit
                    </button>
                  </div>
                  <div className='pt-10'>
                    {group.messages.map((message, index) => (
                      <div className='space-y-1' key={index}>
                        <p className='text-sm text-green-500'>{message.author}</p>
                        <p className='text-gray-300 text-sm pb-3'>{message.content}</p>
                        <hr className='mx-1 border-gray-500 pb-4' />
                      </div>
                    ))}
                  </div>
                </div> :
                <div className='bg-[#00384b] mt-10 px-7 py-4 rounded-lg text-gray-300'>You must join the community to view the forum.</div>
              }
            </div>

            <div className='text-center bg-[#00384b] px-5 py-2 rounded-lg max-h-fit'>
              <p className='pb-3 text-green-400'>Members</p>
              <div className='space-y-3 text-green-600'>
                {Object.keys(group.members ?? []).map(member => (
                  <ul className='rounded-full bg-[#011E30] px-5 py-1' key={member}>{member}</ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
