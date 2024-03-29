export interface VCustomer {
    id: number;
    created_by?: number;
    citizenIdentityNumber: string;
    name: string;
    surname: string;
    phone?: string;
    gsm: string;
    gender: string;
    email: string;
    address: string;
    birthDate: Date;
    birthPlace: string;
    instagramAddress?: string;
    facebookAddress?: string;
    linkedinAddress?: string;
    isChild: boolean;
    isActive: boolean;
    blood_group_id?: number;
    blood_group_name?: string;
    disease?: string;
    search_resource_id?: number;
    search_resources_name?: string;
    smsRequest: boolean;
    emailRequest: boolean;  
    parent_type_id?: number;
    parent_type_name?: string;
    parentIdentity?: string;
    parentName?: string;
    parentSurname?: string;
    parentEmail?: string;
    parentProf?: string;
    instagramParentAddress?: string;
    facebookParentAddress?: string;
    linkedinParentAddress?: string;
    created_at?: Date;
    updated_at?: Date;
}
