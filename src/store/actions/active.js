export const setActive = (link) => {
    return {
      type: "Active",
      link: link
    };
};

export const setOrg = (org) =>{
  return{
    type: "SetOrg",
    org: org
  }
}

export const setMembers = (members) =>{
  console.log(members);
  return{
    type: "SetMembers",
    members: members
  }
}

export const setOrgName = (name) =>{
  // console.log(name);
  return {
    type: "SetOrgName",
    orgName: name
  }
}