import Groups from "../Groups.cdc"

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
 