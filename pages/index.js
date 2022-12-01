import Link from 'next/link';
import * as fcl from "@onflow/fcl";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from 'react';

export default function Home() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, [])

  async function getGroups() {
    const response = await fcl.query({
      cadence: `
      import Groups from 0xDeployer

      pub fun main(): {UInt64: Info} {
          let groups: {UInt64: Info} = {}
          for info in Groups.groups.values {
              let collection = getAccount(info.owner).getCapability(Groups.CollectionPublicPath)
                          .borrow<&Groups.Collection{Groups.CollectionPublic}>()!
              let groupRef = collection.getGroup(id: info.id)!
              groups[info.id] = Info(
                  info.name,
                  info.description,
                  info.image,
                  info.owner,
                  info.id,
                  groupRef.members.keys
              )
          }
          return groups
      }

      pub struct Info {
          pub let name: String
          pub let description: String
          pub let image: String
          pub let owner: Address
          pub let id: UInt64
          pub let members: [Address]

          init(_ name: String, _ description: String, _ image: String, _ owner: Address, _ id: UInt64, _ members: [Address]) {
            self.name = name
            self.description = description
            self.image = image
            self.owner = owner
            self.id = id
            self.members = members
          }
      }
      `,
      args: (arg, t) => []
    });

    setGroups(Object.values(response));
    console.log(response);
  }

  return (
    <div className='flex justify-center pt-16'>
      <div className='w-[70%] space-y-6'>
        <div className='flex justify-between'>
          <h1 className='text-gray-200 text-2xl'>All Communities</h1>
          {user.loggedIn ? <Link href='/create'>
            <a>
              <button className='bg-blue-300 px-5 py-2 rounded-lg'>Create Community</button>
            </a>
          </Link> : <p className='text-gray-400 text-lg'>Please connect wallet</p>}
        </div>
        <hr />
        {groups.map(group => (
          <div className='pt-5 grid grid-cols-2 gap-x-7 gap-y-7 max-w-max' key={group.id}>
            <Link href={`/${group.owner}/${group.id}`}>
              <a className='rounded-t-lg bg-[#00384b] cursor-pointer drop-shadow-xl'>
                <div className="h-48 items-center justify-center overflow-hidden">
                  <img src={`https://nftstorage.link/ipfs/${group.image}`} className="rounded-t-sm" alt="dummy" /> :
                </div>
                <div className=' px-3 py-2 text-gray-300 mt-3 static'>
                  <h1 className='font-bold text-lg'>{group.name}</h1>
                  <p className='text-md pt-3 text-gray-400 mb-10 truncate'>{group.description}</p>
                  <p className='text-center text-sm mt-5 mb-1 mr-2 text-green-500 rounded-full px-3 py-2 bg-gray-800 max-w-max absolute bottom-0 right-0'>{group.members.length} members</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}


