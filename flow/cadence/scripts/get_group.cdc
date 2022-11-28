import Groups from "../Groups.cdc"

pub fun main(id: UInt64, owner: Address): &Groups.Group? {
    return Groups.getGroup(id: id, owner: owner)
}