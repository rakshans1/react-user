const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 31556925994);

export default getAge;