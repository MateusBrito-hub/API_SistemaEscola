enum Gender {
    male = 'male',
    famale = 'famale',
    other = 'other'
}

export interface IResponsible {
    id: number
    name: string
    phone: string,
    dateBirth: Date,
    cpf: string,
    rg: string,
    gender: Gender,
    zipcode: string,
    address: string,
    number: string,
    district: string,
    city: string,
    state: string,
    observation: string,
    userId: number
}
