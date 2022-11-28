pub contract Groups {
  
  pub let CollectionPublicPath: PublicPath
  pub let CollectionStoragePath: StoragePath

  pub let groups: {UInt64: GroupInfo}

  pub struct GroupInfo {
    pub let name: String
    pub let description: String
    pub let image: String
    pub let owner: Address
    pub let id: UInt64

    init(_ name: String, _ description: String, _ image: String, _ owner: Address, _ id: UInt64) {
      self.name = name
      self.description = description
      self.image = image
      self.owner = owner
      self.id = id
    }
  }

  pub struct Message {
    pub let content: String
    pub let timestamp: UFix64
    pub let author: Address

    init(_ content: String, _ timestamp: UFix64, _ author: Address) {
      self.content = content
      self.timestamp = timestamp
      self.author = author
    }
  }

  pub resource Group {
    pub let info: GroupInfo
    pub let members: {Address: Bool}
    pub let messages: [Message]

    access(contract) fun join(user: Address) {
      self.members[user] = true
    }

    access(contract) fun leave(user: Address) {
      self.members.remove(key: user)
    }

    access(contract) fun postMessage(content: String, author: Address) {
      self.messages.append(Message(content, getCurrentBlock().timestamp, author))
    }

    init(_ name: String, _ description: String, _ image: String, _ owner: Address) {
      self.info = GroupInfo(name, description, image, owner, self.uuid)
      self.members = {owner: true}
      self.messages = []
      Groups.groups[self.uuid] = self.info
    }
  }

  pub resource interface CollectionPublic {
    pub fun getIDs(): [UInt64]
    pub fun getGroup(id: UInt64): &Group?
  }

  pub resource Collection: CollectionPublic {
    pub let createdGroups: @{UInt64: Group}
    pub let myGroups: {UInt64: Bool}

    pub fun createGroup(name: String, description: String, image: String) {
      let group: @Group <- create Group(name, description, image, self.owner!.address)
      self.createdGroups[group.uuid] <-! group
    }

    pub fun joinGroup(id: UInt64, owner: Address) {
      let group = Groups.getGroup(id: id, owner: owner) ?? panic("This Group does not exist.")
      group.join(user: self.owner!.address)
      self.myGroups[id] = true
    }

    pub fun leaveGroup(id: UInt64, owner: Address) {
      let group = Groups.getGroup(id: id, owner: owner) ?? panic("This Group does not exist.")
      group.leave(user: self.owner!.address)
      self.myGroups.remove(key: id)
    }

    pub fun postMessage(id: UInt64, owner: Address, content: String) {
      let group = Groups.getGroup(id: id, owner: owner) ?? panic("This Group does not exist.")
      group.postMessage(content: content, author: self.owner!.address)
    }

    pub fun getIDs(): [UInt64] {
      return self.createdGroups.keys
    }

    pub fun getGroup(id: UInt64): &Group? {
      return &self.createdGroups[id] as &Group?
    }

    init() {
      self.createdGroups <- {}
      self.myGroups = {}
    }

    destroy() {
      for id in self.getIDs() {
        Groups.groups.remove(key: id)
      }
      destroy self.createdGroups
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <- create Collection()
  }

  pub fun getGroupInfo(id: UInt64): GroupInfo? {
    return self.groups[id]
  }

  pub fun getGroup(id: UInt64, owner: Address): &Group? {
    let ownerCollection = getAccount(owner).getCapability(Groups.CollectionPublicPath)
              .borrow<&Collection{CollectionPublic}>() ?? panic("This is not a valid owner.")
    return ownerCollection.getGroup(id: id)
  }

  init() {
    self.groups = {}
    self.CollectionPublicPath = /public/EmeraldAcademyGroupsCollection
    self.CollectionStoragePath = /storage/EmeraldAcademyGroupsCollection
  }
}