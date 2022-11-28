import Groups from "../Groups.cdc"

pub fun main(): {UInt64: Groups.GroupInfo} {
    return Groups.groups
}