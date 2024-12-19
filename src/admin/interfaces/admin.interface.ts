
export interface CreateAdmin {
    first_name: string
    last_name?: string
    password: string,
    email: string
    phone_number: string
    country_code: string
}

export interface LoginAdmin {
    email: string,
    password: string
}

export interface UpdateAdmin {
    first_name?: string
    last_name?: string,
    phone_number?: string
    country_code?: string
}