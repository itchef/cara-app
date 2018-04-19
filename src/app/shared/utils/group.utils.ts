import {MemberBasic} from '../models/member-basic';

export class GroupUtils {
    unassignMember(members: MemberBasic[], memberToRemove: MemberBasic): MemberBasic[] {
        return members.filter((member) => member.id !== memberToRemove.id);
    }
}
