import Groups from "../Groups.cdc"

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