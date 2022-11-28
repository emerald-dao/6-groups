import Groups from "../Groups.cdc"

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
 